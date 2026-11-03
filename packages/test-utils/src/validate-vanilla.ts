import { assert, describe, it } from "vitest";
import eslint from "eslint";
import { assertHasEslintError } from "./utils/has-eslint-error";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const VANILLA_FIXTURES_PATH = join(__dirname, "fixtures/vanilla");

export function createVanillaTests(
	overrideConfig: eslint.Linter.Config<eslint.Linter.RulesRecord>[],
	fixturesPath: string,
) {
	return () => {
		const cli = new eslint.ESLint({
			overrideConfig,
			overrideConfigFile: true,
			cwd: fixturesPath,
		});

		describe("validate vanilla config", () => {
			describe("general rules", () => {
				it("load config in eslint to validate all rule syntax is correct", async () => {
					const result = await cli.lintFiles("frontend.ts");
					assertHasEslintError(result, "@typescript-eslint/no-unused-vars");
					assertHasEslintError(result, "@typescript-eslint/no-unsafe-assignment");
					assertHasEslintError(result, "no-var");
					assertHasEslintError(result, "eqeqeq");
				});
			});
			describe("declaration files", () => {
				// Regression test for the v5.4.0 crash: *.d.ts files matched a
				// rule-only config object (the baseline-js recommended-ts preset,
				// which has no `ignores`) while being excluded via `ignores` from
				// the config object that registered the plugin. ESLint throws
				// 'Could not find plugin ...' if a rule applies to a file where
				// its plugin is not registered.
				it("lints .d.ts files without configuration errors", async () => {
					const result = await cli.lintFiles("vite-env.d.ts");
					assert.deepEqual(
						result.flatMap((file) => file.messages),
						[],
					);
				});
			});
			describe("check-file plugin", () => {
				it("validates check-file/filename-naming-convention", async () => {
					const result = await cli.lintFiles("invalidFileName.ts");
					assertHasEslintError(result, "check-file/filename-naming-convention");
				});
			});

			describe("baseline-js plugin", () => {
				// URLPattern became Baseline "newly available" on 2025-09-15 and is
				// expected to become "widely available" ~30 months later (around
				// 2028-03). This test starts failing once eslint-plugin-baseline-js
				// ships Baseline data that marks URLPattern as widely available. When
				// that happens, replace URLPattern in fixtures/vanilla/newly-available.ts
				// with a feature that is not yet widely available.
				it("validates baseline-js/use-baseline", async () => {
					const result = await cli.lintFiles("newly-available.ts");
					assertHasEslintError(result, "baseline-js/use-baseline");
				});
			});

			describe("AI slop rules", () => {
				const rules = {
					"caspeco-ts/no-chained-type-assertions": 3,
					"caspeco-ts/no-reduce-accumulator-copy": 4,
					// The two angle-bracket assertions also break `assertionStyle: "as"`.
					"@typescript-eslint/consistent-type-assertions": 3,
					"@typescript-eslint/switch-exhaustiveness-check": 1,
				};
				const countByRule = (result: eslint.ESLint.LintResult[]) => {
					const counts: Record<string, number> = {};
					for (const { ruleId } of result.flatMap((file) => file.messages)) {
						if (ruleId && ruleId in rules) {
							counts[ruleId] = (counts[ruleId] ?? 0) + 1;
						}
					}
					return counts;
				};

				it("reports each slop pattern", async () => {
					const result = await cli.lintFiles("ai-slop.ts");
					assert.deepEqual(countByRule(result), rules);
				});

				it("allows the idiomatic alternatives", async () => {
					const result = await cli.lintFiles("ai-slop-valid.ts");
					assert.deepEqual(
						result.flatMap((file) => file.messages),
						[],
					);
				});

				it("allows chained type assertions in test files", async () => {
					const result = await cli.lintFiles("ai-slop.test.ts");
					assert.deepEqual(countByRule(result), { "@typescript-eslint/consistent-type-assertions": 1 });
				});
			});

			describe("no-barrel-files plugin", () => {
				it("validates no-barrel-files/no-barrel-files", async () => {
					const result = await cli.lintFiles("frontend.ts");
					assertHasEslintError(result, "no-barrel-files/no-barrel-files");
				});
			});
		});
	};
}

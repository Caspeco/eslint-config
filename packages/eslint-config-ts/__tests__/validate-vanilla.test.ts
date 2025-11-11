import frontendVanilla from "./fixtures/vanilla/eslint.config";
import { describe, it } from "vitest";
import eslint from "eslint";
import { assertHasEslintError } from "./utils/has-eslint-error";

export function createVanillaTests(overrideConfig: eslint.Linter.Config<eslint.Linter.RulesRecord>[]) {
	return () => {
		describe("validate vanilla config", () => {
			describe("general rules", () => {
				it("load config in eslint to validate all rule syntax is correct", async function async() {
					const cli = new eslint.ESLint({
						overrideConfig,
						overrideConfigFile: true,
					});

					const result = await cli.lintFiles("__tests__/fixtures/vanilla/frontend.ts");
					assertHasEslintError(result, "@typescript-eslint/no-unused-vars");
					assertHasEslintError(result, "@typescript-eslint/no-unsafe-assignment");
					assertHasEslintError(result, "no-var");
				});
			});
			describe("check-file plugin", () => {
				it("validates check-file/filename-naming-convention", async function async() {
					const cli = new eslint.ESLint({
						overrideConfig,
						overrideConfigFile: true,
					});

					const result = await cli.lintFiles("__tests__/fixtures/vanilla/invalidFileName.ts");
					assertHasEslintError(result, "check-file/filename-naming-convention");
				});
			});
		});

		describe("no-barrel-files plugin", () => {
			it("validates no-barrel-files/no-barrel-files", async function async() {
				const cli = new eslint.ESLint({
					overrideConfig,
					overrideConfigFile: true,
				});

				const result = await cli.lintFiles("__tests__/fixtures/vanilla/frontend.ts");
				assertHasEslintError(result, "no-barrel-files/no-barrel-files");
			});
		});
	};
}

// Tests are instansiated from vanilla-helper to easier test inherited configs
createVanillaTests(frontendVanilla as eslint.Linter.Config<eslint.Linter.RulesRecord>[])();

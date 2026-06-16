import { describe, it, expect } from "vitest";
import eslint from "eslint";
import compilerConfig from "./fixtures/react-compiler/eslint.config";
import defaultConfig from "./fixtures/react/eslint.config";
import { assertHasEslintError } from "@caspeco/test-utils/utils/has-eslint-error";

const PURITY_FIXTURE = "__tests__/fixtures/react-compiler/purity.tsx";

const hasRule = (result: eslint.ESLint.LintResult[], ruleId: string) =>
	result.some((file) => file.messages.some((message) => message.ruleId === ruleId));

describe("validate react compiler config", () => {
	describe("react compiler rules (opt-in)", () => {
		it("flags react-hooks/purity under the compiler config", async () => {
			const cli = new eslint.ESLint({
				overrideConfig: compilerConfig as eslint.ESLint.Options["overrideConfig"],
				overrideConfigFile: true,
			});

			const result = await cli.lintFiles(PURITY_FIXTURE);
			assertHasEslintError(result, "react-hooks/purity");
		});

		it("does NOT flag react-hooks/purity under the default config", async () => {
			const cli = new eslint.ESLint({
				overrideConfig: defaultConfig as eslint.ESLint.Options["overrideConfig"],
				overrideConfigFile: true,
			});

			const result = await cli.lintFiles(PURITY_FIXTURE);
			expect(hasRule(result, "react-hooks/purity")).toBe(false);
		});
	});

	describe("base react-hooks rules (superset)", () => {
		it("still flags react-hooks/rules-of-hooks under the compiler config", async () => {
			const cli = new eslint.ESLint({
				overrideConfig: compilerConfig as eslint.ESLint.Options["overrideConfig"],
				overrideConfigFile: true,
			});

			const result = await cli.lintFiles("__tests__/fixtures/react/react-hooks.tsx");
			assertHasEslintError(result, "react-hooks/rules-of-hooks");
		});
	});
});

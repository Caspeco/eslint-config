import { describe, it } from "vitest";
import eslint from "eslint";
import frontendReact from "./fixtures/react/eslint.config";
import { assertHasEslintError } from "@caspeco/test-utils/utils/has-eslint-error";
import { createVanillaTests, VANILLA_FIXTURES_PATH } from "@caspeco/test-utils";

describe("validate react config", () => {
	describe("react-hooks plugin", () => {
		it("validates hooks rules, react-hooks/rules-of-hooks", async function async() {
			const cli = new eslint.ESLint({
				overrideConfig: frontendReact as eslint.ESLint.Options["overrideConfig"],
				overrideConfigFile: true,
			});

			const result = await cli.lintFiles("__tests__/fixtures/react/react-hooks.tsx");
			assertHasEslintError(result, "react-hooks/rules-of-hooks");
		});

		it("validates hooks rules, react-hooks/exhaustive-deps", async function async() {
			const cli = new eslint.ESLint({
				overrideConfig: frontendReact as eslint.ESLint.Options["overrideConfig"],
				overrideConfigFile: true,
			});

			const result = await cli.lintFiles("__tests__/fixtures/react/react-hooks-2.tsx");
			assertHasEslintError(result, "react-hooks/exhaustive-deps");
		});
	});

	describe("react-refresh plugin", () => {
		it("validates react-refresh/only-export-components", async function async() {
			const cli = new eslint.ESLint({
				overrideConfig: frontendReact as eslint.ESLint.Options["overrideConfig"],
				overrideConfigFile: true,
			});

			const result = await cli.lintFiles("__tests__/fixtures/react/react-refresh.tsx");
			assertHasEslintError(result, "react-refresh/only-export-components");
		});
	});

	describe("caspeco-react/discourage-chakra-import", () => {
		it("validates invalid chakra import", async function async() {
			const cli = new eslint.ESLint({
				overrideConfig: frontendReact as eslint.ESLint.Options["overrideConfig"],
				overrideConfigFile: true,
			});

			const result = await cli.lintFiles("__tests__/fixtures/react/restricted-imports.tsx");
			assertHasEslintError(result, "caspeco-react/discourage-chakra-import");
		});
	});

	describe("react plugin", () => {
		it("validates react/no-find-dom-node", async function async() {
			const cli = new eslint.ESLint({
				overrideConfig: frontendReact as eslint.ESLint.Options["overrideConfig"],
				overrideConfigFile: true,
			});

			const result = await cli.lintFiles("__tests__/fixtures/react/react-plugin-domnode.tsx");
			assertHasEslintError(result, "react/no-find-dom-node");
		});
	});
});

// Also run the vanilla tests with the React config (inherits the vanilla config)
createVanillaTests(
	frontendReact as eslint.Linter.Config<eslint.Linter.RulesRecord>[],
	VANILLA_FIXTURES_PATH
)();

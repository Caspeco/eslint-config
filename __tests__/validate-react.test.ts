import { describe, it } from "vitest";
import eslint from "eslint";
import frontendReact from "./fixtures/react/eslint.config";
import { assertHasEslintError } from "./helper";
import { createVanillaTests } from "./vanilla-helper";

describe("validate react config", () => {
	describe("react-hooks plugin", () => {
		it("validates hooks rules, react-hooks/rules-of-hooks", async function async() {
			const cli = new eslint.ESLint({
				overrideConfig: frontendReact,
				overrideConfigFile: true,
			});

			const result = await cli.lintFiles("__tests__/fixtures/react/react-hooks.tsx");
			assertHasEslintError(result, "react-hooks/rules-of-hooks");
		});

		it("validates hooks rules, react-hooks/exhaustive-deps", async function async() {
			const cli = new eslint.ESLint({
				overrideConfig: frontendReact,
				overrideConfigFile: true,
			});

			const result = await cli.lintFiles("__tests__/fixtures/react/react-hooks-2.tsx");
			assertHasEslintError(result, "react-hooks/exhaustive-deps");
		});
	});

	describe("react-refresh plugin", () => {
		it("validates react-refresh/only-export-components", async function async() {
			const cli = new eslint.ESLint({
				overrideConfig: frontendReact,
				overrideConfigFile: true,
			});

			const result = await cli.lintFiles("__tests__/fixtures/react/react-refresh.tsx");
			assertHasEslintError(result, "react-refresh/only-export-components");
		});
	});

	describe("caspeco/discourage-chakra-import", () => {
		it("validates invalid chakra import", async function async() {
			const cli = new eslint.ESLint({
				overrideConfig: frontendReact,
				overrideConfigFile: true,
			});

			const result = await cli.lintFiles("__tests__/fixtures/react/restricted-imports.tsx");
			assertHasEslintError(result, "caspeco/discourage-chakra-import");
		});
	});

	describe("react plugin", () => {
		it("validates react/no-find-dom-node", async function async() {
			const cli = new eslint.ESLint({
				overrideConfig: frontendReact,
				overrideConfigFile: true,
			});

			const result = await cli.lintFiles("__tests__/fixtures/react/react-plugin-domnode.tsx");
			assertHasEslintError(result, "react/no-find-dom-node");
		});
	});
});

// Also run the vanilla tests with the React config (inherits the vanilla config)
createVanillaTests(frontendReact)();

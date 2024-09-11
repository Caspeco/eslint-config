import { describe, it } from "vitest";
import eslint from "eslint";
import frontendReact from "../src/frontend-react";
import { assertHasEslintError } from "./helper";

describe("validate react config", () => {
	describe("react-hooks plugin", () => {
		it.skip("react-hooks/exhaustive-deps", async function async() {
			const cli = new eslint.ESLint({
				overrideConfig: frontendReact,
				overrideConfigFile: true,
			});

			const result = await cli.lintFiles("__tests__/fixtures/react/react-hooks.tsx");
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

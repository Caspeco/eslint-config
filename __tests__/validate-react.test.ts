import { describe, it } from "vitest";
import eslint from "eslint";
import frontendReact from "./fixtures/react/eslint.config";
import { assertHasEslintError } from "./helper";

describe("validate react config", () => {
	describe("vanilla", () => {
		it.skip("validates hooks rules", async function async() {
			const cli = new eslint.ESLint({
				overrideConfig: frontendReact,
				overrideConfigFile: true,
			});

			const result = await cli.lintFiles("__tests__/fixtures/react/react-hooks.tsx");
			assertHasEslintError(result, "react-hooks/exhaustive-deps");
		});

		it("validates react-refresh rules", async function async() {
			const cli = new eslint.ESLint({
				overrideConfig: frontendReact,
				overrideConfigFile: true,
			});

			const result = await cli.lintFiles("__tests__/fixtures/react/react-refresh.tsx");
			assertHasEslintError(result, "react-refresh/only-export-components");
		});
	});
});

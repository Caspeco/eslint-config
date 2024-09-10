import { describe, it } from "vitest";
import eslint from "eslint";
import frontendReact from "../frontend-react";
import { assertHasEslintError } from "./helper";

describe("validate frontend config", () => {
	describe("vanilla", () => {
		it.skip("validates hooks rules", async function async() {
			const cli = new eslint.ESLint({
				overrideConfig: frontendReact,
				overrideConfigFile: true,
			});

			const result = await cli.lintFiles("./src/react-hooks.tsx");
			assertHasEslintError(result, "react-hooks/exhaustive-deps");
		});

		it("validates react-refresh rules", async function async() {
			const cli = new eslint.ESLint({
				overrideConfig: frontendReact,
				overrideConfigFile: true,
			});

			const result = await cli.lintFiles("./src/react-refresh.tsx");
			assertHasEslintError(result, "react-refresh/only-export-components");
		});
	});
});

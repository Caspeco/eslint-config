import { describe, it } from "vitest";
import eslint from "eslint";
import frontendVanilla from "../src/frontend-vanilla";
import { assertHasEslintError } from "./helper";

describe("validate frontend config", () => {
	describe("general rules", () => {
		it("load config in eslint to validate all rule syntax is correct", async function async() {
			const cli = new eslint.ESLint({
				overrideConfig: frontendVanilla,
				overrideConfigFile: true,
			});

			const result = await cli.lintFiles("__tests__/fixtures/vanilla/frontend.ts");
			assertHasEslintError(result, "@typescript-eslint/no-unused-vars");
			assertHasEslintError(result, "no-var");
		});
	});
	describe("check-file plugin", () => {
		it("validates check-file/filename-naming-convention", async function async() {
			const cli = new eslint.ESLint({
				overrideConfig: frontendVanilla,
				overrideConfigFile: true,
			});

			const result = await cli.lintFiles("__tests__/fixtures/vanilla/invalidFileName.ts");
			assertHasEslintError(result, "check-file/filename-naming-convention");
		});
	});
});

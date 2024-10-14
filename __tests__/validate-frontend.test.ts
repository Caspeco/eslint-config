import { describe, it } from "vitest";
import eslint from "eslint";
import frontendVanilla from "./fixtures/vanilla/eslint.config";
import { assertHasEslintError } from "./helper";

describe("validate frontend config", () => {
	describe("vanilla", () => {
		it("load config in eslint to validate all rule syntax is correct", async function async() {
			const cli = new eslint.ESLint({
				overrideConfig: frontendVanilla,
				overrideConfigFile: true,
			});

			const result = await cli.lintFiles("__tests__/fixtures/vanilla/frontend.ts");
			assertHasEslintError(result, "@typescript-eslint/no-unused-vars");
			assertHasEslintError(result, "@typescript-eslint/no-unsafe-assignment");
			assertHasEslintError(result, "no-var");
		});

		it("validates invalid file name rule", async function async() {
			const cli = new eslint.ESLint({
				overrideConfig: frontendVanilla,
				overrideConfigFile: true,
			});

			const result = await cli.lintFiles("__tests__/fixtures/vanilla/invalidFileName.ts");
			assertHasEslintError(result, "check-file/filename-naming-convention");
		});
	});
});

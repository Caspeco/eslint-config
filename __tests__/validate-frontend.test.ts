import { describe, it } from "vitest";
import eslint from "eslint";
import eslintrcFrontend from "../frontend-vanilla";

import { assertHasEslintError } from "./helper";

describe("validate frontend config", () => {
	describe("vanilla", () => {
		it("load config in eslint to validate all rule syntax is correct", async function async() {
			const cli = new eslint.ESLint({
				useEslintrc: false,
				baseConfig: eslintrcFrontend,
			});

			const result = await cli.lintFiles("./src/frontend.ts");
			assertHasEslintError(result, "@typescript-eslint/no-unused-vars");
			assertHasEslintError(result, "no-var");
		});

		it("validates invalid file name rule", async function async() {
			const cli = new eslint.ESLint({
				useEslintrc: false,
				baseConfig: eslintrcFrontend,
			});

			const result = await cli.lintFiles("./src/invalidFileName.ts");
			assertHasEslintError(result, "check-file/filename-naming-convention");
		});
	});
});

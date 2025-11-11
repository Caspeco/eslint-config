import { ESLint } from "eslint";
import { assert } from "vitest";

export const assertHasEslintError = (result: ESLint.LintResult[], errorName: string | null) => {
	for (const file of result) {
		for (const error of file.messages) {
			if (error.ruleId === errorName) {
				return;
			}
		}
	}
	assert.fail("Eslint error not found: " + errorName);
};

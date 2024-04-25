import { assert } from "vitest";

export const assertHasEslintError = function (result: any, errorName: any) {
	for (const file of result) {
		for (const error of file.messages) {
			if (error.ruleId === errorName) {
				return;
			}
		}
	}
	assert.fail("Eslint error not found: " + errorName);
};

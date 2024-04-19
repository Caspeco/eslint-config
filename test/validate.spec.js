const eslint = require("eslint");
const eslintrcFrontend = require("../frontend-vanilla");
const { assertHasEslintError } = require("./helper");

describe("validate frontend config", function () {
    describe("vanilla", function () {
        it("load config in eslint to validate all rule syntax is correct", async function() {
            const cli = new eslint.ESLint({
                useEslintrc: false,
                baseConfig: eslintrcFrontend,
            });

            const result = await cli.lintFiles("./src/frontend.js");

            assertHasEslintError(result, "@typescript-eslint/no-unused-vars");
            assertHasEslintError(result, "prettier/prettier");
        })
    })
});
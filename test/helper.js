const assert = require('assert').strict;

exports.assertHasEslintError = function (result, errorName) {
    for (const file of result) {
        for(const error of file.messages) {
            if(error.ruleId === errorName) {
                return
            }
        }
    }
    assert.fail("Eslint error not found: " + errorName)
}
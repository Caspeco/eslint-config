import frontendVanilla from "./fixtures/vanilla/eslint.config";
import { createVanillaTests } from "../../../__test-utils__/validate-vanilla";
import eslint from "eslint";

// Tests are instantiated from shared helper to easier test inherited configs
createVanillaTests(
	frontendVanilla as eslint.Linter.Config<eslint.Linter.RulesRecord>[],
	"__tests__/fixtures/vanilla"
)();

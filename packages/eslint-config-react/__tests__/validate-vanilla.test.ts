import reactConfig from "./fixtures/vanilla/eslint.config";
import { createVanillaTests } from "../../../__test-utils__/validate-vanilla";
import eslint from "eslint";

// Tests are instantiated from shared helper to test that vanilla rules work in React config
createVanillaTests(
	reactConfig as eslint.Linter.Config<eslint.Linter.RulesRecord>[],
	"__tests__/fixtures/vanilla"
)();

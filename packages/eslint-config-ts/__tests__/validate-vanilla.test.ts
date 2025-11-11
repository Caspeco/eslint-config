import frontendVanilla from "./fixtures/vanilla/eslint.config";
import { createVanillaTests, VANILLA_FIXTURES_PATH } from "@caspeco/test-utils";
import eslint from "eslint";

// Tests are instantiated from shared helper to easier test inherited configs
createVanillaTests(
	frontendVanilla as eslint.Linter.Config<eslint.Linter.RulesRecord>[],
	VANILLA_FIXTURES_PATH
)();

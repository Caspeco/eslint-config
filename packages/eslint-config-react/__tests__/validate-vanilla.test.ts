import reactConfig from "./fixtures/vanilla/eslint.config";
import { createVanillaTests, VANILLA_FIXTURES_PATH } from "@caspeco/test-utils";
import eslint from "eslint";

// Tests are instantiated from shared helper to test that vanilla rules work in React config
createVanillaTests(
	reactConfig as eslint.Linter.Config<eslint.Linter.RulesRecord>[],
	VANILLA_FIXTURES_PATH
)();

import frontendVanilla from "./fixtures/vanilla/eslint.config";
import { createVanillaTests } from "./vanilla-helper";

// Tests are instansiated from vanilla-helper to easier test inherited configs
createVanillaTests(frontendVanilla)();

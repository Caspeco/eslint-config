import { createConfig } from "./create-config.js";

// Default config: only the rules of hooks and exhaustive deps. We intentionally
// skip the React Compiler specific rules here — teams that have adopted the
// React Compiler should use the `@caspeco/eslint-config-react/compiler` config.
// https://github.com/facebook/react/tree/main/packages/eslint-plugin-react-hooks#flat-config-eslintconfigjsts-1
/** @type {import('typescript-eslint').ConfigArray} */
const flatConfig = createConfig({
	"react-hooks/rules-of-hooks": "error",
	"react-hooks/exhaustive-deps": "warn",
});

export default flatConfig;

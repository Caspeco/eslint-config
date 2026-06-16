import { createConfig } from "./create-config.js";

/** @type {import('typescript-eslint').ConfigArray} */
const flatConfig = createConfig({
	reactHooksRules: {
		"react-hooks/rules-of-hooks": "error",
		"react-hooks/exhaustive-deps": "warn",
	},
});

export default flatConfig;

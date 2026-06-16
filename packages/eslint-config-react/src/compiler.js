import reactHooksPlugin from "eslint-plugin-react-hooks";
import { createConfig } from "./create-config.js";

/** @type {import('typescript-eslint').ConfigArray} */
const flatConfig = createConfig({
	reactHooksRules: {
		...reactHooksPlugin.configs.recommended.rules,
	},
});

export default flatConfig;

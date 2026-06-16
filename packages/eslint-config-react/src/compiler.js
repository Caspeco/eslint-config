import reactHooksPlugin from "eslint-plugin-react-hooks";
import { createConfig } from "./create-config.js";

// React Compiler opt-in config: enables the full `eslint-plugin-react-hooks`
// recommended ruleset, which includes the React Compiler specific rules
// (e.g. static-components, use-memo, immutability, purity, set-state-in-render).
// Use this instead of the default config once your project has adopted the
// React Compiler. It is a superset of the default config.
/** @type {import('typescript-eslint').ConfigArray} */
const flatConfig = createConfig({
	...reactHooksPlugin.configs.recommended.rules,
});

export default flatConfig;

import { fixupRule } from "@eslint/compat";
import tsConfig from "@caspeco/eslint-config-ts";
import reactRefresh from "eslint-plugin-react-refresh";
import reactPlugin from "eslint-plugin-react";
import reactHooksPlugin from "eslint-plugin-react-hooks";
import caspecoReactPlugin from "./plugins/caspeco-react.js";
import globals from "globals";

// eslint-plugin-react calls rule context and SourceCode methods that ESLint 10
// removed. Patched in place rather than with `fixupPluginRules`, which returns
// a copy: `configs.flat.recommended` registers the original object, and two
// different objects under "react" fail with `Cannot redefine plugin "react"`.
const reactRules = /** @type {Record<string, any>} */ (reactPlugin.rules);
for (const [name, rule] of Object.entries(reactRules)) {
	reactRules[name] = fixupRule(rule);
}

/**
 * Builds the Caspeco React flat config. The only part that varies between the
 * default and the React Compiler opt-in config is the set of `react-hooks` rules.
 *
 * @param {object} options
 * @param {import('eslint').Linter.RulesRecord} options.reactHooksRules
 * @returns {import('typescript-eslint').ConfigArray}
 */
export function createConfig({ reactHooksRules }) {
	return [
		// Extend the vanilla TypeScript config
		...tsConfig,
		// React plugin recommended config
		{
			...reactPlugin.configs.flat?.recommended,
			files: ["**/*.ts", "**/*.tsx", "**/*.jsx"],
			settings: {
				react: {
					version: "detect",
				},
			},
			languageOptions: {
				...reactPlugin.configs.flat?.recommended.languageOptions,
				globals: {
					...globals.serviceworker,
					...globals.browser,
				},
				parserOptions: {
					...reactPlugin.configs.flat?.recommended.languageOptions?.parserOptions,
					ecmaVersion: "latest",
				},
			},
			rules: {
				...reactPlugin.configs.flat?.recommended.rules,
				"react/react-in-jsx-scope": "off",
				"react/prop-types": "off",
				"react/display-name": "off",
			},
		},
		// React hooks plugin config
		{
			...reactHooksPlugin.configs.recommended,
			plugins: { "react-hooks": reactHooksPlugin },
			files: ["**/*.ts", "**/*.tsx", "**/*.jsx"],
			rules: reactHooksRules,
		},
		// React refresh plugin config
		{
			...reactRefresh.configs.recommended,
			files: ["**/*.ts", "**/*.tsx", "**/*.jsx"],
			rules: {
				...reactRefresh.configs.recommended.rules,
				"react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
			},
		},
		// Caspeco React custom rules
		{
			files: ["**/*.ts", "**/*.tsx", "**/*.jsx"],
			plugins: {
				"caspeco-react": caspecoReactPlugin,
			},
			rules: {
				"caspeco-react/discourage-chakra-import": "error",
			},
		},
	];
}

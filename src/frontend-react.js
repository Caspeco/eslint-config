import frontendVanilla from "./frontend-vanilla.js";
import reactRefresh from "eslint-plugin-react-refresh";
import reactPlugin from "eslint-plugin-react";
import reactHooksPlugin from "eslint-plugin-react-hooks";
import caspecoPlugin from "./plugins/caspeco.js";
import globals from "globals";

/** @type {import('@typescript-eslint/utils').TSESLint.FlatConfig.ConfigArray} */
const flatConfig = [
	...frontendVanilla,
	// React plugin recommended config (single object)
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
	// React hooks plugin recommended config (single object)
	{
		...reactHooksPlugin.configs.recommended,
		plugins: { "react-hooks": reactHooksPlugin },
		files: ["**/*.ts", "**/*.tsx", "**/*.jsx"],
		rules: {
			...reactHooksPlugin.configs.recommended.rules,
		},
	},
	// React refresh plugin config (single object)
	{
		...reactRefresh.configs.recommended,
		files: ["**/*.ts", "**/*.tsx", "**/*.jsx"],
		rules: {
			...reactRefresh.configs.recommended.rules,
			"react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
		},
	},
	// Additional custom rules
	{
		files: ["**/*.ts", "**/*.tsx", "**/*.jsx"],
		plugins: {
			caspeco: caspecoPlugin,
		},
		rules: {
			"caspeco/discourage-chakra-import": "error",
		},
	},
];

export default flatConfig;

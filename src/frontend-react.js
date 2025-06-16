import frontendVanilla from "./frontend-vanilla.js";
// @ts-ignore
import reactRefresh from "eslint-plugin-react-refresh";
import reactPlugin from "eslint-plugin-react";
// @ts-ignore
import reactHooksPlugin from "eslint-plugin-react-hooks";
import caspecoPlugin from "./plugins/caspeco.js";
import globals from "globals";

/** @type {import('@typescript-eslint/utils').TSESLint.FlatConfig.ConfigArray} */
const flatConfig = [
	...frontendVanilla,
	{
		files: ["**/*.ts", "**/*.tsx", "**/*.jsx"],
		settings: {
			react: {
				version: "detect",
			},
		},
		plugins: {
			react: reactPlugin,
			caspeco: caspecoPlugin,
			"react-refresh": reactRefresh,
			"react-hooks": reactHooksPlugin,
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
			...reactHooksPlugin.configs.recommended.rules,
			"react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
			"react/react-in-jsx-scope": "off",
			"react/prop-types": "off",
			"react/display-name": "off",
			"caspeco/discourage-chakra-import": "error",
		},
	},
];

export default flatConfig;

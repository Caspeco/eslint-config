import frontendVanilla from "./frontend-vanilla.js";
import reactRefresh from "eslint-plugin-react-refresh";
import reactPlugin from "eslint-plugin-react";
import reactHooksPlugin from "eslint-plugin-react-hooks";
import globals from "globals";

/** @type {import('eslint').Linter.Config[]} */
const flatConfig = [
	...frontendVanilla,
	{
		files: ["**/*.tsx", "**/*.jsx"],
		settings: {
			react: {
				version: "detect",
			},
		},
		plugins: {
			react: reactPlugin,
			"react-refresh": reactRefresh,
			"react-hooks": reactHooksPlugin,
		},
		languageOptions: {
			...reactPlugin.configs.flat.recommended.languageOptions,
			globals: {
				...globals.serviceworker,
				...globals.browser,
			},
		},
		rules: {
			...reactPlugin.configs.flat.recommended.rules,
			...reactHooksPlugin.configs.recommended.rules,
			"react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
			"react/react-in-jsx-scope": "off",
			"react/prop-types": "off",
			"no-restricted-imports": [
				"error",
				{
					patterns: ["@chakra-ui/**"],
				},
			],
		},
	},
];

export default flatConfig;

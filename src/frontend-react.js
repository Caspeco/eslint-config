import frontendVanilla from "./frontend-vanilla.js";
// @ts-ignore
import reactRefresh from "eslint-plugin-react-refresh";
import reactPlugin from "eslint-plugin-react";
// @ts-ignore
import reactHooksPlugin from "eslint-plugin-react-hooks";
import caspecoDiscourageChakraImport from "./plugins/caspeco.js";
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
			react: /** @type {import('eslint').ESLint.Plugin} */ (reactPlugin),
			caspeco: caspecoDiscourageChakraImport,
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
			"react/display-name": "off",
			"caspeco/discourage-chakra-import": "error",
		},
	},
];

export default flatConfig;

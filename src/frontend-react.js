import frontendVanilla from "./frontend-vanilla.js";
import reactRefresh from "eslint-plugin-react-refresh";
import reactPlugin from "eslint-plugin-react";

/** @type {import('eslint').Linter.Config[]} */
const flatConfig = [
	...frontendVanilla,
	{
		files: ["**/*.tsx", "**/*.jsx"],
		...reactPlugin.configs.flat["jsx-runtime"],
		...reactPlugin.configs.flat.recommended,
		settings: {
			react: {
				version: "detect",
			},
		},
	},
	{
		files: ["**/*.tsx", "**/*.jsx"],
		plugins: {
			"react-refresh": reactRefresh,
		},
		rules: {
			"react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
			"react/react-in-jsx-scope": "off",
			"react/prop-types": "off",
		},
	},
];

export default flatConfig;

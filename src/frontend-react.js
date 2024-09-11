import frontendVanilla from "./frontend-vanilla.js";
import reactRefresh from "eslint-plugin-react-refresh";
import reactPlugin from "eslint-plugin-react";

/** @type {import('eslint').Linter.Config[]} */
const flatConfig = [
	...frontendVanilla,
	reactPlugin.configs.flat.recommended,
	{
		files: ["**/*.tsx", "**/*.jsx"],
		plugins: {
			"react-refresh": reactRefresh,
		},
		rules: {
			"react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
		},
	},
];

export default flatConfig;

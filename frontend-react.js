import frontendVanilla from "./frontend-vanilla.js";
import reactRefresh from "eslint-plugin-react-refresh";

/** @type {import('eslint').Linter.Config[]} */
const flatConfig = [
	...frontendVanilla,
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

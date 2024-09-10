const frontendVanilla = require("./frontend-vanilla");
const reactRefresh = require("eslint-plugin-react-refresh");

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

module.exports = flatConfig;

import { configs as typescriptEslintConfig, parser, plugin } from "typescript-eslint";
import js from "@eslint/js";
import checkFile from "eslint-plugin-check-file";
import eslintConfigPrettier from "eslint-config-prettier";
import noBarrelFilesPlugin from "eslint-plugin-no-barrel-files";
import reactRefresh from "eslint-plugin-react-refresh";
import reactPlugin from "eslint-plugin-react";
import reactHooksPlugin from "eslint-plugin-react-hooks";
import caspecoReactPlugin from "./plugins/caspeco-react.js";
import globals from "globals";

/** @type {import('@typescript-eslint/utils').TSESLint.FlatConfig.ConfigArray} */
const flatConfig = [
	// Base JavaScript/TypeScript configs (from vanilla)
	js.configs.recommended,
	...typescriptEslintConfig.recommendedTypeChecked,
	{
		languageOptions: {
			parserOptions: {
				projectService: true,
				// @ts-ignore
				tsconfigRootDir: import.meta.name,
			},
		},
	},
	// TypeScript file-specific rules (from vanilla)
	{
		files: ["**/*.ts", "**/*.tsx"],
		ignores: ["**/*.d.ts", "**/dist/**/*", "**/node_modules/**/*"],
		linterOptions: {
			reportUnusedDisableDirectives: "warn",
		},
		languageOptions: {
			parser: parser,
			sourceType: "module",
		},
		plugins: {
			"@typescript-eslint": plugin,
			"check-file": checkFile,
			"no-barrel-files": noBarrelFilesPlugin,
		},
		rules: {
			"no-barrel-files/no-barrel-files": "error",
			"check-file/filename-naming-convention": [
				"error",
				{
					"**/*.{js,ts,tsx}": "KEBAB_CASE",
				},
				{
					ignoreMiddleExtensions: true,
				},
			],
			"check-file/folder-naming-convention": [
				"error",
				{
					"src/**/": "KEBAB_CASE",
				},
			],
		},
	},
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
	// React hooks plugin recommended config
	{
		...reactHooksPlugin.configs.recommended,
		plugins: { "react-hooks": reactHooksPlugin },
		files: ["**/*.ts", "**/*.tsx", "**/*.jsx"],
		rules: {
			"react-hooks/rules-of-hooks": "error",
			"react-hooks/exhaustive-deps": "warn",
			// We ignore the compiler specific rules as we need React 19 for this.
			// https://github.com/facebook/react/tree/main/packages/eslint-plugin-react-hooks#flat-config-eslintconfigjsts-1
			// When we support this, we can add:
			// ...reactHooksPlugin.configs.recommended.rules,
		},
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
	// Prettier config (must be last from vanilla)
	eslintConfigPrettier,
];

export default flatConfig;

import { configs as typescriptEslintConfig, parser, plugin } from "typescript-eslint";
import js from "@eslint/js";
import checkFile from "eslint-plugin-check-file";
import eslintConfigPrettier from "eslint-config-prettier";
import noBarrelFilesPlugin from "eslint-plugin-no-barrel-files";

/** @type {import('@typescript-eslint/utils').TSESLint.FlatConfig.ConfigArray} */
const flatConfig = [
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
			"eqeqeq": ["error", "always"],
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
	eslintConfigPrettier,
];

export default flatConfig;

import { configs as typescriptEslintConfig, parser, plugin } from "typescript-eslint";
import js from "@eslint/js";
import checkFile from "eslint-plugin-check-file";
import eslintConfigPrettier from "eslint-config-prettier";

/** @type {import('eslint').Linter.Config[]} */
const flatConfig = [
	js.configs.recommended,
	...typescriptEslintConfig.recommendedTypeChecked,
	{
		languageOptions: {
			parserOptions: {
				projectService: true,
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
		},
		rules: {
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

import { configs as typescriptEslintConfig, parser, plugin } from "typescript-eslint";
import js from "@eslint/js";
// @ts-ignore
import checkFile from "eslint-plugin-check-file";
// @ts-ignore
import eslintConfigPrettier from "eslint-config-prettier";
// @ts-ignore
import noBarrelFilesPlugin from "eslint-plugin-no-barrel-files";

/** @type {import('eslint').Linter.Config[]} */
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

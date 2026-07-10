import { configs as typescriptEslintConfig, parser } from "typescript-eslint";
import js from "@eslint/js";
import checkFile from "eslint-plugin-check-file";
import eslintConfigPrettier from "eslint-config-prettier";
import noBarrelFilesPlugin from "eslint-plugin-no-barrel-files";
import baselineJs from "eslint-plugin-baseline-js";

const baselineRecommendedTs = baselineJs.configs["recommended-ts"]({
	available: "widely",
	level: "warn",
});

/** @type {import('typescript-eslint').ConfigArray} */
const flatConfig = [
	js.configs.recommended,
	...typescriptEslintConfig.recommendedTypeChecked,
	{ plugins: { "baseline-js": baselineJs } },
	{
		...baselineRecommendedTs,
		files: ["**/*.ts", "**/*.tsx"],
		ignores: ["**/*.d.ts", "**/dist/**/*", "**/node_modules/**/*"],
		rules: /** @type {import('typescript-eslint').ConfigArray[number]['rules']} */ (
			baselineRecommendedTs.rules
		),
	},
	{
		languageOptions: {
			parserOptions: {
				projectService: true,
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
			"check-file": checkFile,
			"no-barrel-files": noBarrelFilesPlugin,
		},
		rules: {
			eqeqeq: ["error", "always"],
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

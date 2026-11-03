import { configs as typescriptEslintConfig, parser } from "typescript-eslint";
import js from "@eslint/js";
import checkFile from "eslint-plugin-check-file";
import eslintConfigPrettier from "eslint-config-prettier";
import noBarrelFilesPlugin from "eslint-plugin-no-barrel-files";
import baselineJs from "eslint-plugin-baseline-js";
import caspecoTs from "./plugins/caspeco-ts.js";

const baselineRecommendedTs = baselineJs.configs["recommended-ts"]({
	available: "widely",
	level: "warn",
});

/** @type {import('typescript-eslint').ConfigArray} */
const flatConfig = [
	js.configs.recommended,
	...typescriptEslintConfig.recommendedTypeChecked,
	{
		languageOptions: {
			parserOptions: {
				projectService: true,
			},
		},
	},
	{
		// No `files`/`ignores`, so the plugins resolve for every file. Any block
		// that sets a rule can then be scoped freely without "Could not find plugin".
		plugins: {
			"baseline-js": baselineJs,
			"caspeco-ts": caspecoTs,
			"check-file": checkFile,
			"no-barrel-files": noBarrelFilesPlugin,
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
		rules: {
			.../** @type {import('typescript-eslint').ConfigArray[number]['rules']} */ (
				baselineRecommendedTs.rules
			),
			eqeqeq: ["error", "always"],
			"caspeco-ts/no-chained-type-assertions": "error",
			"caspeco-ts/no-reduce-accumulator-copy": "error",
			"@typescript-eslint/consistent-type-assertions": [
				"error",
				{
					assertionStyle: "as",
					objectLiteralTypeAssertions: "never",
				},
			],
			"@typescript-eslint/switch-exhaustiveness-check": [
				"error",
				{
					considerDefaultExhaustiveForUnions: true,
				},
			],
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
	{
		// Partial fakes (`{ location } as unknown as Window`) are the norm in tests.
		files: [
			"**/*.test.{ts,tsx}",
			"**/*.spec.{ts,tsx}",
			"**/__tests__/**/*.{ts,tsx}",
			"**/__mocks__/**/*.{ts,tsx}",
		],
		rules: {
			"caspeco-ts/no-chained-type-assertions": "off",
		},
	},
	eslintConfigPrettier,
];

export default flatConfig;

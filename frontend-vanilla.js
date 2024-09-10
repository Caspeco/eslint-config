const tseslint = require('typescript-eslint');
const eslint = require('@eslint/js');
const checkFile = require('eslint-plugin-check-file');
const eslintConfigPrettier = require("eslint-config-prettier");

/** @type {import('eslint').Linter.Config[]} */
const flatConfig = [
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  {
    linterOptions: {
      reportUnusedDisableDirectives: 'warn'
    },
    languageOptions: {
      parser: tseslint.parser,
      sourceType: 'module'
    },
    files: ['**/*.ts'],
    ignores: ['**/*.d.ts', '**/dist/**/*', '**/node_modules/**/*'],
    plugins: {
      '@typescript-eslint': tseslint.plugin,
      'check-file': checkFile,
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
  eslintConfigPrettier
];

module.exports = flatConfig;
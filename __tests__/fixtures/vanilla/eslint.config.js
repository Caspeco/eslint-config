import vanillaConfig from "./../../../src/frontend-vanilla.js";

const config = [
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parserOptions: {
        project: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  ...vanillaConfig
];

export default config;

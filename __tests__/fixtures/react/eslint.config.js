import reactConfig from "./../../../src/frontend-react.js";

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
  ...reactConfig
];

export default config;

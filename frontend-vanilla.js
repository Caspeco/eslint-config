module.exports = {
  env: {
    node: true,
    es2020: true,
    browser: true,
  },
  parser: "@typescript-eslint/parser",
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  plugins: [],
  rules: {},
};

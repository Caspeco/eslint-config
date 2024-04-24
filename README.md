# @caspeco/eslint-config

## Usage

The provided configuration contains shared ESLint rules for typescript projects across Caspeco. To use this configuration you'll need `.eslintrc.js` file in your project root with the following content:

```diff
// .eslintrc.js
+ module.exports = {
+   extends: "@caspeco",
+ };
```

### Frontend Vanilla

Uses the rules defined in [frontend-vanilla.js](frontend-vanilla.js).

```diff
// .eslintrc.js
+ module.exports = {
+   extends: "@caspeco/eslint-config/frontend-vanilla",
+ };
```

### Frontend React

Uses the rules defined in [frontend-react.js](frontend-react.js). It's also combined with the rules from [frontend-vanilla.js](frontend-vanilla.js).

```diff
// .eslintrc.js
+ module.exports = {
+   extends: "@caspeco/eslint-config/frontend-react",
+ };
```

## Contributing

- Create a PAT (Classic) on Github with the scope "Packages: Read".
- Set an environment variable locally named `GPR_PRIVATE_READ_TOKEN` to the PAT created
- Run `npm install`

### Tests

```bash
npm install
npm run test
```

## Credit

Based on the work of [Chainsafe: eslint-config](https://github.com/ChainSafe/eslint-config)

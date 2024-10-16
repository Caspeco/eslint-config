# @caspeco/eslint-config

## Usage

The provided configuration contains shared ESLint rules for typescript projects across Caspeco.

### Frontend Vanilla

```bash
npm install --save-dev @caspeco/eslint-config
```

To use this configuration you'll need `eslint.config.js` file in your project root with the following content (for example):

```diff
+ import { vanillaConfig } from "@caspeco/eslint-config";
+
+ const config = [
+ 	{ ignores: ["src/accessmanagement-api.ts", "src/types/caspeco-navigation"] },
+ 	...vanillaConfig,
+ ];
+
+ export default config;
```

### Frontend React

```bash
npm install --save-dev @caspeco/eslint-config eslint-plugin-react-refresh eslint-plugin-react-hooks eslint-plugin-react
```

To use this configuration you'll need `eslint.config.js` file in your project root with the following content (for example):

```diff
+ import { reactConfig } from "@caspeco/eslint-config";
+
+ const config = [
+ 	{ ignores: ["src/accessmanagement-api.ts", "src/types/caspeco-navigation"] },
+ 	...reactConfig,
+ ];
+
+ export default config;
```

#### What is included in the React configuration?

- [eslint-react-plugin](https://github.com/jsx-eslint/eslint-plugin-react)
- [eslint-plugin-react-refresh](https://github.com/ArnaudBarre/eslint-plugin-react-refresh)
- [eslint-plugin-react-hooks](https://www.npmjs.com/package/eslint-plugin-react-hooks)

For details, see [frontend-react.js](https://github.com/Caspeco/eslint-config/blob/main/src/frontend-react.js).

## Release

- Go to [Github Releases](https://github.com/Caspeco/eslint-config/releases)
- Click "Draft a new release"
- Enter the version that you'd like to release, skip the `v` prefix.
- Publish

_You can ignore the version in the `package.json` file, that is only used when you're publishing manually to NPM, e.g. a preview version._

### Publish a preview to NPM

```bash
npm --ignore-scripts publish --access public --tag next
```

This step requires you to be a collaborator on the NPM package.

## Tests

```bash
npm install
npm run test
```

## Credit

Based on the work of [Chainsafe: eslint-config](https://github.com/ChainSafe/eslint-config)

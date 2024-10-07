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

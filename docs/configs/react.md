# Frontend React

## Usage

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

## Plugins

For details, see [frontend-react.js](https://github.com/Caspeco/eslint-config/blob/main/src/frontend-react.js).

### caspeco-plugin

[caspeco-plugin](/plugins/caspeco.md)

### eslint-react-plugin

[eslint-react-plugin](https://github.com/jsx-eslint/eslint-plugin-react)

### eslint-plugin-react-refresh

[eslint-plugin-react-refresh](https://github.com/ArnaudBarre/eslint-plugin-react-refresh)

### eslint-plugin-react-hooks

[eslint-plugin-react-hooks](https://www.npmjs.com/package/eslint-plugin-react-hooks)

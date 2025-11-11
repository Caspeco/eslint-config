# React + TypeScript Configuration

For React projects with TypeScript.

## Installation

```bash
npm install --save-dev @caspeco/eslint-config-react
```

**Note:** This package depends on and extends `@caspeco/eslint-config-ts`. All peer dependencies (ESLint plugins) from both packages are listed in their respective package.json files and will be automatically installed.

## Usage

Create an `eslint.config.js` file in your project root:

```js
import config from "@caspeco/eslint-config-react";

export default [{ ignores: ["dist/**/*", "build/**/*"] }, ...config];
```

## Migration from v4.x

Upgrading from `@caspeco/eslint-config` v4.x? See the [Migration Guide](/migration.md) or use the automated migration tool:

```bash
npx caspeco-react-migrate-v5 src/
```

## Plugins

For implementation details, see [index.js](https://github.com/Caspeco/eslint-config/blob/main/packages/eslint-config-react/src/index.js).

### caspeco-react-plugin

[caspeco-react-plugin](/plugins/caspeco-react.md)

### eslint-react-plugin

[eslint-react-plugin](https://github.com/jsx-eslint/eslint-plugin-react)

### eslint-plugin-react-refresh

[eslint-plugin-react-refresh](https://github.com/ArnaudBarre/eslint-plugin-react-refresh)

### eslint-plugin-react-hooks

[eslint-plugin-react-hooks](https://www.npmjs.com/package/eslint-plugin-react-hooks)

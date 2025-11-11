# @caspeco/eslint-config-react

Caspeco ESLint configuration for React + TypeScript projects.

## Installation

```bash
npm install --save-dev @caspeco/eslint-config-react
```

### Migrating from v4.x

If you're upgrading from `@caspeco/eslint-config` v4.x, use the automated migration script:

```bash
# Preview changes
npx caspeco-react-migrate-v5 src/ --dry-run

# Apply changes
npx caspeco-react-migrate-v5 src/
```

This updates the plugin namespace from `caspeco/` to `caspeco-react/`. See the [Migration Guide](../../MIGRATION.md) for details.

## Usage

Create an `eslint.config.js` file in your project root:

```js
import config from "@caspeco/eslint-config-react";

export default [{ ignores: ["dist/**/*", "build/**/*"] }, ...config];
```

## What's Included

This configuration includes everything from our TypeScript config plus React-specific rules:

### Base TypeScript Configuration

- **TypeScript ESLint** - recommended-type-checked config
- **No Barrel Files** - Prevents barrel file usage
- **File Naming Conventions** - Enforces kebab-case for files and folders
- **Prettier Integration** - Compatible with Prettier formatting

### React-Specific Configuration

- **React Plugin** - Core React linting rules
- **React Hooks** - Enforces rules of hooks
- **React Refresh** - Fast Refresh support for Vite/development
- **Caspeco Plugin** - Custom rules for Caspeco projects (Chakra UI import restrictions)

## Peer Dependencies

This package requires the following peer dependencies (automatically installed by npm 7+):

- `eslint` >=9
- `eslint-plugin-react` >=7.37.0
- `eslint-plugin-react-hooks` >=7
- `eslint-plugin-react-refresh` >=0.4.0
- `globals` >=15

**Note:** Additional TypeScript-related peer dependencies are inherited from `@caspeco/eslint-config-ts` (installed automatically as a regular dependency).

## Plugins

### eslint-plugin-react

[eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react)

Core React linting rules with the following customizations:

- `react-in-jsx-scope`: off (not needed in modern React)
- `prop-types`: off (using TypeScript instead)
- `display-name`: off

### eslint-plugin-react-hooks

[eslint-plugin-react-hooks](https://www.npmjs.com/package/eslint-plugin-react-hooks)

Enforces:

- Rules of Hooks (error)
- Exhaustive dependencies (warning)

### eslint-plugin-react-refresh

[eslint-plugin-react-refresh](https://github.com/ArnaudBarre/eslint-plugin-react-refresh)

Ensures components are compatible with Fast Refresh in development.

### caspeco-react-plugin

Custom React-specific plugin with Caspeco rules:

- Discourages direct imports from `@chakra-ui/react` (use themed components instead)

## Relationship with @caspeco/eslint-config-ts

This package depends on and extends `@caspeco/eslint-config-ts`, which is automatically installed as a dependency. This ensures React projects always use the same TypeScript rules without drift. If you're building a React project, use this package. For vanilla TypeScript projects, use `@caspeco/eslint-config-ts`.

## License

MIT

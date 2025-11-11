# TypeScript Configuration

For vanilla TypeScript projects (non-React).

## Installation

```bash
npm install --save-dev @caspeco/eslint-config-ts
```

## Usage

Create an `eslint.config.js` file in your project root:

```js
import config from "@caspeco/eslint-config-ts";

export default [{ ignores: ["dist/**/*", "build/**/*"] }, ...config];
```

## Migration from v4.x

Upgrading from `@caspeco/eslint-config` v4.x? See the [Migration Guide](/migration.md) or use the automated migration tool:

```bash
npx caspeco-ts-migrate-v5 .
```

## Plugins

For implementation details, see [index.js](https://github.com/Caspeco/eslint-config/blob/main/packages/eslint-config-ts/src/index.js).

### typescript-eslint

Using [recommended-type-checked](https://typescript-eslint.io/users/configs/#recommended-type-checked) config.

### eslint-plugin-no-barrel-files

[eslint-plugin-no-barrel-files](https://github.com/art0rz/eslint-plugin-no-barrel-files)

We opt out of using barrel files as they come with a couple of potential issues. They can slow down your build/tests, cause circular dependencies, and makes tree shaking more difficult.

_Note: We have situations where we allow barrel files, e.g. for libraries consumed as npm packages._

More information:

- [Please Stop Using Barrel Files](https://tkdodo.eu/blog/please-stop-using-barrel-files)

### eslint-plugin-check-file

[eslint-plugin-check-file](https://github.com/dukeluo/eslint-plugin-check-file/)

Using `KEBAB_CASE` for filename and folders.

#### Background

We enforce this naming convention because:

1. **Cross-Platform Consistency** : Avoids issues on case-insensitive systems (e.g., Windows, macOS) where `MyFile.js` and `myfile.js` are treated the same, causing potential conflicts. This can lead to problems in Git when contributors on different platforms push files with varying cases, creating unnecessary diffs or merge conflicts. Kebab-case ensures uniform file naming across all environments.
2. **Readability**: Clear, natural separation of words with hyphens.
3. **Predictability**: Enforcing kebab-case ensures a consistent file-naming pattern across the project, reducing confusion and errors.

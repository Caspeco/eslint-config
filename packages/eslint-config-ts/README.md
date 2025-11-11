# @caspeco/eslint-config-ts

Caspeco ESLint configuration for TypeScript projects.

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

## What's Included

This configuration includes:

- **TypeScript ESLint** - Using [recommended-type-checked](https://typescript-eslint.io/users/configs/#recommended-type-checked) config
- **No Barrel Files** - Prevents barrel file usage (index files that just re-export)
- **File Naming Conventions** - Enforces kebab-case for files and folders
- **Prettier Integration** - Compatible with Prettier formatting

## Peer Dependencies

This package requires the following peer dependencies (automatically installed by npm 7+):

- `@eslint/js`
- `eslint`
- `eslint-config-prettier`
- `eslint-plugin-check-file`
- `eslint-plugin-no-barrel-files`
- `typescript-eslint`

See [package.json](./package.json) for specific version requirements.

## Plugins

### typescript-eslint

Using [recommended-type-checked](https://typescript-eslint.io/users/configs/#recommended-type-checked) config with project service enabled.

### eslint-plugin-no-barrel-files

[eslint-plugin-no-barrel-files](https://github.com/art0rz/eslint-plugin-no-barrel-files)

We opt out of using barrel files as they can:

- Slow down builds and tests
- Cause circular dependencies
- Make tree shaking more difficult

**Note:** We allow barrel files for libraries consumed as npm packages.

More information:

- [Please Stop Using Barrel Files](https://tkdodo.eu/blog/please-stop-using-barrel-files)

### eslint-plugin-check-file

[eslint-plugin-check-file](https://github.com/dukeluo/eslint-plugin-check-file/)

Enforces `KEBAB_CASE` for filenames and folders.

#### Why kebab-case?

1. **Cross-Platform Consistency**: Avoids issues on case-insensitive systems (Windows, macOS) where `MyFile.js` and `myfile.js` are treated the same
2. **Readability**: Clear, natural separation of words with hyphens
3. **Predictability**: Consistent file-naming pattern across the project

## License

MIT

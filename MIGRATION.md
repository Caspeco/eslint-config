# Migration Guide: v4.x to v5.x

## Breaking Changes in v5.0.0

Version 5.0.0 introduces a monorepo structure with separate packages for TypeScript and React configurations. The old `@caspeco/eslint-config` package has been split into:

- `@caspeco/eslint-config-ts` - For TypeScript projects
- `@caspeco/eslint-config-react` - For React + TypeScript projects

## Migration Steps

### For TypeScript (Vanilla) Projects

**Before (v4.x):**

```bash
npm install --save-dev @caspeco/eslint-config
```

```js
// eslint.config.js
import { vanillaConfig } from "@caspeco/eslint-config";

export default [{ ignores: ["dist/**/*"] }, ...vanillaConfig];
```

**After (v5.x):**

```bash
# Uninstall old package
npm uninstall @caspeco/eslint-config

# Install new package
npm install --save-dev @caspeco/eslint-config-ts
```

```js
// eslint.config.js
import config from "@caspeco/eslint-config-ts";

export default [{ ignores: ["dist/**/*"] }, ...config];
```

### For React Projects

**Before (v4.x):**

```bash
npm install --save-dev @caspeco/eslint-config
```

```js
// eslint.config.js
import { reactConfig } from "@caspeco/eslint-config";

export default [{ ignores: ["dist/**/*"] }, ...reactConfig];
```

**After (v5.x):**

```bash
# Uninstall old package
npm uninstall @caspeco/eslint-config

# Install new package
npm install --save-dev @caspeco/eslint-config-react
```

```js
// eslint.config.js
import config from "@caspeco/eslint-config-react";

export default [{ ignores: ["dist/**/*"] }, ...config];
```

## Key Differences

### 1. Package Names

- Old: `@caspeco/eslint-config`
- New: `@caspeco/eslint-config-ts` or `@caspeco/eslint-config-react`

### 2. Import Syntax

- **Old:** Named imports (`vanillaConfig`, `reactConfig`)
- **New:** Default import (`config` or any name you choose)

### 3. Package Independence

- **Old:** Single package with both configs
- **New:** Separate packages - install only what you need

### 4. React Package is Standalone

In v4.x, the React config extended the vanilla config. In v5.x, `@caspeco/eslint-config-react` includes all TypeScript rules inlined - you don't need to install both packages.

### 5. Plugin Namespace Change (React Only)

The Caspeco custom plugin has been renamed:

- **Old:** `caspeco/discourage-chakra-import`
- **New:** `caspeco-react/discourage-chakra-import`

## Automated Migration for React Projects

If you're migrating to `@caspeco/eslint-config-react`, we provide an automated migration script to update rule names in your codebase.

### Using the Migration Script

After installing the new package, run:

```bash
npx caspeco-react-migrate-v5 src/ --dry-run
```

This will show you what changes will be made without modifying files. To apply the changes:

```bash
npx caspeco-react-migrate-v5 src/
```

**What it does:**

- Updates `caspeco/discourage-chakra-import` → `caspeco-react/discourage-chakra-import`
- Fixes ESLint disable comments
- Updates config files

**Options:**

```bash
# Scan and update specific directory
npx caspeco-react-migrate-v5 src/

# Scan entire project
npx caspeco-react-migrate-v5 .

# Dry run (preview changes)
npx caspeco-react-migrate-v5 . --dry-run
```

## Why This Change?

### Benefits:

1. **Smaller Dependencies** - Install only what you need for your project type
2. **Clearer Separation** - TypeScript and React configs are completely independent
3. **Better Versioning** - Each package can be versioned independently
4. **Simpler Imports** - Default import instead of named imports

## Deprecation Notice

The `@caspeco/eslint-config` v4.x package will be marked as deprecated. We recommend migrating to the new packages at your earliest convenience.

## Need Help?

If you encounter issues during migration, please:

1. Check the README in each package for detailed usage instructions
2. Open an issue on [GitHub](https://github.com/Caspeco/eslint-config/issues)

## Version Compatibility

- v5.x requires Node.js >=24 and npm >=11.5.1
- All peer dependencies remain the same or have been updated to latest stable versions

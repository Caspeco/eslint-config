# Migration Guide: v4.x to v5.x

## Breaking Changes in v5.0.0

Version 5.0.0 introduces a monorepo structure with separate packages for TypeScript and React configurations. The old `@caspeco/eslint-config` package has been split into:

- `@caspeco/eslint-config-ts` - For TypeScript projects
- `@caspeco/eslint-config-react` - For React + TypeScript projects

## Automated Migration Tools

We provide migration scripts to automatically update your imports and package references:

### For TypeScript (Vanilla) Projects

```bash
# Preview changes (dry run)
npx caspeco-ts-migrate-v5 . --dry-run

# Apply changes
npx caspeco-ts-migrate-v5 .
```

### For React Projects

```bash
# Preview changes (dry run)
npx caspeco-react-migrate-v5 src/ --dry-run

# Apply changes
npx caspeco-react-migrate-v5 src/
```

## Manual Migration Steps

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

### 4. React Package Extends TypeScript Package

In v4.x, the React config extended the vanilla config within the same package. In v5.x, `@caspeco/eslint-config-react` depends on and extends `@caspeco/eslint-config-ts` - when you install the React package, the TypeScript package is automatically installed as a dependency. This ensures both packages always use the same TypeScript rules without drift.

### 5. Plugin Namespace Change (React Only)

The Caspeco custom plugin has been renamed:

- **Old:** `caspeco/discourage-chakra-import`
- **New:** `caspeco-react/discourage-chakra-import`

## What the Migration Scripts Do

### TypeScript Migration Script (`caspeco-ts-migrate-v5`)

- Updates package imports: `@caspeco/eslint-config` → `@caspeco/eslint-config-ts`
- Changes named imports: `{ vanillaConfig }` → default import `config`
- Updates variable references: `vanillaConfig` → `config`

### React Migration Script (`caspeco-react-migrate-v5`)

- Updates package imports: `@caspeco/eslint-config` → `@caspeco/eslint-config-react`
- Changes named imports: `{ reactConfig }` → default import `config`
- Updates variable references: `reactConfig` → `config`
- Updates plugin rule names: `caspeco/discourage-chakra-import` → `caspeco-react/discourage-chakra-import`
- Fixes ESLint disable comments

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

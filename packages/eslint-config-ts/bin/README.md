# Migration Tool

This migration tool helps you upgrade from `@caspeco/eslint-config` v4.x to `@caspeco/eslint-config-ts` v5.x.

## Usage

```bash
# Preview changes without modifying files
npx caspeco-ts-migrate-v5 . --dry-run

# Apply changes to your project
npx caspeco-ts-migrate-v5 .

# Or specify a directory
npx caspeco-ts-migrate-v5 src/
```

## What it does

The migration script automatically updates:

1. **Package imports**: Changes `@caspeco/eslint-config` to `@caspeco/eslint-config-ts`
2. **Named imports**: Converts `{ vanillaConfig }` to default import `config`
3. **Variable references**: Updates `vanillaConfig` to `config` throughout your config files

## Example

**Before:**

```js
import { vanillaConfig } from "@caspeco/eslint-config";

export default [{ ignores: ["dist/**/*"] }, ...vanillaConfig];
```

**After:**

```js
import config from "@caspeco/eslint-config-ts";

export default [{ ignores: ["dist/**/*"] }, ...config];
```

## Files processed

The script processes files with these extensions:

- `.js`, `.jsx`
- `.ts`, `.tsx`
- `.mjs`, `.cjs`
- `.json`
- `.md`

It automatically skips:

- `node_modules/`
- `.git/`
- `dist/`
- `build/`
- `coverage/`

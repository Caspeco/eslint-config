# Migration Scripts

## caspeco-react-migrate-v5

Automated migration script for updating from `@caspeco/eslint-config` v4.x to `@caspeco/eslint-config-react` v5.x.

### Usage

```bash
# Preview changes (dry run)
npx caspeco-react-migrate-v5 src/ --dry-run

# Apply changes
npx caspeco-react-migrate-v5 src/

# Scan entire project
npx caspeco-react-migrate-v5 .
```

### What it does

- Updates rule names: `caspeco-react/discourage-chakra-import` → `caspeco-react/discourage-chakra-import`
- Fixes ESLint disable comments
- Updates config files
- Processes `.js`, `.jsx`, `.ts`, `.tsx`, `.json`, and `.md` files

### Files processed

The script automatically:
- Skips `node_modules`, `.git`, `dist`, `build`, and `coverage` directories
- Recursively processes all supported file types
- Shows a summary of changes made

### Options

- `--dry-run`: Preview changes without modifying files
- First argument: Path to scan (defaults to current directory)

See the [Migration Guide](../../../MIGRATION.md) for full migration instructions.

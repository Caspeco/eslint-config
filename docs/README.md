# Getting Started

## Configurations

This monorepo contains shared ESLint configurations for TypeScript projects across Caspeco.

- [TypeScript Configuration](/configs/vanilla.md) - For vanilla TypeScript projects
- [React Configuration](/configs/react.md) - For React + TypeScript projects

## NPM Packages

- [@caspeco/eslint-config-ts](https://www.npmjs.com/package/@caspeco/eslint-config-ts)
- [@caspeco/eslint-config-react](https://www.npmjs.com/package/@caspeco/eslint-config-react)

## Migration

Upgrading from v4.x? See the [Migration Guide](/migration.md).

# Plugins

- [Caspeco React](plugins/caspeco-react.md)

# Contributing

Please run `npm install` before any other commands below.

## Release

### Publish

This is an npm workspaces monorepo with multiple packages:

- `@caspeco/eslint-config-ts`
- `@caspeco/eslint-config-react`

To publish a new version:

1. Go to [Github Releases](https://github.com/Caspeco/eslint-config/releases)
2. Click "Draft a new release"
3. Enter the version as the tag (e.g., `5.0.0` or `5.0.0-beta.1`)
4. Write release notes
5. Click "Publish release"

The GitHub Action will automatically:

- Update all package.json versions to match the release tag
- Update inter-workspace dependencies
- Publish all packages to npm with matching versions

**Note:** All packages (`@caspeco/eslint-config-ts` and `@caspeco/eslint-config-react`) are published with the same version number using fixed/locked versioning.

### Publish a Preview Manually

If you need to publish a preview/beta version manually:

```bash
# 1. Update versions locally
npm run update-versions 5.0.0-beta.1

# 2. Publish all workspace packages with 'next' tag
npm publish -ws --access public --tag next
```

This requires you to be a collaborator on the NPM packages.

### Update Versions Locally

To update all package versions without publishing:

```bash
npm run update-versions 5.0.0

# This updates:
# - All package.json versions
# - Inter-workspace dependencies
# - Does NOT commit or publish
```

## Documentation

Documentation is available in the `docs/` folder and can be previewed with:

```bash
npm run docs:preview
```

## Tests

Tests are located in `packages/*/__tests__/` directories. Shared test utilities are in `packages/test-utils/`.

```bash
# Run all tests
npm test

# Run tests for a specific package
npm run test:ts
npm run test:react
```

## Verification

### Prettier

```bash
npm run prettier:check
```

### Type checks

```bash
npm run tsc
```

# Credit

Based on the work of [Chainsafe: eslint-config](https://github.com/ChainSafe/eslint-config)

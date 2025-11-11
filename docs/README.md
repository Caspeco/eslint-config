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

1. Update the version in all package.json files (root + packages)
2. Go to [Github Releases](https://github.com/Caspeco/eslint-config/releases)
3. Click "Draft a new release"
4. Enter the version (skip the `v` prefix)
5. Publish

The GitHub Action will publish all packages to npm.

### Publish a preview to NPM

```bash
# From root - publishes all workspace packages
npm publish -ws --access public --tag next
```

This requires you to be a collaborator on the NPM packages.

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

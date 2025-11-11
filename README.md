# Caspeco ESLint Config

Monorepo for Caspeco's ESLint configurations.

## Packages

This repository contains two ESLint configuration packages:

### [@caspeco/eslint-config-ts](./packages/eslint-config-ts)

ESLint configuration for TypeScript projects.

```bash
npm install --save-dev @caspeco/eslint-config-ts
```

### [@caspeco/eslint-config-react](./packages/eslint-config-react)

ESLint configuration for React + TypeScript projects.

```bash
npm install --save-dev @caspeco/eslint-config-react
```

## Migration from v4.x

If you're upgrading from v4.x, see the [Migration Guide](./MIGRATION.md) for detailed instructions.

## Documentation

Full documentation available at [https://caspeco.github.io/eslint-config/](https://caspeco.github.io/eslint-config/).

## Development

This is an npm workspaces monorepo. To work with it locally:

```bash
# Install dependencies
npm install

# Run tests for all packages
npm test

# Run tests for a specific package
npm run test:ts
npm run test:react

# Verify dependency versions
npm run verify-deps
```

## License

MIT

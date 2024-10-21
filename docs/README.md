# Getting Started

The provided configuration contains shared ESLint rules for typescript projects across Caspeco.

- [Vanilla](/configs/vanilla.md)
- [React](/configs/react.md)

# Release

## Publish

- Go to [Github Releases](https://github.com/Caspeco/eslint-config/releases)
- Click "Draft a new release"
- Enter the version that you'd like to release, skip the `v` prefix.
- Publish

_You can ignore the version in the `package.json` file, that is only used when you're publishing manually to NPM, e.g. a preview version._

## Publish a preview to NPM

```bash
npm --ignore-scripts publish --access public --tag next
```

This step requires you to be a collaborator on the NPM package.

# Tests and verification

Tests are located in the `__tests__` directory.

```bash
npm install
npm run test
npm run tsc
npm run prettier:check
```

# Credit

Based on the work of [Chainsafe: eslint-config](https://github.com/ChainSafe/eslint-config)

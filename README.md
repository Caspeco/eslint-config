# @caspeco/eslint-config

## Usage

The provided configuration contains shared ESLint rules for typescript projects across Caspeco.

### Frontend Vanilla

```bash
npm install --save-dev @caspeco/eslint-config
```

To use this configuration you'll need `eslint.config.js` file in your project root with the following content (for example):

```diff
+ import { vanillaConfig } from "@caspeco/eslint-config";
+
+ const config = [
+ 	{ ignores: ["src/accessmanagement-api.ts", "src/types/caspeco-navigation"] },
+ 	...vanillaConfig,
+ ];
+
+ export default config;
```

### Frontend React

```bash
npm install --save-dev @caspeco/eslint-config eslint-plugin-react-refresh eslint-plugin-react-hooks eslint-plugin-react
```

To use this configuration you'll need `eslint.config.js` file in your project root with the following content (for example):

```diff
+ import { reactConfig } from "@caspeco/eslint-config";
+
+ const config = [
+ 	{ ignores: ["src/accessmanagement-api.ts", "src/types/caspeco-navigation"] },
+ 	...reactConfig,
+ ];
+
+ export default config;
```

#### What is included in the React configuration?

- [eslint-react-plugin](https://github.com/jsx-eslint/eslint-plugin-react)
- [eslint-plugin-react-refresh](https://github.com/ArnaudBarre/eslint-plugin-react-refresh)
- [eslint-plugin-react-hooks](https://www.npmjs.com/package/eslint-plugin-react-hooks)

For details, see [frontend-react.js](https://github.com/Caspeco/eslint-config/blob/main/src/frontend-react.js).

### Caspeco Plugin: Disallow chakra importa

Why We Discourage Importing Chakra Files

In this project, we strongly encourage developers to use our Caspeco UI library, which wraps Chakra UI components, instead of importing Chakra components directly. Here’s why:

1.	Consistency: The Caspeco UI library provides a consistent look and feel across the application by wrapping Chakra components with additional styling, configuration, or behavior specific to our design system. This ensures that all components align with our brand guidelines and provide a unified user experience.

2.	Customization: Our Caspeco UI components may include custom logic, properties, or themes that are not available in the base Chakra components. By using Caspeco UI, developers automatically inherit this custom behavior, avoiding the need to manually apply our standards.

3.	Maintainability: By centralizing customizations in Caspeco UI, we simplify future updates and maintenance. Changes to the design system or component behavior can be made in one place (our UI library) without requiring modifications across the codebase.

When It’s Valid to Use Chakra

In certain cases, such as using hooks provided by Chakra (e.g., useDisclosure, useToast, useBreakpointValue), it may still be valid to import Chakra files directly. These hooks often provide core functionality that integrates well with our components, and using them can enhance the logic of custom components or behaviors.

However, even in these cases, we encourage the use of any equivalent Caspeco UI hooks if they exist, to maintain consistency and benefit from our custom extensions.

## Release

- Go to [Github Releases](https://github.com/Caspeco/eslint-config/releases)
- Click "Draft a new release"
- Enter the version that you'd like to release, skip the `v` prefix.
- Publish

_You can ignore the version in the `package.json` file, that is only used when you're publishing manually to NPM, e.g. a preview version._

### Publish a preview to NPM

```bash
npm --ignore-scripts publish --access public --tag next
```

This step requires you to be a collaborator on the NPM package.

## Tests

```bash
npm install
npm run test
```

## Credit

Based on the work of [Chainsafe: eslint-config](https://github.com/ChainSafe/eslint-config)

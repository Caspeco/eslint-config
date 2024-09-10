# @caspeco/eslint-config

## Usage

```bash
npm install --save-dev @caspeco/eslint-config eslint@^9 typescript-eslint@^8 @typescript-eslint/parser@^8 @typescript-eslint/eslint-plugin@^8 eslint-config-prettier@^9 eslint-plugin-check-file@^2.8.0 @eslint/js@^9
```

The provided configuration contains shared ESLint rules for typescript projects across Caspeco. To use this configuration you'll need `eslint.config.js` file in your project root with the following content (for example):

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

### Frontend Vanilla

Uses the rules defined in [frontend-vanilla.js](frontend-vanilla.js).

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

## Contributing

- Create a PAT (Classic) on Github with the scope "Packages: Read".
- Set an environment variable locally named `GPR_PRIVATE_READ_TOKEN` to the PAT created
- Run `npm install`

### Tests

```bash
npm install
npm run test
```

## Credit

Based on the work of [Chainsafe: eslint-config](https://github.com/ChainSafe/eslint-config)

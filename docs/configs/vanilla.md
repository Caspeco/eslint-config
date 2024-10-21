# Frontend Vanilla

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

## Plugins

For details, see [frontend-vanilla.js](https://github.com/Caspeco/eslint-config/blob/main/src/frontend-vanilla.js).

### typescript-eslint

Using [recommended-type-checked](https://typescript-eslint.io/users/configs/#recommended-type-checked) config.

### check-file

[eslint-plugin-check-file](https://github.com/dukeluo/eslint-plugin-check-file/)

Using `KEBAB_CASE` for filename and folders.

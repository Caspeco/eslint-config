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

### eslint-plugin-no-barrel-files

[eslint-plugin-no-barrel-files](https://github.com/art0rz/eslint-plugin-no-barrel-files)

We opt out of using barrel files as they come with a couple of potential issues. They can slow down your build/tests, cause circular dependencies, and makes tree shaking more difficult.

More information:

- [Please Stop Using Barrel Files](https://tkdodo.eu/blog/please-stop-using-barrel-files)

### eslint-plugin-check-file

[eslint-plugin-check-file](https://github.com/dukeluo/eslint-plugin-check-file/)

Using `KEBAB_CASE` for filename and folders.

#### Background

We enforce this naming convention because:

1. **Cross-Platform Consistency** : Avoids issues on case-insensitive systems (e.g., Windows, macOS) where `MyFile.js` and `myfile.js` are treated the same, causing potential conflicts. This can lead to problems in Git when contributors on different platforms push files with varying cases, creating unnecessary diffs or merge conflicts. Kebab-case ensures uniform file naming across all environments.
2. **Readability**: Clear, natural separation of words with hyphens.
3. **Predictability**: Enforcing kebab-case ensures a consistent file-naming pattern across the project, reducing confusion and errors.

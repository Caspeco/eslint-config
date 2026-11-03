# TypeScript Configuration

For vanilla TypeScript projects (non-React).

## Installation

```bash
npm install --save-dev @caspeco/eslint-config-ts
```

## Usage

Create an `eslint.config.js` file in your project root:

```js
import config from "@caspeco/eslint-config-ts";

export default [{ ignores: ["dist/**/*", "build/**/*"] }, ...config];
```

## Migration from v4.x

Upgrading from `@caspeco/eslint-config` v4.x? See the [Migration Guide](/migration.md) or use the automated migration tool:

```bash
npx caspeco-ts-migrate-v5 .
```

## Plugins

For implementation details, see [index.js](https://github.com/Caspeco/eslint-config/blob/main/packages/eslint-config-ts/src/index.js).

### typescript-eslint

Using [recommended-type-checked](https://typescript-eslint.io/users/configs/#recommended-type-checked) config, plus:

| Rule                                                                                                                                       | Level | Catches                                                                                                                                     |
| ------------------------------------------------------------------------------------------------------------------------------------------ | ----- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| [`consistent-type-assertions`](https://typescript-eslint.io/rules/consistent-type-assertions/) with `objectLiteralTypeAssertions: "never"` | error | `{ ... } as Foo`, which hides missing or misspelled properties. Use a type annotation, a type argument (`useState<Foo>({})`) or `satisfies` |
| [`switch-exhaustiveness-check`](https://typescript-eslint.io/rules/switch-exhaustiveness-check/)                                           | error | Switches over a union that miss a case and have no `default`                                                                                |

#### Opt-in: `no-unnecessary-condition`

[`@typescript-eslint/no-unnecessary-condition`](https://typescript-eslint.io/rules/no-unnecessary-condition/) catches defensive `?.`, `??` and checks on values that can't be nullish. It's not in the shared config: it is only as good as the types, and in codebases with loose or cast API types the "unnecessary" check is often the only runtime guard. Enable it in strict, well-typed repos (needs `strictNullChecks`):

```js
export default [...config, { rules: { "@typescript-eslint/no-unnecessary-condition": "error" } }];
```

### Caspeco TS plugin

Local rules for patterns common in AI-generated code: `caspeco-ts/no-chained-type-assertions` and `caspeco-ts/no-reduce-accumulator-copy`. See [Caspeco TS](/plugins/caspeco-ts.md).

### eslint-plugin-no-barrel-files

[eslint-plugin-no-barrel-files](https://github.com/art0rz/eslint-plugin-no-barrel-files)

We opt out of using barrel files as they come with a couple of potential issues. They can slow down your build/tests, cause circular dependencies, and makes tree shaking more difficult.

_Note: We have situations where we allow barrel files, e.g. for libraries consumed as npm packages._

More information:

- [Please Stop Using Barrel Files](https://tkdodo.eu/blog/please-stop-using-barrel-files)

### eslint-plugin-baseline-js

[eslint-plugin-baseline-js](https://github.com/3ru/eslint-plugin-baseline-js)

Using the type-aware `recommended-ts` preset with the `use-baseline` rule configured to warn on JavaScript/Web Platform features that are not yet Baseline **widely available**.

_Scope: applies to `.ts`/`.tsx` files only; generated and declaration files (`**/*.d.ts`, `**/dist/**/*`, `**/node_modules/**/*`) are excluded._

### eslint-plugin-check-file

[eslint-plugin-check-file](https://github.com/dukeluo/eslint-plugin-check-file/)

Using `KEBAB_CASE` for filename and folders.

#### Background

We enforce this naming convention because:

1. **Cross-Platform Consistency** : Avoids issues on case-insensitive systems (e.g., Windows, macOS) where `MyFile.js` and `myfile.js` are treated the same, causing potential conflicts. This can lead to problems in Git when contributors on different platforms push files with varying cases, creating unnecessary diffs or merge conflicts. Kebab-case ensures uniform file naming across all environments.
2. **Readability**: Clear, natural separation of words with hyphens.
3. **Predictability**: Enforcing kebab-case ensures a consistent file-naming pattern across the project, reducing confusion and errors.

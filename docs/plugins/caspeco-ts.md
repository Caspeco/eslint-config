# Plugin: Caspeco TS

Custom rules shipped with `@caspeco/eslint-config-ts`, and inherited by `@caspeco/eslint-config-react`. Both target patterns common in AI-generated code, ported from [anti-slop](https://github.com/dmmulroy/anti-slop).

## Rules

### `caspeco-ts/no-chained-type-assertions`

Disallows forcing a value through another type with chained assertions.

```ts
// ❌
const user = response as unknown as User;

// ✅ validate at the boundary
const user = userSchema.parse(response);

// ✅ widening a const literal is allowed
const keys = ["a", "b"] as const as readonly string[];
```

A double assertion turns off the type checker for that value. If the types really don't line up, narrow or parse the value instead.

_Off in test files (`**/*.test.{ts,tsx}`, `**/*.spec.{ts,tsx}`, `**/__tests__/**`, `**/__mocks__/**`), where partial fakes like `{ location } as unknown as Window` are the norm. Shared test helpers in other folders are still checked._

### `caspeco-ts/no-reduce-accumulator-copy`

Disallows returning a copy of the accumulator from a `reduce` / `reduceRight` callback: `{ ...acc }`, `[...acc]`, `acc.concat()`, `acc.slice()` or `Object.assign({}, acc)`, also inside a ternary or `&&` / `||`. `concat` and `slice` are only reported when the accumulator is an array, so `string.concat` is fine.

```ts
// ❌ copies the whole object on every step: O(n²)
const byId = items.reduce((acc, item) => ({ ...acc, [item.id]: item }), {});

// ✅
const byId = Object.fromEntries(items.map((item) => [item.id, item]));

// ✅
const byId = items.reduce<Record<string, Item>>((acc, item) => {
	acc[item.id] = item;
	return acc;
}, {});
```

type Foo = { a: number };
type Letter = "a" | "b";

declare const input: string;

// caspeco-ts/no-chained-type-assertions
export const chained = input as unknown as Foo;
export const chainedAngle = <Foo>(<unknown>input);
export const chainedThroughNonNull = (input as unknown)! as Foo;

// caspeco-ts/no-reduce-accumulator-copy
export const byKey = ["a", "b"].reduce((acc, key) => ({ ...acc, [key]: 1 }), {});
export const doubled = [1, 2].reduce<number[]>((acc, n) => {
	return [...acc, n * 2];
}, []);
export const merged = [1, 2].reduce<number[]>((acc, n) => acc.concat(n), []);
export const conditional = [1, 2].reduce<number[]>((acc, n) => (n > 1 ? [...acc, n] : acc), []);

// @typescript-eslint/consistent-type-assertions
export const literal = { a: 1 } as Foo;

// @typescript-eslint/switch-exhaustiveness-check
export function describe(letter: Letter): string {
	switch (letter) {
		case "a":
			return "A";
	}
	return "";
}

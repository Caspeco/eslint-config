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
export const sorted = [3, 1].reduce<number[]>((acc, n) => acc.toSorted((a, b) => a - b), []);
export const copied = [1, 2].reduce<number[]>((acc, n) => {
	acc.push(n);
	return Array.from(acc);
}, []);

// @typescript-eslint/no-misused-spread
export const letters = [..."abc"];

// @typescript-eslint/require-array-sort-compare
export const numbers = [10, 2, 1].sort();

// @typescript-eslint/return-await
export async function load(fetchFoo: () => Promise<Foo>): Promise<Foo | undefined> {
	try {
		return fetchFoo();
	} catch {
		return undefined;
	}
}

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

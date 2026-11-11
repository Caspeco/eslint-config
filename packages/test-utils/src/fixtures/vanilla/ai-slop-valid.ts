type Foo = { a: number };
type Letter = "a" | "b";

declare const input: Foo | undefined;
declare const raw: string;

export const constants = ["a", "b"] as const;
export const widened = ["a", "b"] as const as readonly string[];
export const single = JSON.parse(raw) as Foo;
export const satisfied = { a: 1 } satisfies Foo;

export const byKey = ["a", "b"].reduce<Record<string, number>>((acc, key) => {
	acc[key] = 1;
	return acc;
}, {});
export const sum = [1, 2].reduce((total, n) => total + n, 0);
export const joined = ["a", "b"].reduce((text, part) => text.concat(part), "");
export const nested = [1, 2].reduce<number[]>((acc, n) => {
	const copy = (items: number[]) => [...items];
	acc.push(copy([n]).length);
	return acc;
}, []);

export function describe(letter: Letter): string {
	switch (letter) {
		case "a":
			return "A";
		default:
			return "other";
	}
}

export const optional = input?.a;

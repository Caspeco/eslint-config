type Foo = { a: number };

declare const input: string;

export const fake = input as unknown as Foo;

// Still linted: proves the file isn't skipped altogether.
export const literal = { a: 1 } as Foo;

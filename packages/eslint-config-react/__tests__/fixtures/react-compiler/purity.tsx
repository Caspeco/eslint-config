// 🔴 Bad: calling an impure function (Math.random) during render.
// Flagged by react-hooks/purity, a React Compiler rule that is only enabled
// in the opt-in compiler config — not in the default config.
export function Bad() {
  return <div>{Math.random()}</div>;
}

// URLPattern is Baseline "newly available" (2025-09-15) but not yet "widely
// available", so baseline-js/use-baseline should warn about it.
export const productPattern = new URLPattern({ pathname: "/products/:id" });

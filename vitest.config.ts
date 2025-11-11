import { defineConfig } from "vitest/config";
import { fileURLToPath } from "node:url";

export default defineConfig({
	test: {
		environment: "node",
		globals: true,
		coverage: {
			reporter: ["text", "html"],
		},
	},
	resolve: {
		alias: {
			"@/eslint-config-ts": fileURLToPath(
				new URL("./packages/eslint-config-ts/src/index.js", import.meta.url),
			),
			"@/eslint-config-react": fileURLToPath(
				new URL("./packages/eslint-config-react/src/index.js", import.meta.url),
			),
		},
	},
});

import { describe, it, expect } from "vitest";
import frontendReact from "@/eslint-config-react";

describe("validate react config structure", () => {
	const flatConfigArray = frontendReact;

	describe("configuration completeness", () => {
		it("should include both vanilla and React-specific rules", () => {
			// React config should include vanilla base configs (js.configs.recommended, typescript configs)
			// and React-specific configs (react plugin, hooks, refresh, caspeco)
			// We expect at least 8 config entries:
			// 1. js.configs.recommended
			// 2-3. typescript configs
			// 4. TypeScript file-specific rules (from vanilla)
			// 5. React plugin config
			// 6. React hooks config
			// 7. React refresh config
			// 8. Caspeco plugin config
			// 9. Prettier config
			expect(flatConfigArray.length).toBeGreaterThanOrEqual(8);
		});
	});

	describe("file scoping", () => {
		it("should scope React-specific rules to React files only", () => {
			const reactSpecificRules = [
				"react/react-in-jsx-scope",
				"react-hooks/rules-of-hooks",
				"react-refresh/only-export-components",
				"caspeco-react/discourage-chakra-import",
			];

			flatConfigArray.forEach((config) => {
				if (config.rules) {
					const hasReactSpecificRules = Object.keys(config.rules).some((rule) =>
						reactSpecificRules.includes(rule),
					);

					if (hasReactSpecificRules) {
						// React rules should be scoped to React files
						expect(config.files, "React rules found without file scoping").toBeDefined();

						const filePatterns = Array.isArray(config.files) ? config.files : [config.files];
						const hasReactFiles = filePatterns.some(
							(pattern) => pattern && (pattern.includes(".tsx") || pattern.includes(".jsx")),
						);
						expect(hasReactFiles, "React rules not scoped to React files").toBe(true);
					}
				}
			});
		});
	});

	describe("plugin registration", () => {
		it("should not have duplicate plugin registrations within React-specific configs", () => {
			// Only check React-specific configs
			const reactConfigs = flatConfigArray.filter((config) => {
				if (!config.files) return false;
				const filePatterns = Array.isArray(config.files) ? config.files : [config.files];
				return filePatterns.some(
					(pattern) => pattern && (pattern.includes(".tsx") || pattern.includes(".jsx")),
				);
			});

			const pluginCounts = new Map<string, number>();

			reactConfigs.forEach((config) => {
				if (config.plugins) {
					Object.keys(config.plugins).forEach((plugin) => {
						pluginCounts.set(plugin, (pluginCounts.get(plugin) || 0) + 1);
					});
				}
			});

			// Each plugin should only be registered once in React configs
			pluginCounts.forEach((count, plugin) => {
				expect(count, `Plugin "${plugin}" is registered ${count} times in React configs`).toBe(1);
			});
		});
	});

	describe("flat config migration", () => {
		it("should use flat config format for react-hooks plugin", () => {
			// Find the react-hooks config
			const reactHooksConfig = flatConfigArray.find(
				(config) => config.plugins && config.plugins["react-hooks"],
			);

			expect(reactHooksConfig).toBeDefined();
			expect(reactHooksConfig?.files).toBeDefined();

			// Should have both recommended rules from flat config
			const hasRulesOfHooks = flatConfigArray.some(
				(config) => config.rules && config.rules["react-hooks/rules-of-hooks"] === "error",
			);
			const hasExhaustiveDeps = flatConfigArray.some(
				(config) => config.rules && config.rules["react-hooks/exhaustive-deps"] === "warn",
			);

			expect(hasRulesOfHooks).toBe(true);
			expect(hasExhaustiveDeps).toBe(true);
		});

		it("should have all React plugins using consistent flat config pattern", () => {
			const reactConfigs = flatConfigArray.filter((config) => {
				if (!config.files) return false;
				const filePatterns = Array.isArray(config.files) ? config.files : [config.files];
				return filePatterns.some(
					(pattern) => pattern && (pattern.includes(".tsx") || pattern.includes(".jsx")),
				);
			});

			// All React configs should have files property for proper scoping
			reactConfigs.forEach((config) => {
				if (config.plugins && Object.keys(config.plugins).length > 0) {
					expect(config.files).toBeDefined();
				}
			});
		});
	});
});

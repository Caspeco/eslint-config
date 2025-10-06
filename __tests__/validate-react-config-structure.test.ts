import { describe, it, expect } from "vitest";
import frontendReact from "../src/frontend-react.js";
import frontendVanilla from "../src/frontend-vanilla.js";
import type { Linter } from "eslint";

describe("validate react config structure", () => {
	const flatConfigArray = frontendReact as Linter.Config[];

	describe("configuration inheritance", () => {
		it("should properly inherit from vanilla config", () => {
			// React config should start with vanilla config
			const vanillaConfigCount = (frontendVanilla as Linter.Config[]).length;
			
			// React config should have more entries than vanilla
			expect(flatConfigArray.length).toBeGreaterThan(vanillaConfigCount);
			
			// The first N entries should be from vanilla config
			// This ensures React config extends vanilla rather than replacing it
			expect(flatConfigArray.slice(0, vanillaConfigCount)).toEqual(frontendVanilla);
		});
	});

	describe("file scoping", () => {
		it("should scope React-specific rules to React files only", () => {
			// Only check configs added by React (not inherited from vanilla)
			const vanillaLength = frontendVanilla.length;
			const reactSpecificConfigs = flatConfigArray.slice(vanillaLength);
			
			const reactSpecificRules = [
				"react/react-in-jsx-scope",
				"react-hooks/rules-of-hooks",
				"react-refresh/only-export-components",
				"caspeco/discourage-chakra-import"
			];

			reactSpecificConfigs.forEach(config => {
				if (config.rules) {
					const hasReactSpecificRules = Object.keys(config.rules).some(rule => 
						reactSpecificRules.includes(rule)
					);

					if (hasReactSpecificRules) {
						// React rules should be scoped to React files
						expect(config.files, "React rules found without file scoping").toBeDefined();
						
						const filePatterns = Array.isArray(config.files) ? config.files : [config.files];
						const hasReactFiles = filePatterns.some(pattern => 
							pattern && (pattern.includes('.tsx') || pattern.includes('.jsx'))
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
			const reactConfigs = flatConfigArray.filter(config => {
				if (!config.files) return false;
				const filePatterns = Array.isArray(config.files) ? config.files : [config.files];
				return filePatterns.some(pattern => pattern && (pattern.includes('.tsx') || pattern.includes('.jsx')));
			});

			const pluginCounts = new Map<string, number>();
			
			reactConfigs.forEach(config => {
				if (config.plugins) {
					Object.keys(config.plugins).forEach(plugin => {
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
			const reactHooksConfig = flatConfigArray.find(config => 
				config.plugins && config.plugins['react-hooks']
			);

			expect(reactHooksConfig).toBeDefined();
			expect(reactHooksConfig?.files).toBeDefined();
			
			// Should have both recommended rules from flat config
			const hasRulesOfHooks = flatConfigArray.some(config =>
				config.rules && config.rules['react-hooks/rules-of-hooks'] === 'error'
			);
			const hasExhaustiveDeps = flatConfigArray.some(config =>
				config.rules && config.rules['react-hooks/exhaustive-deps'] === 'warn'
			);

			expect(hasRulesOfHooks).toBe(true);
			expect(hasExhaustiveDeps).toBe(true);
		});

		it("should have all React plugins using consistent flat config pattern", () => {
			const reactConfigs = flatConfigArray.filter(config => {
				if (!config.files) return false;
				const filePatterns = Array.isArray(config.files) ? config.files : [config.files];
				return filePatterns.some(pattern => pattern && (pattern.includes('.tsx') || pattern.includes('.jsx')));
			});

			// All React configs should have files property for proper scoping
			reactConfigs.forEach(config => {
				if (config.plugins && Object.keys(config.plugins).length > 0) {
					expect(config.files).toBeDefined();
				}
			});
		});
	});
});
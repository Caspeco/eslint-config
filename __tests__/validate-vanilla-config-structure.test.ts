import { describe, it, expect } from "vitest";
import frontendVanilla from "../src/frontend-vanilla.js";
import type { Linter } from "eslint";

describe("validate vanilla config structure", () => {
	const flatConfigArray = frontendVanilla as Linter.Config[];

	describe("TypeScript project service configuration", () => {
		it("should have TypeScript project service properly configured", () => {
			const projectServiceConfig = flatConfigArray.find(config =>
				config.languageOptions?.parserOptions?.projectService === true
			);

			expect(projectServiceConfig).toBeDefined();
			expect(projectServiceConfig?.languageOptions?.parserOptions?.projectService).toBe(true);
			// tsconfigRootDir uses import.meta.name which might be undefined in test environment
			expect('tsconfigRootDir' in (projectServiceConfig?.languageOptions?.parserOptions || {})).toBe(true);
		});
	});

	describe("file pattern targeting", () => {
		it("should properly target TypeScript files", () => {
			const tsConfig = flatConfigArray.find(config =>
				config.files && 
				Array.isArray(config.files) && 
				config.files.includes("**/*.ts")
			);

			expect(tsConfig).toBeDefined();
			expect(tsConfig?.files).toContain("**/*.ts");
			expect(tsConfig?.files).toContain("**/*.tsx");
			
			// Check that ignores are properly configured (might be in the same or different config)
			const configWithIgnores = tsConfig?.ignores ? tsConfig : 
				flatConfigArray.find(config => 
					config.ignores && 
					Array.isArray(config.ignores) &&
					config.ignores.includes("**/*.d.ts")
				);
			
			expect(configWithIgnores).toBeDefined();
			expect(configWithIgnores?.ignores).toContain("**/*.d.ts");
			expect(configWithIgnores?.ignores).toContain("**/dist/**/*");
			expect(configWithIgnores?.ignores).toContain("**/node_modules/**/*");
		});

		it("should not have conflicting file patterns", () => {
			const filePatterns = new Map<string, number>();
			
			flatConfigArray.forEach((config) => {
				if (config.files) {
					const patterns = Array.isArray(config.files) ? config.files : [config.files];
					patterns.forEach(pattern => {
						if (typeof pattern === 'string') {
							filePatterns.set(pattern, (filePatterns.get(pattern) || 0) + 1);
						}
					});
				}
			});
			
			// TypeScript patterns should appear together
			const tsPatternCount = filePatterns.get("**/*.ts") || 0;
			const tsxPatternCount = filePatterns.get("**/*.tsx") || 0;
			
			// If we have .ts pattern, we should also have .tsx
			if (tsPatternCount > 0) {
				expect(tsxPatternCount).toBe(tsPatternCount);
			}
		});
	});

	describe("configuration order", () => {
		it("should have ESLint recommended as first config", () => {
			// First config should be ESLint recommended
			const firstConfig = flatConfigArray[0];
			
			// Check if it has ESLint recommended rules
			expect(firstConfig.rules).toBeDefined();
			expect(firstConfig.rules?.['no-unused-vars']).toBeDefined();
		});

		it("should have Prettier config last to override formatting rules", () => {
			// Find configs that might be prettier (has rules but no plugins)
			const lastRulesConfig = [...flatConfigArray].reverse().find(config => 
				config.rules && Object.keys(config.rules).length > 0
			);

			// Prettier config typically disables formatting rules
			// Check for some common rules that prettier disables
			if (lastRulesConfig?.rules) {
				const rules = lastRulesConfig.rules;
				// Prettier config sets various formatting rules to 'off' or 0
				const formattingRules = Object.entries(rules).filter(([_, value]) => 
					value === 'off' || value === 0
				);
				
				// Should have multiple formatting rules disabled
				expect(formattingRules.length).toBeGreaterThan(5);
			}
		});
	});

	describe("plugin registration", () => {
		it("should register check-file and no-barrel-files plugins only once", () => {
			const pluginCounts = new Map<string, number>();
			
			flatConfigArray.forEach(config => {
				if (config.plugins) {
					Object.keys(config.plugins).forEach(plugin => {
						pluginCounts.set(plugin, (pluginCounts.get(plugin) || 0) + 1);
					});
				}
			});

			// These plugins should be registered exactly once
			expect(pluginCounts.get('check-file')).toBe(1);
			expect(pluginCounts.get('no-barrel-files')).toBe(1);
		});
	});
});
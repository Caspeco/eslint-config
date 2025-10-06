import { describe, it, expect } from "vitest";
import eslint from "eslint";
import frontendReact from "../src/frontend-react.js";
import frontendVanilla from "../src/frontend-vanilla.js";

describe("config compatibility", () => {
	describe("ESLint flat config compatibility", () => {
		it("should be valid ESLint flat config format", async () => {
			// Test vanilla config
			const vanillaEslint = new eslint.ESLint({
				overrideConfig: frontendVanilla as eslint.ESLint.Options["overrideConfig"],
				overrideConfigFile: true,
			});

			// Should not throw when creating instance
			expect(() => vanillaEslint).not.toThrow();

			// Test React config
			const reactEslint = new eslint.ESLint({
				overrideConfig: frontendReact as eslint.ESLint.Options["overrideConfig"],
				overrideConfigFile: true,
			});

			expect(() => reactEslint).not.toThrow();
		});

		it("should not use legacy config properties", () => {
			const allConfigs = [...frontendVanilla, ...frontendReact];

			allConfigs.forEach((config, index) => {
				// Check for legacy properties that shouldn't exist in flat config
				expect(config, `Config at index ${index} has legacy 'extends' property`).not.toHaveProperty(
					"extends",
				);
				expect(config, `Config at index ${index} has legacy 'env' property`).not.toHaveProperty("env");
				expect(config, `Config at index ${index} has legacy 'overrides' property`).not.toHaveProperty(
					"overrides",
				);
				expect(config, `Config at index ${index} has legacy 'parser' string property`).not.toHaveProperty(
					"parser",
				);
			});
		});
	});

	describe("plugin version compatibility", () => {
		it("should use flat config format for all plugins that support it", () => {
			// Check React config for proper flat config usage
			const reactConfigs = frontendReact as eslint.Linter.Config[];

			// react-hooks should be using flat config (v6.1.0+)
			const reactHooksConfig = reactConfigs.find((config) => config.plugins && config.plugins["react-hooks"]);
			expect(reactHooksConfig).toBeDefined();
			expect(reactHooksConfig?.files).toBeDefined(); // Flat configs should have file scoping

			// react plugin should use flat config
			const reactPluginConfig = reactConfigs.find((config) => config.plugins && config.plugins["react"]);
			expect(reactPluginConfig).toBeDefined();
			expect(reactPluginConfig?.files).toBeDefined();

			// react-refresh should use flat config
			const reactRefreshConfig = reactConfigs.find(
				(config) => config.plugins && config.plugins["react-refresh"],
			);
			expect(reactRefreshConfig).toBeDefined();
			expect(reactRefreshConfig?.files).toBeDefined();
		});

		it("should have all plugins properly scoped to appropriate files", () => {
			const allConfigs = [...frontendVanilla, ...frontendReact];

			// Configs with plugins should generally have file scoping (except global configs)
			allConfigs.forEach((config) => {
				if (config.plugins && Object.keys(config.plugins).length > 0) {
					const pluginNames = Object.keys(config.plugins);

					// React-related plugins must have file scoping
					const hasReactPlugin = pluginNames.some((name) => name.includes("react") || name === "caspeco");

					if (hasReactPlugin) {
						expect(config.files, `React plugin config missing file scoping`).toBeDefined();
					}
				}
			});
		});
	});

	describe("configuration migration safety", () => {
		it("should maintain all expected rules after flat config migration", () => {
			// Critical rules that must be present
			const criticalRules = {
				vanilla: [
					"@typescript-eslint/no-unused-vars",
					"no-barrel-files/no-barrel-files",
					"check-file/filename-naming-convention",
				],
				react: [
					"react-hooks/rules-of-hooks",
					"react-hooks/exhaustive-deps",
					"react-refresh/only-export-components",
					"caspeco/discourage-chakra-import",
				],
			};

			// Check vanilla rules
			const vanillaHasAllRules = criticalRules.vanilla.every((rule) =>
				frontendVanilla.some((config) => config.rules && rule in config.rules),
			);
			expect(vanillaHasAllRules).toBe(true);

			// Check React rules
			const reactHasAllRules = criticalRules.react.every((rule) =>
				frontendReact.some((config) => config.rules && rule in config.rules),
			);
			expect(reactHasAllRules).toBe(true);
		});

		it("should not have breaking changes in rule configurations", () => {
			// Ensure react-hooks rules have correct severity
			const reactConfigs = frontendReact as eslint.Linter.Config[];

			const hooksRulesConfig = reactConfigs.find(
				(config) => config.rules && "react-hooks/rules-of-hooks" in config.rules,
			);

			expect(hooksRulesConfig?.rules?.["react-hooks/rules-of-hooks"]).toBe("error");
			expect(hooksRulesConfig?.rules?.["react-hooks/exhaustive-deps"]).toBe("warn");

			// Ensure React overrides are still off
			const reactOverrides = reactConfigs.find(
				(config) => config.rules && "react/react-in-jsx-scope" in config.rules,
			);

			expect(reactOverrides?.rules?.["react/react-in-jsx-scope"]).toBe("off");
			expect(reactOverrides?.rules?.["react/prop-types"]).toBe("off");
		});
	});
});

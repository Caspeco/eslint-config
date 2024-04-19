const baseFrontendConfig = require("./frontend-vanilla")

module.exports = {
    ...baseFrontendConfig,
    extends: [
        ...baseFrontendConfig.extends,
        "plugin:react-hooks/recommended",
    ],
    plugins: [...baseFrontendConfig.plugins, "react-refresh"],
    rules: {
        ...baseFrontendConfig.rules,
        "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
    }
}

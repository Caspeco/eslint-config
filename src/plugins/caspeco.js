/**
 * @typedef {import("eslint").Rule.RuleModule} Rule
 */

/**
 * @type {{ rules: { [key: string]: Rule } }}
 */
const caspeco = {
	rules: {
		"discourage-chakra-import": {
			meta: {
				type: "suggestion",
				docs: {
					description:
						'Discourage importing anything from "@chakra-ui/*". Use imports from "@caspeco/casper-ui-library" instead.',
					category: "Best Practices",
					recommended: false,
				},
				messages: {
					restrictedImport: "Importing from {{importPath}} is discouraged.",
				},
				schema: [],
			},
			create(context) {
				return {
					ImportDeclaration(node) {
						const importPath = node.source.value;
						if (typeof importPath === "string" && importPath.startsWith("@chakra-ui/")) {
							context.report({
								node,
								messageId: "restrictedImport",
								data: {
									importPath,
								},
							});
						}
					},
				};
			},
		},
	},
};

export default caspeco;

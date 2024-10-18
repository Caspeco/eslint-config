/** @type {import('eslint').Linter.RuleEntry<[]>} */
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
						if (importPath.startsWith("@chakra-ui/")) {
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

import { AST_NODE_TYPES, ASTUtils, ESLintUtils } from "@typescript-eslint/utils";

/**
 * @typedef {import("@typescript-eslint/utils").TSESTree.Node} Node
 * @typedef {import("@typescript-eslint/utils").TSESTree.Expression} Expression
 * @typedef {import("@typescript-eslint/utils").TSESTree.Identifier} Identifier
 * @typedef {import("@typescript-eslint/utils").TSESTree.TSAsExpression | import("@typescript-eslint/utils").TSESTree.TSTypeAssertion} TypeAssertion
 */

const createRule = ESLintUtils.RuleCreator(
	(name) => `https://caspeco.github.io/eslint-config/#/plugins/caspeco-ts?id=caspeco-ts${name}`,
);

/**
 * `!` and `satisfies` don't change what an assertion chain does, so look through them.
 *
 * @param {Node} node
 * @returns {Node}
 */
const skipTransparent = (node) =>
	node.type === AST_NODE_TYPES.TSNonNullExpression || node.type === AST_NODE_TYPES.TSSatisfiesExpression
		? skipTransparent(node.expression)
		: node;

/**
 * @param {Node} node
 * @returns {Node}
 */
const unwrapTypeExpressions = (node) => {
	const inner = skipTransparent(node);
	return ASTUtils.isTypeAssertion(inner) ? unwrapTypeExpressions(inner.expression) : inner;
};

/**
 * @param {Node} node
 * @param {string} name
 */
const isNamed = (node, name) => {
	const inner = unwrapTypeExpressions(node);
	return ASTUtils.isIdentifier(inner) && inner.name === name;
};

/** @param {TypeAssertion} node */
const isConstAssertion = (node) =>
	node.typeAnnotation.type === AST_NODE_TYPES.TSTypeReference &&
	ASTUtils.isIdentifier(node.typeAnnotation.typeName) &&
	node.typeAnnotation.typeName.name === "const";

/** @param {Node} node */
const isOutermostAssertion = (node) => {
	let child = node;
	let parent = node.parent;
	while (
		(parent?.type === AST_NODE_TYPES.TSNonNullExpression ||
			parent?.type === AST_NODE_TYPES.TSSatisfiesExpression) &&
		parent.expression === child
	) {
		child = parent;
		parent = parent.parent;
	}
	return !(parent && ASTUtils.isTypeAssertion(parent) && parent.expression === child);
};

/**
 * `object.method(...)` where `object` is the identifier `objectName`.
 *
 * @param {Node} node
 * @param {string} objectName
 * @param {string[]} methods
 */
const isMethodCallOn = (node, objectName, methods) =>
	node.type === AST_NODE_TYPES.CallExpression &&
	node.callee.type === AST_NODE_TYPES.MemberExpression &&
	!node.callee.computed &&
	methods.includes(node.callee.property.name) &&
	isNamed(node.callee.object, objectName);

const noChainedTypeAssertions = createRule({
	name: "no-chained-type-assertions",
	meta: {
		type: "problem",
		docs: {
			description: "Disallow chained type assertions such as `value as unknown as T`.",
		},
		messages: {
			chained:
				"Don't chain type assertions. Validate or narrow the value instead of forcing it through another type.",
		},
		schema: [],
	},
	defaultOptions: [],
	create(context) {
		/** @param {TypeAssertion} node */
		const check = (node) => {
			if (!isOutermostAssertion(node)) {
				return;
			}
			/** @type {TypeAssertion[]} */
			const inner = [];
			for (
				let current = skipTransparent(node.expression);
				ASTUtils.isTypeAssertion(current);
				current = skipTransparent(current.expression)
			) {
				inner.push(current);
			}
			// Widening a const literal (`[1] as const as readonly number[]`) is fine.
			if (inner.some((assertion) => !isConstAssertion(assertion))) {
				context.report({ node, messageId: "chained" });
			}
		};
		return {
			TSAsExpression: check,
			TSTypeAssertion: check,
		};
	},
});

const noReduceAccumulatorCopy = createRule({
	name: "no-reduce-accumulator-copy",
	meta: {
		type: "problem",
		docs: {
			description: "Disallow copying the accumulator on every `reduce` step, which makes the reduce O(n²).",
		},
		messages: {
			copy: "Don't copy the accumulator `{{name}}` on every step. Mutate it and return it, or use a loop, `Object.fromEntries` or `Map`.",
		},
		schema: [],
	},
	defaultOptions: [],
	create(context) {
		const services = ESLintUtils.getParserServices(context);
		const checker = services.program.getTypeChecker();

		/** @type {Map<Node, Identifier>} reduce callback -> its accumulator parameter */
		const callbacks = new Map();
		/** @type {Node[]} */
		const functionStack = [];

		/** @param {Identifier} accumulator */
		const isArrayAccumulator = (accumulator) => {
			const type = services.getTypeAtLocation(accumulator);
			return checker.isArrayType(type) || checker.isTupleType(type);
		};

		/**
		 * @param {Node} expression
		 * @param {Identifier} accumulator
		 * @returns {boolean}
		 */
		const copiesAccumulator = (expression, accumulator) => {
			const node = unwrapTypeExpressions(expression);
			/** @param {Node} n */
			const isAccumulator = (n) => isNamed(n, accumulator.name);
			switch (node.type) {
				case AST_NODE_TYPES.ConditionalExpression:
					return (
						copiesAccumulator(node.consequent, accumulator) || copiesAccumulator(node.alternate, accumulator)
					);
				case AST_NODE_TYPES.LogicalExpression:
					return copiesAccumulator(node.left, accumulator) || copiesAccumulator(node.right, accumulator);
				case AST_NODE_TYPES.ObjectExpression:
					return node.properties.some(
						(property) => property.type === AST_NODE_TYPES.SpreadElement && isAccumulator(property.argument),
					);
				case AST_NODE_TYPES.ArrayExpression:
					return node.elements.some(
						(element) => element?.type === AST_NODE_TYPES.SpreadElement && isAccumulator(element.argument),
					);
				case AST_NODE_TYPES.CallExpression:
					if (isMethodCallOn(node, accumulator.name, ["concat", "slice"])) {
						// Only arrays: `string.concat` and persistent collections are cheap.
						return isArrayAccumulator(accumulator);
					}
					if (isMethodCallOn(node, "Object", ["assign"])) {
						const [target, ...sources] = node.arguments;
						return target?.type === AST_NODE_TYPES.ObjectExpression && sources.some(isAccumulator);
					}
					return false;
				default:
					return false;
			}
		};

		/**
		 * @param {Node | undefined} fn
		 * @param {Expression} expression
		 */
		const checkReturned = (fn, expression) => {
			const accumulator = fn && callbacks.get(fn);
			if (accumulator && copiesAccumulator(expression, accumulator)) {
				context.report({ node: expression, messageId: "copy", data: { name: accumulator.name } });
			}
		};

		/** @param {Node} node */
		const enterFunction = (node) => {
			functionStack.push(node);
			if (node.type === AST_NODE_TYPES.ArrowFunctionExpression && node.expression) {
				checkReturned(node, node.body);
			}
		};
		const exitFunction = () => {
			functionStack.pop();
		};

		return {
			CallExpression(node) {
				if (
					node.callee.type !== AST_NODE_TYPES.MemberExpression ||
					node.callee.computed ||
					(node.callee.property.name !== "reduce" && node.callee.property.name !== "reduceRight")
				) {
					return;
				}
				const callback = node.arguments[0];
				if (
					(callback?.type === AST_NODE_TYPES.ArrowFunctionExpression ||
						callback?.type === AST_NODE_TYPES.FunctionExpression) &&
					callback.params[0]?.type === AST_NODE_TYPES.Identifier
				) {
					callbacks.set(callback, callback.params[0]);
				}
			},
			ReturnStatement(node) {
				if (node.argument) {
					checkReturned(functionStack[functionStack.length - 1], node.argument);
				}
			},
			ArrowFunctionExpression: enterFunction,
			FunctionExpression: enterFunction,
			FunctionDeclaration: enterFunction,
			"ArrowFunctionExpression:exit": exitFunction,
			"FunctionExpression:exit": exitFunction,
			"FunctionDeclaration:exit": exitFunction,
		};
	},
});

export default {
	rules: {
		"no-chained-type-assertions": noChainedTypeAssertions,
		"no-reduce-accumulator-copy": noReduceAccumulatorCopy,
	},
};

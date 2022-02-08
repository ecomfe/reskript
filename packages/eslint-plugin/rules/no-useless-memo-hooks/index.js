const isNativeMemoHook = name => name === 'useCallback' || name === 'useMemo';

const isArrayExpression = node => node.type === 'ArrayExpression';

const isOnlyOneCallExpressionHookDep = node =>
    node.arguments.length === 2
    && isArrayExpression(node.arguments[1])
    && node.arguments[1].elements
    && node.arguments[1].elements.length === 1;

const findOnlyInvalidStatement = node => {
    switch (node.body.type) {
        case 'CallExpression':
        case 'Identifier':
            return node.body;
        case 'BlockStatement': {
            const blockBody = node.body.body;
            if (blockBody.length !== 1) {
                return;
            }
            const onlyStatement = blockBody[0];
            if (onlyStatement.type === 'ReturnStatement') {
                return onlyStatement.argument;
            }
        }
    }
};

const isCallExpression = node => node.type === 'CallExpression';
const isIdentifier = node => node.type === 'Identifier';

const isOnlyReturnMemoizedWithHookDeps = (expressionNode, depNode) => {
    switch (expressionNode.type) {
        case 'ArrowFunctionExpression':
        case 'FunctionExpression': {
            const node = findOnlyInvalidStatement(expressionNode);
            const firstDepNode = depNode.elements[0];
            if (
                node && firstDepNode
                && (
                    /* The expression contains only its own dependencies without arguments */
                    (isCallExpression(node) && node.callee.name === firstDepNode.name && node.arguments.length === 0)
                    /* The memoized value return without any change */
                    || (isIdentifier(node) && node.name === firstDepNode.name)
                )
            ) {
                return true;
            }
        }
    }
    return false;
};

const ruleCallback = context => node => {
    if (
        !isNativeMemoHook(node.callee.name)
        || !isOnlyOneCallExpressionHookDep(node)
    ) {
        return;
    }

    if (isOnlyReturnMemoizedWithHookDeps(node.arguments[0], node.arguments[1])) {
        context.report({
            node,
            loc: node.loc,
            messageId: 'noUselessMemoHooks',
            data: {
                name: node.callee.name,
            },
        });
    }
};

module.exports = {
    meta: {
        type: 'suggestion',
        fixable: 'whitespace',
        docs: {
            description: 'Call to useCallback is useless',
            category: 'reskript',
            recommended: true,
        },
        messages: {
            noUselessMemoHooks: 'Hook {{name}}\'s should be removed',
        },
    },
    create(context) {
        const ruleMethod = ruleCallback(context);
        return {
            'VariableDeclaration VariableDeclarator CallExpression': ruleMethod,
        };
    },
};

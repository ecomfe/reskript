const isUseCallbackHook = name => name === 'useCallback';

const isArrayExpression = node => node.type === 'ArrayExpression';

const isHookCallExpressionArgs = node => node.arguments.length === 2 && isArrayExpression(node.arguments[1]);

const findCallExpression = node => {
    switch (node.body.type) {
        case 'CallExpression':
            return node.body;
        case 'BlockStatement':
            if (node.body.body.length !== 1) {
                return;
            }
            return node.body.body[0].expression;
    }
};

const isOnlyOneCallExpressionWithHookDeps = (expressionNode, depNode) => {
    if (depNode.elements.length !== 1) {
        return;
    }
    switch (expressionNode.type) {
        case 'ArrowFunctionExpression':
        case 'FunctionExpression': {
            const expression = findCallExpression(expressionNode);
            if (
                /* The expression contains only its own dependencies */
                expression && depNode.elements[0] && expression.callee.name === depNode.elements[0].name
                /* expression has no parameters */
                && expression.arguments.length === 0
            ) {
                return true;
            }
        }
    }
    return false;
};

const ruleCallback = context => node => {
    if (!isUseCallbackHook(node.callee.name)) {
        return;
    }
    if (
        isHookCallExpressionArgs(node)
        && isOnlyOneCallExpressionWithHookDeps(node.arguments[0], node.arguments[1])
    ) {
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
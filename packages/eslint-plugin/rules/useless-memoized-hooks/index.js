const {isHookName} = require('../../utils');

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
            if (expression && depNode.elements[0] && expression.callee.name === depNode.elements[0].name) {
                return true;
            }
        }
    }
    return false;
};

const transferArrowFunction = (node, context) => {
    const target = node.arguments[0];

    switch (target.type) {
        case 'ArrowFunctionExpression':
        case 'FunctionExpression': {
            if (target.body.type === 'BlockStatement') {
                target.body = findCallExpression(target);
            }
            const expression = target.body;
            const sourceCode = context.getSourceCode();
            const expressionString = sourceCode.getText(expression);
            return `() => ${expressionString}`;
        }
    }
};

const autoFix = (node, context) => fixer => {
    return fixer.replaceText(
        node,
        transferArrowFunction(node, context)
    );
};

const ruleCallback = context => node => {
    if (!isHookName(node.callee.name)) {
        return;
    }
    if (
        isHookCallExpressionArgs(node)
        && isOnlyOneCallExpressionWithHookDeps(node.arguments[0], node.arguments[1])
    ) {
        context.report({
            node,
            loc: node.loc,
            messageId: 'uselessMemoizedHooks',
            data: {
                name: node.callee.name,
            },
            fix: autoFix(node, context),
        });
    }
};

module.exports = {
    meta: {
        type: 'suggestion',
        fixable: 'whitespace',
        docs: {
            description: 'Detect memoized hook is used in only one call expression',
            category: 'reskript',
            recommended: true,
        },
        messages: {
            uselessMemoizedHooks: 'Hook {{name}}\'s should be removed',
        },
    },
    create(context) {
        const ruleMethod = ruleCallback(context);
        return {
            'VariableDeclaration VariableDeclarator CallExpression': ruleMethod,
        };
    },
};

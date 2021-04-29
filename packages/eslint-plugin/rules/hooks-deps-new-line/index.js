const {isHookName} = require('../../utils');

const addBlockFix = indexes => {
    return fixer => {
        return indexes.map(index => fixer.insertTextAfterRange([index, index], '\n'));
    };
};

const ruleCallback = context => {
    return node => {
        if (!isHookName(node.callee.name)) {
            return;
        }

        const args = node.arguments;
        // collect error prev node
        const errorIndexes = [];

        if (args.length > 1 && args[args.length - 1].type === 'ArrayExpression') {

            const nodeList = [node, ...args, node];
            const length = nodeList.length - 1;

            for (let i = 0; i < length; i++) {
                const currentNode = nodeList[i];
                const nextNode = nodeList[i + 1];
                if (currentNode.loc.start.line === nextNode.loc.end.line) {
                    // because the last node is the callee function , use previous node`s end index
                    errorIndexes.push(
                        i === length - 1 ? currentNode.range[1] : nextNode.range[0]
                    );
                }
            }
            // report together
            if (errorIndexes.length > 0) {
                context.report({
                    loc: node.loc,
                    node,
                    messageId: 'hookArgumentsBreakLine',
                    data: {
                        name: node.callee.name,
                    },
                    fix: addBlockFix(errorIndexes),
                });
            }
        }
    };
};

module.exports = {
    meta: {
        type: 'suggestion',
        docs: {
            description: 'except react hooks\'s arguments in different line',
            category: 'reskript',
            recommended: false,
        },
        fixable: 'whitespace', // or "code" or "whitespace"
        messages: {
            hookArgumentsBreakLine: 'Hook {{name}}\'s deps argument should be placed on a new line',
        },
    },
    create(context) {
        const ruleMethod = ruleCallback(context);
        return {
            'ExpressionStatement CallExpression': ruleMethod,
            'VariableDeclaration VariableDeclarator CallExpression': ruleMethod,
        };
    },

};

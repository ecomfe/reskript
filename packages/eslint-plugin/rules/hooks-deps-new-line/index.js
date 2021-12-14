const {isHookName} = require('../../utils');

const addBlockFix = indexes => {
    return fixer => {
        return indexes.map(index => fixer.insertTextAfterRange([index, index], '\n'));
    };
};

const functionExpression = ['ArrowFunctionExpression', 'FunctionExpression'];

const isArgsValid = args => {
    return args.length !== 2 || !functionExpression.includes(args[0].type) || args[1].type !== 'ArrayExpression';
};

const ruleCallback = context => {
    return node => {
        if (!isHookName(node.callee.name)) {
            return;
        }

        const args = node.arguments;

        if (isArgsValid(args)) {
            // 判断hook是否只包含两个参数
            return;
        }
        // 收集前一个错误node的index标记
        const errorIndexes = [];
        // 将hook，hook参数，hook结尾拼接在一起
        const nodeList = [node, ...args, node];
        const length = nodeList.length - 1;

        for (let i = 0; i < length; i++) {
            const currentNode = nodeList[i];
            const nextNode = nodeList[i + 1];
            if (
                currentNode.loc.start.line === nextNode.loc.start.line
                || currentNode.loc.end.line === nextNode.loc.end.line
                || currentNode.loc.end.line === nextNode.loc.start.line
            ) {
                // i 节点与 i+1 节点的开始行在一行
                // i 节点的结束行与 i+1 节点的结束行在一行
                // i 节点的结束行与 i+1 节点的开始行在一行
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
                messageId: 'hooksDepsNewLine',
                data: {
                    name: node.callee.name,
                },
                fix: addBlockFix(errorIndexes),
            });
        }
    };
};

module.exports = {
    meta: {
        type: 'suggestion',
        docs: {
            description: 'except react hooks\'s arguments in different line',
            recommended: false,
        },
        fixable: 'whitespace', // or "code" or "whitespace"
        messages: {
            hooksDepsNewLine: 'Hook {{name}}\'s deps argument should be placed on a new line',
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

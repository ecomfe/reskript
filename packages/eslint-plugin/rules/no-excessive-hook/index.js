const {isHookName, isHook, resolveFunctionName, createFunctionLinter} = require('../../utils');

module.exports = {
    meta: {
        type: 'problem',
        docs: {
            description: 'Detect a hook doesn\'t use any other hooks',
            recommended: true,
            url: 'https://github.com/facebook/react/blob/master/packages/eslint-plugin-react-hooks/README.md',
        },
    },
    create(context) {
        return createFunctionLinter(
            context,
            {
                enter(node) {
                    const upperScopeType = context.getScope().upper.type;
                    const isTopScope = upperScopeType === 'global' || upperScopeType === 'module';

                    return isTopScope && isHookName(resolveFunctionName(node)) ? false : undefined;
                },
                leave(node, hasHookCall) {
                    if (!hasHookCall) {
                        const name = resolveFunctionName(node);
                        const error = {
                            node,
                            message: `Hook ${name} never call other hooks, it should be a plain function`,
                        };
                        context.report(error);
                    }
                },
                check(hasHookCall, node) {
                    return hasHookCall === true || isHook(node.callee);
                },
            }
        );
    },
};

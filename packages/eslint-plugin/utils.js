exports.isHookName = s => {
    return /^use[A-Z0-9].*$/.test(s);
};

exports.resolveFunctionName = node => {
    switch (node.type) {
        case 'ArrowFunctionExpression':
        case 'FunctionExpression':
            return node.parent.type === 'VariableDeclarator' ? node.parent.id.name : '';
        case 'FunctionDeclaration':
            return node.id ? node.id.name : '';
        default:
            return '';
    }
};

exports.isHook = node => {
    if (node.type === 'Identifier') {
        return exports.isHookName(node.name);
    }
    else if (node.type === 'MemberExpression' && !node.computed && exports.isHook(node.property)) {
        const obj = node.object;
        return obj.type === 'Identifier';
    }

    return false;
};

exports.createFunctionLinter = (context, {enter, leave, check}) => {
    const cache = new Map();
    const enterFunction = node => {
        const cacheValue = enter(node);

        if (cacheValue !== undefined) {
            cache.set(node, cacheValue);
        }
    };
    const leaveFunction = node => {
        const cacheValue = cache.get(node);

        if (cacheValue !== undefined) {
            leave(node, cacheValue);
            cache.delete(node);
        }
    };
    const checkCallExpression = node => {
        const block = context.getScope().block;
        const cacheValue = cache.get(block);

        if (cacheValue !== undefined) {
            const nextValue = check(cacheValue, node);
            cache.set(block, nextValue);
        }
    };

    return {
        FunctionExpression: enterFunction,
        FunctionDeclaration: enterFunction,
        ArrowFunctionExpression: enterFunction,
        'FunctionExpression:exit': leaveFunction,
        'FunctionDeclaration:exit': leaveFunction,
        'ArrowFunctionExpression:exit': leaveFunction,
        CallExpression: checkCallExpression,
    };
};

exports.capitalizeFirstLetter = word => {
    return `${word[0].toUpperCase()}${word.slice(1)}`;
};

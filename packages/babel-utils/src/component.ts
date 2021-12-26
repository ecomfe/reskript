import path from 'path';
import babel from '@babel/core';
import {NodePath, Visitor} from '@babel/traverse';

type FunctionDeclaration = babel.types.FunctionDeclaration;

const KEY_REACT_FUNCTIONS = new Set(['createElement', 'cloneElement']);

const resolveCalleeName = (path: NodePath<babel.types.CallExpression>) => {
    const callee = path.get('callee');

    if (callee.isIdentifier()) {
        return callee.node.name;
    }
    if (callee.isMemberExpression()) {
        const property = callee.get('property');
        return property.isIdentifier() ? property.node.name : '';
    }
    return '';
};

// 函数体有以下东西就认定它是个组件：
//
// 1. 有`cloneElement`或`createElement`的调用
// 2. 有任何的JSX语法
const isFunctionBodyComponentLike = (path: NodePath<FunctionDeclaration>): boolean => {
    let matched = false;
    const visitor: Visitor = {
        JSXElement(path) {
            matched = true;
            path.stop();
        },
        CallExpression(path) {
            const calleeName = resolveCalleeName(path);
            if (KEY_REACT_FUNCTIONS.has(calleeName)) {
                matched = true;
                path.stop();
            }
        },
    };
    path.traverse(visitor);
    return matched;
};

export const isComponentDeclaration = (path: NodePath<FunctionDeclaration>, strict?: boolean) => {
    const functionName = path.node.id?.name ?? '';
    const args = path.node.params;

    return args.length <= 1 && /^[A-Z]/.test(functionName) && (!strict || isFunctionBodyComponentLike(path));
};

export const resolveComponentName = (declaration: NodePath<FunctionDeclaration>, filename: string | undefined) => {
    const functionName = declaration.node.id?.name;

    if (functionName) {
        return functionName;
    }

    if (!filename) {
        return 'Unknown';
    }

    const file = path.basename(filename, path.extname(filename));
    return file === 'index' ? path.dirname(filename).split(path.sep).pop() : file;
};

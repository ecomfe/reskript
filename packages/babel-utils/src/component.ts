import path from 'path';
import * as babel from '@babel/core';
import {NodePath} from '@babel/traverse';

type FunctionDeclaration = babel.types.FunctionDeclaration;

export const isComponentDeclaration = (path: NodePath<FunctionDeclaration>) => {
    const functionName = path.node.id?.name ?? '';
    const args = path.node.params;

    return args.length <= 1 && /^[A-Z]/.test(functionName);
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

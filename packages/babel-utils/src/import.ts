import babel from '@babel/core';
import {NodePath, Visitor} from '@babel/traverse';

type ImportDeclaration = babel.types.ImportDeclaration;
type Program = babel.types.Program;

// 理论上页面可能存在多个同目标的`import`语句，但处理太复杂，遇到以前先认为只有一个吧
export const findImportStatement = (program: NodePath<Program>, source: string) => {
    let importStatement: NodePath<ImportDeclaration> | null = null;
    const visitor: Visitor = {
        ImportDeclaration: path => {
            if (path.get('source').node.value === source) {
                importStatement = path;
                path.stop();
            }
        },
    };
    program.traverse(visitor);
    return importStatement;
};

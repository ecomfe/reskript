import babel from '@babel/core';
import {NodePath} from '@babel/traverse';
import {findImportStatement} from './import.js';

type ImportDeclaration = babel.types.ImportDeclaration;
type MemberExpression = babel.types.MemberExpression;
type Program = babel.types.Program;
type Identifier = babel.types.Identifier;

const insertImportReact = (program: NodePath<Program>, specifier: string) => {
    const expression = babel.types.importDeclaration(
        [
            babel.types.importSpecifier(
                babel.types.identifier(specifier),
                babel.types.identifier(specifier)
            ),
        ],
        babel.types.stringLiteral('react')
    );
    const [inserted] = program.unshiftContainer('body', expression);
    return inserted;
};

const constructCallee = (importStatement: NodePath<ImportDeclaration>, specifier: string) => {
    const specifiers = importStatement.get('specifiers');
    for (const currentSpecifier of specifiers) {
        if (currentSpecifier.isImportNamespaceSpecifier()) {
            const name = currentSpecifier.get('local').node.name;
            return babel.types.memberExpression(
                babel.types.identifier(name),
                babel.types.identifier(specifier)
            );
        }
        else if (currentSpecifier.isImportDefaultSpecifier()) {
            // 不要问为什么代码和上面的一样，要问就问`babel`的类型去
            const name = currentSpecifier.get('local').node.name;
            return babel.types.memberExpression(
                babel.types.identifier(name),
                babel.types.identifier(specifier)
            );
        }
        else if (currentSpecifier.isImportSpecifier()) {
            const name = currentSpecifier.get('local').node.name;
            if (name === specifier) {
                return babel.types.identifier(specifier);
            }
        }
    }

    // 到这里的时候，应该是`import {xxx} from 'react'`但`xxx`不包含需要的东西，所以要上去追加一个
    importStatement.pushContainer(
        'specifiers',
        babel.types.importSpecifier(
            babel.types.identifier(specifier),
            babel.types.identifier(specifier)
        )
    );
    return babel.types.identifier(specifier);
};

export const prepareReactImport = (program: NodePath<Program>, specifier: string): Identifier | MemberExpression => {
    const importStatement = findImportStatement(program, 'react') ?? insertImportReact(program, specifier);
    return constructCallee(importStatement, specifier);
};

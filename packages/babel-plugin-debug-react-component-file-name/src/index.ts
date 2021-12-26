import path from 'path';
import babel from '@babel/core';
import {NodePath} from '@babel/traverse';
import {dirFromImportMeta} from '@reskript/core';
import {isComponentDeclaration, findImportStatement, findParentProgram} from '@reskript/babel-utils';

const {types} = babel;

const HOOK_MODULE = path.resolve(dirFromImportMeta(import.meta.url), 'useComponentFile.js');

const insertImportHook = (program: NodePath<babel.types.Program>) => {
    const expression = types.importDeclaration(
        [types.importDefaultSpecifier(types.identifier('useComponentFile'))],
        types.stringLiteral(HOOK_MODULE)
    );
    const [inserted] = program.unshiftContainer('body', expression);
    return inserted;
};

const prepareHookImport = (current: NodePath): boolean => {
    const program = findParentProgram(current);

    if (!program) {
        return false;
    }

    const importStatement = findImportStatement(program, HOOK_MODULE);

    if (!importStatement) {
        insertImportHook(program);
    }

    return true;
};

interface PluginState extends babel.PluginPass {
    readonly opts: {
        srcDirectory: string;
        fullPathPrefix?: string;
    };
    declaredClassNames?: Set<string>;
}

export default function debugReactComponentFileName(): babel.PluginObj<PluginState> {
    return {
        visitor: {
            ClassDeclaration(declaration, state) {
                state.declaredClassNames = state.declaredClassNames ?? new Set<string>();
                state.declaredClassNames.add(declaration.node.id.name);
            },
            ClassExpression(expression, state) {
                if (expression.node.id) {
                    state.declaredClassNames = state.declaredClassNames ?? new Set<string>();
                    state.declaredClassNames.add(expression.node.id.name);
                }
            },
            FunctionDeclaration(declaration, state) {
                const {opts: {srcDirectory, fullPathPrefix}, filename} = state;

                if (!filename) {
                    return;
                }

                // 这个插件会插一段不在React里根本跑不了的危险代码，所以要用严格的检查。
                // 有可能一个`class`语句先被其它插件处理成了`function`再跑到这里，
                // 注意这个事和插件顺序没关系，参考[这篇文章的说明](https://jamie.build/babel-plugin-ordering.html)，
                // 但`class`组件里插hook的调用是不行的，所以我们要记录所有遇到过的`class`，把它们剔除
                const functionName = declaration.node.id?.name ?? '';
                if (isComponentDeclaration(declaration, true) && !state.declaredClassNames?.has(functionName)) {
                    const relative = path.relative(srcDirectory, filename);
                    if (!relative.startsWith('..') && prepareHookImport(declaration)) {
                        const line = declaration.node.loc?.start.line;
                        declaration.get('body').unshiftContainer(
                            'body',
                            types.expressionStatement(
                                types.callExpression(
                                    types.identifier('useComponentFile'),
                                    [
                                        types.stringLiteral(relative),
                                        types.stringLiteral(`${fullPathPrefix}${filename}${line ? `:${line}` : ''}`),
                                    ]
                                )
                            )
                        );
                    }
                }
            },
        },
    };
}

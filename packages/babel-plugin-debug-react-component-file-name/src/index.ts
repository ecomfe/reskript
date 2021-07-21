import path from 'path';
import {types, PluginObj, PluginPass} from '@babel/core';
import {NodePath} from '@babel/traverse';
import {isComponentDeclaration, findImportStatement, findParentProgram} from '@reskript/babel-utils';

const HOOK_MODULE = '@reskript/babel-plugin-debug-react-component-file-name/useComponentFile';

const insertImportHook = (program: NodePath<types.Program>) => {
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

interface PluginState extends PluginPass {
    readonly opts: {
        srcDirectory: string;
    };
}

export default function debugReactComponentFileName(): PluginObj<PluginState> {
    return {
        visitor: {
            FunctionDeclaration(declaration, state) {
                const {opts: {srcDirectory}, filename} = state;

                if (!filename) {
                    return;
                }

                if (isComponentDeclaration(declaration)) {
                    const relative = path.relative(srcDirectory, filename);
                    if (!relative.startsWith('..') && prepareHookImport(declaration)) {
                        declaration.get('body').unshiftContainer(
                            'body',
                            types.callExpression(
                                types.identifier('useComponentFile'),
                                [types.stringLiteral(relative)]
                            )
                        );
                    }
                }
            },
        },
    };
}

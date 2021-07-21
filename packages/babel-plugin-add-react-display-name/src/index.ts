import {types, PluginObj} from '@babel/core';
import {isComponentDeclaration} from '@reskript/babel-utils';

export default function addReactDisplayName(): PluginObj {
    return {
        visitor: {
            FunctionDeclaration(declaration) {
                if (isComponentDeclaration(declaration)) {
                    const componentName = declaration.node.id?.name ?? '';
                    if (componentName) {
                        const assignDisplayName = types.expressionStatement(
                            types.assignmentExpression(
                                '=',
                                types.memberExpression(
                                    types.identifier(componentName),
                                    types.identifier('displayName')
                                ),
                                types.stringLiteral(componentName)
                            )
                        );
                        declaration.insertAfter(assignDisplayName);
                    }
                }
            },
        },
    };
}

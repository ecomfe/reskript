import {types, PluginObj, NodePath} from '@babel/core';

const isCoreJSRequire = (node: types.CallExpression) => node.callee.type === 'Identifier'
    && node.callee.name === 'require'
    && node.arguments.length === 1
    && node.arguments[0].type === 'StringLiteral';

const replaceCoreJS = (source: types.StringLiteral, replacementName: string): void => {
    // eslint-disable-next-line no-param-reassign
    source.value = source.value.replace(/^core-js/, replacementName);
};

interface PluginState {
    readonly path: NodePath;
    readonly opts: {
        replacementName: string;
    };
}

export default function resolveCoreJS(): PluginObj<PluginState> {
    /* eslint-disable @typescript-eslint/naming-convention */
    return {
        visitor: {
            ImportDeclaration(path, state) {
                replaceCoreJS(path.node.source, state.opts.replacementName);
            },
            CallExpression({node}, state) {
                if (isCoreJSRequire(node)) {
                    replaceCoreJS(node.arguments[0] as types.StringLiteral, state.opts.replacementName);
                }
            },
        },
    };
    /* eslint-enable @typescript-eslint/naming-convention */
}

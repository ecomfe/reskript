import {types, PluginObj} from '@babel/core';
import {
    isExpressionContextElligible,
    isClassDefinitionElligible,
    insertDisplayNameAfter,
    isFunctionDefinitionElligible,
} from './utils';

interface BabelCore {
    readonly types: typeof types;
}

interface FileState {
    readonly file: {
        opts: {
            filename: string;
        };
    };
}

const plugin = ({types}: BabelCore): PluginObj<FileState> => {
    /* eslint-disable @typescript-eslint/naming-convention */
    return {
        visitor: {
            ClassDeclaration(path, state) {
                if (isClassDefinitionElligible(path)) {
                    insertDisplayNameAfter(path, types, state.file.opts.filename);
                }
            },
            ClassExpression(path, state) {
                if (isExpressionContextElligible(path) && isClassDefinitionElligible(path)) {
                    insertDisplayNameAfter(path, types, state.file.opts.filename);
                }
            },
            FunctionDeclaration(path, state) {
                const filename = state.file.opts.filename;
                if (isFunctionDefinitionElligible(path, filename)) {
                    insertDisplayNameAfter(path, types, filename);
                }
            },
            FunctionExpression(path, state) {
                const filename = state.file.opts.filename;
                if (isExpressionContextElligible(path) && isFunctionDefinitionElligible(path, filename)) {
                    insertDisplayNameAfter(path, types, filename);
                }
            },
            ArrowFunctionExpression(path, state) {
                const filename = state.file.opts.filename;
                if (isExpressionContextElligible(path) && isFunctionDefinitionElligible(path, filename)) {
                    insertDisplayNameAfter(path, types, filename);
                }
            },
        },
    };
    /* eslint-enable @typescript-eslint/naming-convention */
};

export default plugin;

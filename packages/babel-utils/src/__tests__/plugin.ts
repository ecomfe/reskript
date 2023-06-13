import {PluginObj} from '@babel/core';
import {prepareReactImport} from '../importReact.js';

const plugin = (): PluginObj => {
    return {
        visitor: {
            Program(path) {
                const callee = prepareReactImport(path, 'useEffect');
                // @ts-expect-error 看起来`babel`的类型有问题
                path.pushContainer('body', callee);
            },
        },
    };
};

export default plugin;

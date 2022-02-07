import {PluginObj} from '@babel/core';
import {prepareReactImport} from '../importReact.js';

const plugin = (): PluginObj => {
    return {
        visitor: {
            Program(path) {
                const callee = prepareReactImport(path, 'useEffect');
                path.pushContainer('body', callee);
            },
        },
    };
};

export default plugin;

import {prepareReactImport} from '../importReact';

const plugin = () => {
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

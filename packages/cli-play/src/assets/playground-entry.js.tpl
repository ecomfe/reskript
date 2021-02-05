/* eslint-disable */
import React, {Component, useState, useReducer, useEffect, useCallback} from 'react';
import {render} from 'react-dom';
import {debounce} from 'lodash';
import MonacoEditor, {loader} from "@monaco-editor/react";
import localFroage from 'localforage';
import %COMPONENT_TYPE_NAME% from '%COMPONENT_MODULE_PATH%';
%EXTRA_IMPORTS%

loader.config({paths: {vs: 'https://code.bdstatic.com/npm/monaco-editor@0.21.2/min/vs'}});

const storage = localFroage.createInstance({name: '@reskript/cli-play'});

const DEFAULT_CODE = `const Playground = () => {
    return (
        <%COMPONENT_TYPE_NAME% />
    );
};
export default Playground;`

class Render extends Component {
    state = {error: ''};

    componentDidCatch(ex) {
        this.setState({error: ex.message});
    }

    render() {
        const {error} = this.state;
        const {target: Component} = this.props;

        if (error) {
            return <pre style={{color: 'red'}}>{error}</pre>
        }

        return <Component />;
    }
}

const PreviewLayoutWrapper = ({children}) => (
    %WRAPPER_RETURN%
);

const useDebouncedCallback = (callback, time, dependencies) => useCallback(
    debounce(callback, time),
    [time, ...dependencies]
);

const useDynamicComponent = initialComponentType => {
    const reducer = useCallback(
        (state, componentType) => ({componentType, key: state.key + 1}),
        []
    );
    const [{componentType, key}, setComponentType] = useReducer(reducer, {componentType: initialComponentType, key: 0});
    const onSourceChange = useDebouncedCallback(
        code => {
            try {
                const {code: functionCode} = Babel.transform(
                    code,
                    {presets: ['es2015', 'react']}
                );
                const mod = {exports: {}};
                const factory = new Function('module', 'exports', 'React', '%COMPONENT_TYPE_NAME%', functionCode);
                factory(mod, mod.exports, React, %COMPONENT_TYPE_NAME%);
                setComponentType(mod.exports.default);
            }
            catch (ex) {
            }
            storage.setItem('%COMPONENT_MODULE_PATH%', code);
        },
        500,
        []
    );

    return {componentType, key, onSourceChange};
};

const editorOptions = {
    minimap: {enabled: false},
    scrollBeyondLastLine: false,
};

const Editor = ({onSourceChange}) => {
    const [loading, setLoading] = useState(true);
    const [sourceInStore, setSourceInStore] = useState('');
    useEffect(
        () => {
            (async () => {
                try {
                    const source = await storage.getItem('%COMPONENT_MODULE_PATH%');
                    setSourceInStore(source);
                }
                finally {
                    setLoading(false);
                }
            })();
            storage
        },
        []
    );

    if (loading) {
        return null;
    }

    return (
        <MonacoEditor
            language="javascript"
            theme="light"
            defaultValue={sourceInStore || DEFAULT_CODE}
            options={editorOptions}
            onChange={onSourceChange}
        />
    );
};

const rootStyle = {position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, display: 'flex'};
const editorStyle = {minWidth: '50%', maxWidth: '50%', width: '50%'};
const previewStyle = {minWidth: '50%', maxWidth: '50%', width: '50%'};

const App = () => {
    const {componentType, key, onSourceChange} = useDynamicComponent(%COMPONENT_TYPE_NAME%);

    return (
        <div style={rootStyle}>
            <div style={editorStyle}>
                <Editor onSourceChange={onSourceChange} />
            </div>
            <div style={previewStyle}>
                <PreviewLayoutWrapper>
                    <Render key={key} target={componentType} />
                </PreviewLayoutWrapper>
            </div>
        </div>
    );
};

render(
    <App />,
    document.body.appendChild(document.createElement('div'))
);

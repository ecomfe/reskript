/* eslint-disable */
import React, {Component, useReducer, useCallback} from 'react';
import {render} from 'react-dom';
import {debounce} from 'lodash';
import Editor, {loader} from "@monaco-editor/react";
import %COMPONENT_TYPE_NAME% from '%COMPONENT_MODULE_PATH%';
%EXTRA_IMPORTS%

loader.config({paths: {vs: 'https://code.bdstatic.com/npm/monaco-editor@0.21.2/min/vs'}});

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
            localStorage.setItem('%COMPONENT_MODULE_PATH%', code);
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
const rootStyle = {position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, display: 'flex'};
const editorStyle = {minWidth: '50%', maxWidth: '50%', width: '50%'};
const previewStyle = {minWidth: '50%', maxWidth: '50%', width: '50%'};

const App = () => {
    const {componentType, key, onSourceChange} = useDynamicComponent(%COMPONENT_TYPE_NAME%);

    return (
        <div style={rootStyle}>
            <div style={editorStyle}>
                <Editor
                    language="javascript"
                    theme="light"
                    defaultValue={localStorage.getItem('%COMPONENT_MODULE_PATH%') || DEFAULT_CODE}
                    options={editorOptions}
                    onChange={onSourceChange}
                />
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

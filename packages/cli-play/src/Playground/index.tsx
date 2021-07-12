import React, {createElement, useReducer, useCallback, ComponentType, CSSProperties, ReactNode} from 'react';
import Render from './Render';
import Editor from './Editor';

// eslint-disable-next-line init-declarations
declare const Babel: any;

function Empty() {
    return <div>Component not prepared</div>;
}

interface DynamicState {
    componentType: ComponentType;
    key: number;
}

const reducer = (state: DynamicState, componentType: ComponentType) => ({componentType, key: state.key + 1});

const useDynamicComponent = (componentTypeName: string, playingComponentType: ComponentType) => {
    const [{componentType, key}, setComponentType] = useReducer(reducer, {componentType: playingComponentType, key: 0});
    const onSourceChange = useCallback(
        (code: string) => {
            try {
                const {code: functionCode} = Babel.transform(
                    code,
                    {
                        presets: [
                            'es2015',
                            [
                                'react',
                                {
                                    // TODO: 考虑`emotion`
                                    runtime: 'classic',
                                },
                            ],
                        ],
                    }
                );
                const mod = {exports: {default: Empty}};
                // eslint-disable-next-line no-new-func
                const factory = new Function('module', 'exports', 'React', componentTypeName, functionCode);
                factory(mod, mod.exports, React, playingComponentType);
                setComponentType(mod.exports.default);
            }
            catch {
                // Ignore
            }
        },
        [componentTypeName, playingComponentType]
    );

    return {componentType, key, onSourceChange};
};

const rootStyle: CSSProperties = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: 'grid',
    gridAutoFlow: 'column',
    gridTemplateColumns: '1fr 1fr',
};

interface Props {
    componentTypeName: string;
    defaultComponentType: ComponentType<any>;
    wrapperComponent: ComponentType<{children: ReactNode}>;
}

export default function Playground({componentTypeName, defaultComponentType, wrapperComponent}: Props) {
    const {componentType, key, onSourceChange} = useDynamicComponent(componentTypeName, defaultComponentType);

    return (
        <div style={rootStyle}>
            <div>
                <Editor componentTypeName={componentTypeName} onSourceChange={onSourceChange} />
            </div>
            <div>
                {createElement(wrapperComponent, null, <Render key={key} target={componentType} />)}
            </div>
        </div>
    );
}

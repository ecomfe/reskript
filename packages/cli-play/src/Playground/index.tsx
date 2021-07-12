import React, {useReducer, useCallback, ComponentType, CSSProperties, ReactNode} from 'react';
import Render from './Render';
import Editor from './Editor';

// eslint-disable-next-line init-declarations
declare const Babel: any;

function Empty() {
    return <div>Component not prepared</div>;
}

interface DynamicState {
    currentComponentType: ComponentType;
    key: number;
}

const reducer = (state: DynamicState, nextComponentType: ComponentType) => {
    return {
        currentComponentType: nextComponentType,
        key: state.key + 1,
    };
};

interface DynamicContext {
    componentName: string;
    componentType: ComponentType<any>;
    injects: Record<string, unknown>;
}

const useDynamicComponent = ({componentName, componentType, injects}: DynamicContext) => {
    const [{currentComponentType, key}, setComponentType] = useReducer(
        reducer,
        {currentComponentType: componentType, key: 0}
    );
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
                const factory = new Function('module', 'exports', 'React', componentName, 'I', functionCode);
                factory(mod, mod.exports, React, componentType, injects);
                setComponentType(mod.exports.default);
            }
            catch {
                // Ignore
            }
        },
        [componentName, componentType, injects]
    );

    return {currentComponentType, key, onSourceChange};
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

interface Props extends DynamicContext {
    renderPreview: (content: ReactNode) => ReactNode;
}

export default function Playground({renderPreview, componentName, componentType, injects}: Props) {
    const {currentComponentType, key, onSourceChange} = useDynamicComponent({componentName, componentType, injects});

    return (
        <div style={rootStyle}>
            <div>
                <Editor componentName={componentName} onSourceChange={onSourceChange} />
            </div>
            <div>
                {renderPreview(<Render key={key} target={currentComponentType} />)}
            </div>
        </div>
    );
}

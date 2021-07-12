import React, {createElement, useReducer, useCallback, ComponentType} from 'react';

// eslint-disable-next-line init-declarations
declare const Babel: any;

function Empty() {
    return createElement('div', null, 'Component not prepared');
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

export interface DynamicContext {
    componentName: string;
    componentType: ComponentType<any>;
    injects: Record<string, unknown>;
}

export const useDynamicComponent = ({componentName, componentType, injects}: DynamicContext) => {
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

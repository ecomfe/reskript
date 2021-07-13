import React, {createElement, useState, useEffect, useReducer, useCallback, ComponentType} from 'react';
import {PlayCase} from '../interface';
import {formatTime} from './utils';

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

const listCases = async () => {
    const response = await fetch('/play/cases');
    const cases = await response.json() as PlayCase[];
    return cases;
};

export const useCases = () => {
    const [cases, setCases] = useState<PlayCase[] | null>(null);
    const [selectedCaseIndex, setSelectedCaseIndex] = useState(-1);
    const saveCase = useCallback(
        async (source: string) => {
            const caseToSave: PlayCase = {
                name: `Created at ${formatTime(new Date())}`,
                description: '',
                code: source,
            };
            const response = await fetch(
                '/play/cases',
                {
                    method: 'POST',
                    body: JSON.stringify(caseToSave),
                    headers: {
                        'content-type': 'application/json',
                    },
                }
            );
            await response.text();
            const newCases = await listCases();
            setCases(newCases);
            const newCaseIndex = newCases.findIndex(v => v.name === caseToSave.name);
            setSelectedCaseIndex(newCaseIndex);
        },
        []
    );
    const updateCase = useCallback(
        async (source: string) => {
            const currentCase = cases?.[selectedCaseIndex];

            if (!currentCase) {
                return;
            }

            const response = await fetch(
                `/play/cases/${encodeURIComponent(currentCase.name)}`,
                {
                    method: 'PUT',
                    body: JSON.stringify({code: source}),
                    headers: {
                        'content-type': 'application/json',
                    },
                }
            );
            await response.text();
            const newCases = await listCases();
            setCases(newCases);
        },
        [cases, selectedCaseIndex]
    );
    useEffect(
        () => {
            setCases(null);
            listCases().then(setCases);
        },
        []
    );

    return {
        cases,
        selectedCaseIndex,
        setSelectedCaseIndex,
        saveCase,
        updateCase,
        selectedCase: cases?.[selectedCaseIndex] ?? null,
    };
};

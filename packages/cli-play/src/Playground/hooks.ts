import React, {createElement, useState, useEffect, useReducer, useCallback, ComponentType} from 'react';
import io from 'socket.io-client';
import {PlayCase, PlayCaseInfo} from '../interface.js';
import {formatTime} from '../utils/time.js';

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

interface State {
    cases: PlayCase[] | null;
    selectedIndex: number;
}

export const useCases = (source: string) => {
    const [state, setState] = useState<State>({cases: null, selectedIndex: -1});
    const saveCase = useCallback(
        async () => {
            const caseToSave: PlayCaseInfo = {
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
            const newCaseIndex = newCases.findIndex(v => v.name === caseToSave.name);
            setState({cases: newCases, selectedIndex: newCaseIndex});
        },
        [source]
    );
    const updateCase = useCallback(
        async () => {
            const currentCase = state.cases?.[state.selectedIndex];

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
            setState(s => ({...s, cases: newCases}));
        },
        [source, state.cases, state.selectedIndex]
    );
    useEffect(
        () => {
            listCases().then(cases => setState(s => ({...s, cases})));
        },
        []
    );
    useEffect(
        () => {
            const socket = io({path: '/io-play'});
            socket.on(
                'cases',
                (newCases: PlayCase[]) => {
                    const applyNewCases = ({cases, selectedIndex}: State) => {
                        const currentSelectedCase = cases?.[selectedIndex];
                        const newSelectedIndex = currentSelectedCase
                            ? newCases.findIndex(v => v.name === currentSelectedCase.name)
                            : -1;
                        return {cases: newCases, selectedIndex: newSelectedIndex};
                    };
                    setState(applyNewCases);
                }
            );
            return () => {
                socket.disconnect();
            };
        },
        []
    );

    return {
        cases: state.cases,
        selectedCaseIndex: state.selectedIndex,
        setCaseState: setState,
        setState,
        saveCase,
        updateCase,
    };
};

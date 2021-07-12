import {useMemo} from 'react';
import dedent from 'dedent';
import MonacoEditor, {loader} from '@monaco-editor/react';
import {debounce} from 'debounce';

const defaultCode = (componentName: string) => dedent`
    export default function Repl() {
        return (
            <${componentName} />
        );
    };
`;

loader.config({paths: {vs: 'https://code.bdstatic.com/npm/monaco-editor@0.21.2/min/vs'}});

const editorOptions = {
    minimap: {enabled: false},
    scrollBeyondLastLine: false,
};

interface Props {
    componentName: string;
    onSourceChange: (value: string) => void;
}

export default function Editor({componentName, onSourceChange}: Props) {
    const notifySourceChange = useMemo(
        () => {
            const skipUndefinedValue = (value: string | undefined) => {
                if (value) {
                    onSourceChange(value);
                }
            };
            return debounce(skipUndefinedValue, 500);
        },
        [onSourceChange]
    );

    return (
        <MonacoEditor
            language="javascript"
            theme="light"
            defaultValue={defaultCode(componentName)}
            options={editorOptions}
            onChange={notifySourceChange}
        />
    );
}

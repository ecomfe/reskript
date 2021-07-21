import {useMemo} from 'react';
import MonacoEditor, {loader} from '@monaco-editor/react';
import {debounce} from 'debounce';

loader.config({paths: {vs: 'https://code.bdstatic.com/npm/monaco-editor@0.21.2/min/vs'}});

const editorOptions = {
    minimap: {enabled: false},
    scrollBeyondLastLine: false,
};

interface Props {
    source: string;
    onSourceChange: (value: string) => void;
}

export default function Editor({source, onSourceChange}: Props) {
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
            value={source}
            options={editorOptions}
            onChange={notifySourceChange}
        />
    );
}

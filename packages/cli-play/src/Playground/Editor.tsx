import {useMemo} from 'react';
import {default as MonacoEditor, loader} from '@monaco-editor/react'; // 不写`default as`会引用到`namespace`
import {debounce} from 'debounce';

loader.config({paths: {vs: 'https://code.bdstatic.com/npm/monaco-editor@0.26.1/min/vs'}});

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

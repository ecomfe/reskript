import {useState, CSSProperties, ReactNode, useCallback} from 'react';
import dedent from 'dedent';
import Render from './Render';
import Editor from './Editor';
import Footer from './Footer';
import {useDynamicComponent, DynamicContext, useCases} from './hooks';

const defaultCode = (componentName: string) => dedent`
    export default function Repl() {
        return (
            <${componentName} />
        );
    };
`;

const rootStyle: CSSProperties = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: 'grid',
    gridTemplate: `
        "editor preview"
        "footer footer" 40px / 1fr 1fr
    `,
};

interface Props extends DynamicContext {
    componentFileName: string;
    renderPreview: (content: ReactNode) => ReactNode;
}

export default function Playground(props: Props) {
    const {componentName, componentType, injects, componentFileName, renderPreview} = props;
    const {cases, selectedCaseIndex, setSelectedCaseIndex, saveCase} = useCases();
    const [source, setSource] = useState(defaultCode(componentName));
    const {currentComponentType, key, onSourceChange} = useDynamicComponent({componentName, componentType, injects});
    const updateSource = useCallback(
        (source: string) => {
            setSource(source);
            onSourceChange(source);
        },
        [onSourceChange]
    );
    const selectCaseByIndex = useCallback(
        (index: number) => {
            setSelectedCaseIndex(index);
            const selectedCase = cases?.[index];
            if (selectedCase) {
                updateSource(selectedCase.code);
            }
        },
        [cases, setSelectedCaseIndex, updateSource]
    );
    const saveCaseWithCurrentSource = useCallback(
        () => saveCase(source),
        [saveCase, source]
    );

    return (
        <div style={rootStyle}>
            <div style={{gridArea: 'editor'}}>
                <Editor source={source} onSourceChange={updateSource} />
            </div>
            <div style={{gridArea: 'preview'}}>
                {renderPreview(<Render key={key} target={currentComponentType} />)}
            </div>
            <Footer
                title={componentFileName}
                cases={cases}
                selectedCaseIndex={selectedCaseIndex}
                onSelectCase={selectCaseByIndex}
                onSaveCase={saveCaseWithCurrentSource}
            />
        </div>
    );
}

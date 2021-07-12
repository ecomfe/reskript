import {useState, CSSProperties, ReactNode, useCallback} from 'react';
import dedent from 'dedent';
import {PlayCase} from '../interface';
import Render from './Render';
import Editor from './Editor';
import Footer from './Footer';
import {useDynamicComponent, DynamicContext} from './hooks';

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
    cases: PlayCase[];
    renderPreview: (content: ReactNode) => ReactNode;
}

export default function Playground(props: Props) {
    const {componentName, componentType, injects, componentFileName, cases, renderPreview} = props;
    const [source, setSource] = useState(defaultCode(componentName));
    const {currentComponentType, key, onSourceChange} = useDynamicComponent({componentName, componentType, injects});
    const updateSource = useCallback(
        (source: string) => {
            setSource(source);
            onSourceChange(source);
        },
        [onSourceChange]
    );
    const selectCase = useCallback(
        (selectedCase: PlayCase) => {
            const source = dedent(selectedCase.code);
            updateSource(source);
        },
        [updateSource]
    );

    return (
        <div style={rootStyle}>
            <div style={{gridArea: 'editor'}}>
                <Editor source={source} onSourceChange={updateSource} />
            </div>
            <div style={{gridArea: 'preview'}}>
                {renderPreview(<Render key={key} target={currentComponentType} />)}
            </div>
            <Footer title={componentFileName} cases={cases} onSelectCase={selectCase} />
        </div>
    );
}

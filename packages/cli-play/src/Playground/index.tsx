import {useState, CSSProperties, ReactNode, useCallback} from 'react';
// @ts-expect-error
import dedent from 'dedent';
import Guard from './Guard.js';
import Sidebar from './Sidebar/index.js';
import Render from './Render.js';
import Editor from './Editor.js';
import Footer from './Footer.js';
import CaseDescription from './CaseDescription/index.js';
import Help from './Help/index.js';
import {useDynamicComponent, DynamicContext, useCases} from './hooks.js';
import {PanelType} from './interface.js';

const defaultCode = (componentName: string) => dedent`
    export default function Repl() {
        return (
            <${componentName} />
        );
    }
`;

const rootStyle: CSSProperties = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: 'grid',
    gridTemplate: `
        "sidebar main preview"
        "sidebar footer footer" 40px / 40px minmax(0, 1fr) 1fr
    `,
};

interface Props extends DynamicContext {
    componentFilePath: string;
    configurationFilePath: string;
    configurationSourceCode: string;
    renderPreview: (content: ReactNode) => ReactNode;
}

function MainContent(props: Props) {
    const {
        componentName,
        componentType,
        injects,
        componentFilePath,
        configurationFilePath,
        configurationSourceCode,
        renderPreview,
    } = props;
    const [panelType, setPanelType] = useState<PanelType>('source');
    const [source, setSource] = useState(defaultCode(componentName));
    const {cases, selectedCaseIndex, setCaseState, saveCase, updateCase} = useCases(source);
    const {currentComponentType, key, onSourceChange} = useDynamicComponent({componentName, componentType, injects});
    const updateSource = useCallback(
        (source: string) => {
            setSource(source);
            onSourceChange(source);
        },
        [onSourceChange]
    );
    const selectCaseByIndex = useCallback(
        async (index: number) => {
            setCaseState(s => ({...s, selectedIndex: index}));
            const selectedCase = cases?.[index];
            if (selectedCase) {
                updateSource(selectedCase.code);
                await fetch(`/play/cases/${selectedCase.name}/TOUCH`, {method: 'PUT'});
            }
        },
        [cases, setCaseState, updateSource]
    );
    const renderMainContent = () => {
        switch (panelType) {
            case 'source':
                return <Editor source={source} onSourceChange={updateSource} />;
            case 'help':
                return (
                    <Help
                        componentFilePath={componentFilePath}
                        configurationFilePath={configurationFilePath}
                        configurationSourceCode={configurationSourceCode}
                    />
                );
            case 'description':
                return <CaseDescription currentCase={cases?.[selectedCaseIndex]} />;
            default:
                return null;
        }
    };

    return (
        <div style={rootStyle}>
            <Sidebar panelType={panelType} onNavigate={setPanelType} />
            <div style={{gridArea: 'main'}}>
                {renderMainContent()}
            </div>
            <div style={{gridArea: 'preview', borderLeft: '1px solid #eee'}}>
                {renderPreview(<Render key={key} target={currentComponentType} />)}
            </div>
            <Footer
                title={componentFilePath}
                cases={cases}
                selectedCaseIndex={selectedCaseIndex}
                onSelectCase={selectCaseByIndex}
                onSaveCase={saveCase}
                onUpdateCase={updateCase}
            />
        </div>
    );
}

export default function PlayGround(props: Props) {
    return (
        <Guard>
            <MainContent {...props} />
        </Guard>
    );
}

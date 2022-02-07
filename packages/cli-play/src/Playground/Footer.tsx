import {CSSProperties} from 'react';
import {PlayCase} from '../interface.js';
import CaseSelect from './CaseSelect/index.js';
import Button from './Button/index.js';

interface Props {
    title: string;
    cases: PlayCase[] | null;
    selectedCaseIndex: number;
    onSelectCase: (index: number) => void;
    onSaveCase: () => void;
    onUpdateCase: () => void;
}

const wrapperStyle: CSSProperties = {
    gridArea: 'footer',
    display: 'grid',
    gridAutoFlow: 'column',
    gridTemplateColumns: '1fr repeat(2, auto)',
    alignItems: 'center',
    padding: '0 20px',
    columnGap: 12,
    backgroundColor: '#f3f3f3',
};

const titleStyle: CSSProperties = {
    fontSize: 18,
    fontFamily: 'monospace',
    margin: 0,
    textAlign: 'left',
    direction: 'rtl',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
};

export default function Footer({title, cases, selectedCaseIndex, onSelectCase, onSaveCase, onUpdateCase}: Props) {
    return (
        <footer style={wrapperStyle}>
            <h2 style={titleStyle} title={title}>{title}</h2>
            <div>
                选择用例：
                <CaseSelect dataSource={cases} value={selectedCaseIndex} onChange={onSelectCase} />
            </div>
            <Button onClick={onSaveCase}>保存为新用例</Button>
            <Button disabled={selectedCaseIndex < 0} onClick={onUpdateCase}>更新当前用例</Button>
        </footer>
    );
}

import {CSSProperties} from 'react';
import {PlayCase} from '../interface';
import CaseSelect from './CaseSelect';
import Button from './Button';

interface Props {
    title: string;
    cases: PlayCase[] | null;
    selectedCaseIndex: number;
    onSelectCase: (index: number) => void;
    onSaveCase: () => void;
}

const wrapperStyle: CSSProperties = {
    gridArea: 'footer',
    display: 'grid',
    gridAutoFlow: 'column',
    gridTemplateColumns: '1fr repeat(2, auto)',
    alignItems: 'center',
    padding: '0 20px',
    columnGap: 12,
};

const titleStyle: CSSProperties = {
    fontSize: 18,
    fontFamily: 'monospace',
    margin: 0,
};

export default function Footer({title, cases, selectedCaseIndex, onSelectCase, onSaveCase}: Props) {
    return (
        <footer style={wrapperStyle}>
            <h2 style={titleStyle}>{title}</h2>
            <div>
                选择用例：
                <CaseSelect dataSource={cases} value={selectedCaseIndex} onChange={onSelectCase} />
            </div>
            <div>
                <Button onClick={onSaveCase}>保存用例</Button>
            </div>
        </footer>
    );
}

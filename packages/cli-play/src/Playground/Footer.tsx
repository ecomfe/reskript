import {useCallback, CSSProperties, ChangeEvent} from 'react';
import {PlayCase} from '../interface';

interface Props {
    cases: PlayCase[];
    title: string;
    onSelectCase: (value: PlayCase) => void;
}

const wrapperStyle: CSSProperties = {
    gridArea: 'footer',
    display: 'grid',
    gridAutoFlow: 'column',
    gridTemplateColumns: '1fr auto',
    alignItems: 'center',
    padding: '0 20px',
};

const titleStyle: CSSProperties = {
    fontSize: 18,
    fontFamily: 'monospace',
    margin: 0,
};

export default function Footer({title, cases, onSelectCase}: Props) {
    const selectCase = useCallback(
        (e: ChangeEvent<HTMLSelectElement>) => {
            const index = parseInt(e.target.value, 10);
            if (index >= 0) {
                const selectedCase = cases[index];
                onSelectCase(selectedCase);
            }
        },
        [cases, onSelectCase]
    );

    return (
        <footer style={wrapperStyle}>
            <h2 style={titleStyle}>{title}</h2>
            <div>
                选择用例：
                <select onChange={selectCase}>
                    <option value={-1}>选择用例</option>
                    {cases.map((v, i) => <option key={v.name} value={i}>{v.name}</option>)}
                </select>
            </div>
        </footer>
    );
}

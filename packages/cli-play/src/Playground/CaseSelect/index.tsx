import {useCallback, ChangeEvent} from 'react';
import {PlayCase} from '../../interface.js';
import './index.css';

interface Props {
    dataSource: PlayCase[] | null;
    value: number;
    onChange: (value: number) => void;
}

const renderDisabled = (text: string) => (
    <select className="select" defaultValue={-2}>
        <option disabled value={-2}>
            {text}
        </option>
    </select>
);

export default function CaseSelect({dataSource, value, onChange}: Props) {
    const selectCase = useCallback(
        (e: ChangeEvent<HTMLSelectElement>) => {
            const index = parseInt(e.target.value, 10);
            onChange(index);
        },
        [onChange]
    );

    if (!dataSource) {
        return renderDisabled('用例加载中……');
    }

    if (!dataSource.length) {
        return renderDisabled('无用例');
    }

    return (
        <select className="select" value={value} onChange={selectCase}>
            <option value={-1}>选择用例</option>
            {dataSource.map((v, i) => <option key={v.name} value={i}>{v.name}</option>)}
        </select>
    );
}

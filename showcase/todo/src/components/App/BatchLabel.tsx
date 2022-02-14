import {useCallback} from 'react';
import api from '@/api/todo';
import c from './BatchLabel.less';

interface Props {
    onFinish: () => Promise<void>;
}

export default function BatchLabel({onFinish}: Props) {
    const markAllDone = useCallback(
        async () => {
            await api.markAllDone();
            await onFinish();
        },
        [onFinish]
    );

    return <button id="batch" type="button" className={c.root} onClick={markAllDone}>all done</button>;
}

import {useCallback, useState, ChangeEvent, KeyboardEvent} from 'react';
import {Input, InputProps} from 'antd';
import {TodoItemDraft} from '@/api/todo';
import c from './index.less';

interface Props {
    onSubmit: (draft: TodoItemDraft) => void;
}

export default function Create({onSubmit}: Props) {
    const [value, setValue] = useState('');
    const updateValue = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => setValue(e.target.value),
        []
    );
    const submit = useCallback(
        (e: KeyboardEvent<HTMLInputElement>) => {
            const description = value.trim();

            if (description && e.key === 'Enter') {
                e.preventDefault();
                onSubmit({description});
                setValue('');
            }
        },
        [onSubmit, value]
    );
    const inputProps: InputProps = {
        className: c.input,
        style: {fontSize: 24},
        placeholder: 'What needs to be done?',
        value: value,
        onChange: updateValue,
        onKeyDown: submit,
    };

    return (
        <div id="create">
            <Input {...inputProps} />
        </div>
    );
}

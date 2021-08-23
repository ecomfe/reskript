import {useCallback, useState, ChangeEvent, KeyboardEvent} from 'react';
import styled from 'styled-components';
import {Input} from 'antd';
import {TodoItemDraft} from '@/api/todo';

const DescriptionInput = styled(Input)`
    height: 64px;
    font-size: 24px;
`;

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

    return (
        <div>
            <DescriptionInput
                placeholder="What needs to be done?"
                value={value}
                onChange={updateValue}
                onKeyDown={submit}
            />
        </div>
    );
}

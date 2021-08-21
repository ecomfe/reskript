import {useCallback, KeyboardEvent} from 'react';
import styled from '@emotion/styled';
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
    const submit = useCallback(
        (e: KeyboardEvent<HTMLInputElement>) => {
            const target = e.target as HTMLInputElement;
            const value = target.value.trim();

            if (value && e.key === 'Enter') {
                e.preventDefault();
                target.value = '';
                onSubmit({description: value});
            }
        },
        [onSubmit]
    );

    return (
        <div>
            <DescriptionInput placeholder="What needs to be done?" onKeyDown={submit} />
        </div>
    );
}

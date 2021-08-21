import {useCallback} from 'react';
import styled from '@emotion/styled';
import {TodoItem} from '@/api/todo';
import TodoIcon from './todo.svg?react';
import DoneIcon from './done.svg?react';

const Layout = styled.li`
    display: grid;
    grid-auto-flow: column;
    grid-template-columns: auto 1fr;
    align-items: center;
    column-gap: 12px;
    height: 40px;
    font-size: 16px;
    border-bottom: 1px solid #ededed;
`;

const Toggle = styled.span`
    font-size: 24px;
    cursor: pointer;

    &:hover {
        opacity: .7;
    }
`;

const Description = styled.div`
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

interface Props extends TodoItem {
    onToggle: (id: string) => void;
}

export default function Item({id, description, done, onToggle}: Props) {
    const toggle = useCallback(
        () => onToggle(id),
        [id, onToggle]
    );

    return (
        <Layout>
            <Toggle onClick={toggle}>
                {done ? <DoneIcon /> : <TodoIcon />}
            </Toggle>
            <Description>
                {description}
            </Description>
        </Layout>
    );
}

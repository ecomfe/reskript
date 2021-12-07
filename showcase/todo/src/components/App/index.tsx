import {useState, useCallback, useEffect} from 'react';
import {Button} from 'antd';
import styled from 'styled-components';
import api, {TodoItem, TodoItemDraft} from '@/api/todo';
import Create from '../Create';
import List from '../List';
import c from './index.less';

const Title = styled.h1`
    font-size: 100px;
    margin: 0;
    text-align: center;
    color: rgba(175, 47, 47, .15);
`;

const Meta = styled.aside`
    color: #a6a6a6;
`;

const Layout = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    max-width: 800px;
    margin: 0 auto;
`;

export default function App() {
    const [todos, setTodos] = useState<TodoItem[]>([]);
    const requestList = useCallback(
        async () => {
            const dataSource = await api.list();
            setTodos(dataSource);
        },
        []
    );
    const createNew = useCallback(
        async (draft: TodoItemDraft) => {
            await api.save(draft);
            await requestList();
        },
        [requestList]
    );
    const toggleItem = useCallback(
        async (id: string) => {
            await api.toggle(id);
            await requestList();
        },
        [requestList]
    );
    const markAllDone = useCallback(
        async () => {
            await api.markAllDone();
            await requestList();
        },
        [requestList]
    );
    useEffect(
        () => {
            requestList();
        },
        [requestList]
    );

    return (
        <Layout className={c.root}>
            <Title>todos</Title>
            <Create onSubmit={createNew} />
            <Meta className="flex items-center justify-between">
                {todos.length} things waiting
                {$features.batch && <Button type="link" onClick={markAllDone}>all done</Button>}
            </Meta>
            <List dataSource={todos} onToggleItem={toggleItem} />
        </Layout>
    );
}

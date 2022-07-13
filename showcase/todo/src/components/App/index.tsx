import {useState, useCallback, useEffect, lazy, Suspense} from 'react';
import styled from '@emotion/styled';
import api, {TodoItem, TodoItemDraft} from '@/api/todo';
import WorkerStatus from '@/components/WorkerStatus';
import List from '../List';
import BatchLabel from './BatchLabel';
import './lintIgnore';
import c from './index.less';
import './lintIgnore.global.css';
import decoration from './decoration.png';

const Create = lazy(() => import('../Create'));

const Header = styled.h1`
    font-size: 100px;
    margin: 0;
    text-align: center;
`;

const Title = styled.span`
    padding: 0 20px;
    background: transparent url(${decoration}) no-repeat top 24px right 12px;
    background-size: 23px 30px;
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

    /* 测试组件选择器是否有效 */
    ${Header} {
        color: rgba(175, 47, 47, .15);
    }
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
    useEffect(
        () => {
            requestList();
        },
        [requestList]
    );

    return (
        <Layout id="app" className={c('root')}>
            <Header>
                <Title>todos</Title>
            </Header>
            <Suspense fallback={<div style={{height: 64}} />}>
                <Create onSubmit={createNew} />
            </Suspense>
            {/* @ts-expect-error */}
            <Meta id="app-meta" className="flex items-center justify-between">
                <span className="flex items-center gap-1">
                    <WorkerStatus />
                    {todos.length} things waiting
                </span>
                {skr.features.batch && <BatchLabel onFinish={requestList} />}
            </Meta>
            <List dataSource={todos} onToggleItem={toggleItem} />
        </Layout>
    );
}

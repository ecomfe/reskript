import {sort} from 'ramda';
import styled from '@emotion/styled';
import {TodoItem} from '@/api/todo';
import Item from './Item';

const Layout = styled.ol`
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 4px;
    list-style: none;
`;

const sortTodo = sort<TodoItem>((x, y) => (new Date(y.created)).getTime() - (new Date(x.created)).getTime());

interface Props {
    dataSource: TodoItem[];
    onToggleItem: (id: string) => void;
}

export default function List({dataSource, onToggleItem}: Props) {
    return (
        <Layout>
            {sortTodo(dataSource).map(v => <Item key={v.id} {...v} onToggle={onToggleItem} />)}
        </Layout>
    );
}

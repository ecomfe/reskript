import {createInstance} from 'localforage';
import {nanoid} from 'nanoid';

const options = {
    name: 'TodoMVC',
    storeName: 'todo',
};

const store = createInstance(options);

export interface TodoItemDraft {
    description: string;
    dueDate?: string;
}

export interface TodoItem extends TodoItemDraft {
    id: string;
    created: string;
    done: boolean;
}

export default {
    save: async (draft: TodoItemDraft) => {
        const item: TodoItem = {
            id: nanoid(),
            created: (new Date()).toISOString(),
            done: false,
            ...draft,
        };
        const list = await store.getItem<TodoItem[]>('list');
        await store.setItem('list', [...list ?? [], item]);
    },
    list: async () => {
        const list = await store.getItem<TodoItem[]>('list');
        return list ?? [];
    },
    toggle: async (id: string) => {
        const list = await store.getItem<TodoItem[]>('list');
        const next = (list ?? []).map(v => (v.id === id ? {...v, done: !v.done} : v));
        await store.setItem('list', next);
    },
    markAllDone: async () => {
        const list = await store.getItem<TodoItem[]>('list');
        const next = (list ?? []).map(v => ({...v, done: true}));
        await store.setItem('list', next);
    },
};

declare module 'tty-table' {
    interface Column {
        value: string;
        alias?: string;
        align?: 'left' | 'right' | 'center';
        width?: number;
        color?: string;
        formatter?: (value: any) => string;
    }

    export default class ConsoleTable {
        constructor(headers: Column[], rows: string[][] | object[]);
        render(): string;
    }
}

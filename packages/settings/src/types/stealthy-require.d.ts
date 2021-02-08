declare module 'stealthy-require' {
    export default function stealthyRequire<T>(cache: Record<string, any>, require: (path: string) => T): T;
}

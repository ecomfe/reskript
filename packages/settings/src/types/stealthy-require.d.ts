declare module 'stealthy-require' {
    export default function stealthyRequire<T>(cache: {[key: string]: any}, require: (path: string) => T): T;
}

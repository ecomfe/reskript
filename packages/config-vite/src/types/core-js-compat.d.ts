declare module 'core-js-compat' {
    interface CompatOptions {
        targets: string;
        filter?: RegExp;
        version?: string;
    }

    interface CompatResult {
        list: string[];
        targets: Record<string, Record<string, string>>;
    }

    function compat(options: CompatOptions): CompatResult;

    export default compat;
}

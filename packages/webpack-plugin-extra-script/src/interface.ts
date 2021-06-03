export type MayBeFactory<T, O> = T | ((options: O) => T);

export interface Options {
    prepend?: boolean;
}

export interface InlineScriptDescriptor {
    content: string;
}

export interface ExternalScriptDescriptor {
    src: string;
    async?: boolean;
    crossOrigin?: boolean;
}

export type ScriptDescriptor = InlineScriptDescriptor | ExternalScriptDescriptor;

export interface ScriptFactoryContext {
    [key: string]: any;
    publicPath: string;
}

export type ScriptFactory = MayBeFactory<ScriptDescriptor | ScriptDescriptor[], ScriptFactoryContext>;

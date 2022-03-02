import {CustomizeMiddleware} from '@reskript/settings';

export interface EntryTarget {
    name: string;
    entry: string;
    content: string;
}

export interface ResourceOptions {
    name: string;
    content: string;
}

export interface ServerOptions extends ResourceOptions {
    publicPath: string;
    customizeMiddleware: CustomizeMiddleware;
}

export interface VirtualEntryOptions extends Omit<ServerOptions, keyof ResourceOptions> {
    entries: EntryTarget[];
    defaultEntry: EntryTarget;
    buildTarget: string;
    customizeMiddleware: CustomizeMiddleware;
    favicon?: string;
    appContainerId?: string;
}

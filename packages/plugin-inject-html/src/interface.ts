import {CommandName} from '@reskript/settings';

export interface TagDescription {
    tag: string;
    attributes?: Record<string, string | true | undefined>;
    void?: boolean;
    children?: string;
}

export interface InjectHtmlOptions {
    headStart?: TagDescription[];
    headEnd?: TagDescription[];
    bodyStart?: TagDescription[];
    bodyEnd?: TagDescription[];
    enableOnCommand?: CommandName[];
}

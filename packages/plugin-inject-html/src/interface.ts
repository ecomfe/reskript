export interface TagDescription {
    tag: string;
    attributes?: Record<string, string | true | undefined>;
    void?: boolean;
    children?: string;
}

export interface Options {
    headStart?: TagDescription[];
    headEnd?: TagDescription[];
    bodyStart?: TagDescription[];
    bodyEnd?: TagDescription[];
}

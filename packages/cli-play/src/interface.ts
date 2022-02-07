import {ComponentType, ReactNode} from 'react';


export interface PlayCaseMeta {
    createAt: string;
    createBy: string;
    lastRunAt: string;
    lastRunBy: string;
}

export interface PlayCaseInfo {
    name: string;
    description: string;
    code: string;
}

export type PlayCase = PlayCaseMeta & PlayCaseInfo;

export type CasePatch = Omit<PlayCase, 'name'>;

export interface PlayConfiguration {
    readonly wrapper: ComponentType<{children: ReactNode}>;
    readonly provides: Record<string, unknown>;
}

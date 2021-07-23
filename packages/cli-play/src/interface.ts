import {ComponentType, ReactNode} from 'react';
import {ProjectAware} from '@reskript/core';

// eslint-disable-next-line @typescript-eslint/ban-types
export type HostType = 'localhost' | 'loopback' | 'ip' | {} & string;

export interface PlayCommandLineArgs extends ProjectAware {
    readonly buildTarget: string;
    readonly port: string;
    readonly host?: HostType;
}

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

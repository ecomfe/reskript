import {ComponentType, ReactNode} from 'react';
import {ProjectAware} from '@reskript/core';

// eslint-disable-next-line @typescript-eslint/ban-types
export type HostType = 'localhost' | 'loopback' | 'ip' | {} & string;

export interface PlayCommandLineArgs extends ProjectAware {
    readonly configFile?: string;
    readonly buildTarget: string;
    readonly port: number;
    readonly host: HostType;
    readonly concurrentMode?: boolean;
    readonly setup?: string;
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

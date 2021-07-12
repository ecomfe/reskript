import {ComponentType, ReactNode} from 'react';
import {ProjectAware} from '@reskript/core';

export interface PlayCommandLineArgs extends ProjectAware {
    readonly buildTarget: string;
}

export interface PlayCase {
    name: string;
    code: string;
}

export interface PlayConfiguration {
    readonly wrapper: ComponentType<{children: ReactNode}>;
    readonly cases: PlayCase[];
    readonly injects: Record<string, unknown>;
}

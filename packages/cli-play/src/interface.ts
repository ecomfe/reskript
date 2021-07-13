import {ComponentType, ReactNode} from 'react';
import {ProjectAware} from '@reskript/core';

export interface PlayCommandLineArgs extends ProjectAware {
    readonly buildTarget: string;
}

export interface PlayCase {
    name: string;
    description: string;
    code: string;
}

export type CasePatch = Omit<PlayCase, 'name'>;

export interface PlayConfiguration {
    readonly wrapper: ComponentType<{children: ReactNode}>;
    readonly provides: Record<string, unknown>;
}

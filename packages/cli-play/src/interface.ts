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

export interface PlayConfiguration {
    readonly wrapper: ComponentType<{children: ReactNode}>;
    // TODO: 改叫`provides`
    readonly injects: Record<string, unknown>;
}

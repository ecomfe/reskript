import {ProjectAware} from '@reskript/core';

export interface PlayCommandLineArgs extends ProjectAware {
    readonly buildTarget: string;
}

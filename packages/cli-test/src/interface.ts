import {ProjectAware} from '@reskript/core';
import {TestTarget} from '@reskript/config-jest';

export interface JestCommandLineArgs {
    readonly coverage: boolean;
    readonly watch: boolean;
    readonly target: TestTarget;
    readonly changedSince: string;
    readonly src: string;
}

export interface TestCommandLineArgs extends ProjectAware, JestCommandLineArgs {
    readonly target: TestTarget;
}

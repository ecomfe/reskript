import {ProjectAware} from '@reskript/core';
import {TestTarget} from '@reskript/config-jest';

export interface JestCommandLineArgs {
    readonly coverage: boolean;
    readonly watch: boolean;
    readonly target: TestTarget;
    readonly changedSince: string;
    readonly collectCoverageFrom: string;
    readonly maxWorkers?: string;
}

export interface TestCommandLineArgs extends ProjectAware, JestCommandLineArgs {
    readonly src: string;
    readonly target: TestTarget;
}

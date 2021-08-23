import {ProjectAware} from '@reskript/core';
import {TestTarget} from '@reskript/config-jest';

export interface TestCommandLineArgs extends ProjectAware {
    readonly coverage: boolean;
    readonly watch: boolean;
    readonly target: TestTarget;
    readonly changedSince: string;
    readonly collectCoverageFrom: string;
    readonly maxWorkers?: string;
}

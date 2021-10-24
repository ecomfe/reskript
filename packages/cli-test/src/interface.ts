import {ProjectAware} from '@reskript/core';
import {TestTarget} from '@reskript/config-jest';

export interface TestCommandLineArgs extends ProjectAware {
    readonly target: TestTarget;
    readonly jestArgs: string[];
}

import {ProjectAware} from '@reskript/core';
import {FeatureMatrix} from '@reskript/settings';

export type TestTarget = 'react' | 'node';

export interface JestConfigOptions extends ProjectAware {
    readonly target: TestTarget;
    readonly features?: FeatureMatrix;
}

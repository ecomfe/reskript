// @ts-expect-error
import type {ProjectAware} from '@reskript/core';
// @ts-expect-error
import type {FeatureMatrix} from '@reskript/settings';

export type TestTarget = 'react' | 'node';

export interface JestConfigOptions extends ProjectAware {
    readonly target: TestTarget;
    readonly features?: FeatureMatrix;
}

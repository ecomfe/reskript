import type {ProjectAware} from '@reskript/core' assert {'resolution-mode': 'import'};
import type {FeatureMatrix} from '@reskript/settings' assert {'resolution-mode': 'import'};

// NOTE: 和`@reskript/settings`的类型重复，但因为这个是CommonJS模块，不能复用
export type TestTarget = 'react' | 'node';

export interface JestConfigOptions extends ProjectAware {
    readonly target: TestTarget;
    readonly features?: FeatureMatrix;
}

import {logger} from '@reskript/core';
import {ProjectSettings} from './interface';

// eslint-disable-next-line @typescript-eslint/ban-types
type LeafType = string | number | boolean | undefined | null | Function | RegExp | unknown[];

type DeepPartial<T> = T extends LeafType ? T : {[K in keyof T]?: DeepPartial<T[K]>};

const DOCUMENT_LINK = 'https://ecomfe.github.io/reskript/docs/settings/build#特殊第三方库的优化';

export const warnDeprecatedInProjectSettings = (settings: DeepPartial<ProjectSettings>): void => {
    if (settings.build?.script?.defaultImportOptimization !== undefined) {
        logger.warn('[DEPRECATED]: build.script.defaultImportOptimization is deprecated, use build.uses instead');
        logger.warn(`To see a complete guide to build.uses, please visit ${DOCUMENT_LINK}`);
    }
    // TODO: 把`play.wrapper`干掉
};

import {logger} from '@reskript/core';
import {ProjectSettings} from './interface';

// eslint-disable-next-line @typescript-eslint/ban-types
type LeafType = string | number | boolean | undefined | null | Function | RegExp | unknown[];

type DeepPartial<T> = T extends LeafType ? T : {[K in keyof T]?: DeepPartial<T[K]>};


export const warnDeprecatedInProjectSettings = (settings: DeepPartial<ProjectSettings>): void => {
    if (settings.build?.script?.defaultImportOptimization !== undefined) {
        const documentLink = 'https://ecomfe.github.io/reskript/docs/settings/build#特殊第三方库的优化';
        logger.warn('[DEPRECATED]: build.script.defaultImportOptimization is deprecated, use build.uses instead');
        logger.warn(`To see a complete guide to build.uses, please visit ${documentLink}`);
    }
    if (settings.play?.wrapper !== undefined) {
        const documentLink = 'https://ecomfe.github.io/reskript/docs/advanced/debug-component#自定义调试预览的布局';
        logger.warn('[DEPRECATED]: play.wrapper is deprecated, use standalone play configuration instead');
        logger.warn(`To see a complete guide to custom wapper in play configuration, please visit ${documentLink}`);
    }
};

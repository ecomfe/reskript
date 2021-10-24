import {isFlagEnabled} from './flag';
import logger from './logger';

export const deprecatedWarn = (message: string) => {
    if (isFlagEnabled('deprecation-error')) {
        logger.error(`[DEPRECATED]: ${message}`);
        process.exit(21);
    }
    else {
        logger.warn(`[DEPRECATED]: ${message}`);
    }
};

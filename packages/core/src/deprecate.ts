import {isFlagEnabled} from './flag.js';
import logger from './logger.js';

export const deprecatedWarn = (message: string) => {
    if (isFlagEnabled('deprecation-error')) {
        logger.error(`[DEPRECATED]: ${message}`);
        process.exit(21);
    }
    else {
        logger.warn(`[DEPRECATED]: ${message}`);
    }
};

import {logger} from '@reskript/core';
import symbols from 'log-symbols';

const printDetails = (details: string[]) => {
    for (const line of details) {
        logger.log(' '.repeat(4) + line, {dedent: false});
    }
};

export const warn = (message: string, ...details: string[]) => {
    logger.log(`${symbols.warning} ${message}`);
    printDetails(details);
};

export const tip = (message: string, ...details: string[]) => {
    logger.log(`${symbols.info} ${message}`);
    printDetails(details);
};

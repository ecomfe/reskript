import logger from './logger.js';

const ALL_FLAGS = [
    'deprecation-error',
] as const;

export type Flag = typeof ALL_FLAGS[number];

const flags: Array<Flag | 'all'> = (() => {
    const env = process.env.SKR_FLAGS ?? '';
    const flags = env.split(',').map(v => v.trim()).filter(v => !!v);
    const unknownFlags = flags.filter(v => v !== 'all' && !(ALL_FLAGS as readonly string[]).includes(v));

    if (unknownFlags.length) {
        logger.error(`Unknown flags: ${unknownFlags.join(', ')}`);
        process.exit(21);
    }

    return flags as Array<Flag | 'all'>;
})();

export const isFlagEnabled = (name: Flag) => flags.includes('all') || flags.includes(name);

export const isInDebugMode = () => process.env.SKR_LOGGING === 'debug';

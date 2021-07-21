import chalk from 'chalk';
import dedentString from 'dedent';

type LogLevel = 'log' | 'warn' | 'error';

type Color = 'red' | 'yellow' | 'green' | 'white';

interface LogOptions {
    dedent?: boolean;
}

type LogString = (message: string, options?: LogOptions) => void;
type Logger = LogString & {[K in Color]: LogString};

const createLogWith = (level: LogLevel, defaultColor?: Color): Logger => {
    // eslint-disable-next-line no-console
    const log = console[level];

    const withColor = (color = defaultColor): LogString => (message, options = {}) => {
        const {dedent = true} = options;
        const dedented = dedent ? dedentString(message) : message;
        const colorized = color ? chalk[color](dedented) : dedented;
        log(colorized);
    };

    const logBase = withColor();
    return Object.assign(
        logBase,
        {
            red: withColor('red'),
            yellow: withColor('yellow'),
            green: withColor('green'),
            white: withColor('white'),
        }
    );
};

export default {
    log: createLogWith('log'),
    warn: createLogWith('warn', 'yellow'),
    error: createLogWith('error', 'red'),
    // eslint-disable-next-line no-console
    lineBreak: () => console.log(''),
};

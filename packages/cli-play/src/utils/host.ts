import {PlayCommandLineArgs} from '../interface.js';

export const resolveHost = async (hostType: PlayCommandLineArgs['host']) => {
    const {internalIpV4} = await import('internal-ip');

    if (!hostType) {
        return 'localhost';
    }

    switch (hostType) {
        case 'localhost':
            return 'localhost';
        case 'loopback':
            return '127.0.0.1';
        case 'ip': {
            const ip = await internalIpV4();
            return ip ?? 'localhost';
        }
        default:
            return hostType;
    }
};

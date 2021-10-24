import internalIp from 'internal-ip';
import {PlayCommandLineArgs} from '../interface';

export const resolveHost = async (hostType: PlayCommandLineArgs['host']) => {
    if (!hostType) {
        return 'localhost';
    }

    switch (hostType) {
        case 'localhost':
            return 'localhost';
        case 'loopback':
            return '127.0.0.1';
        case 'ip': {
            const ip = await internalIp.v4();
            return ip ?? 'localhost';
        }
        default:
            return hostType;
    }
};

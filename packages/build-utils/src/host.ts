import {internalIpV4} from 'internal-ip';
import {HostType} from '@reskript/settings';

export const resolveDevHost = async (hostType: HostType | undefined) => {
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

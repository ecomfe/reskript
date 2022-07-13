import path from 'node:path';
import {existsSync} from 'node:fs';

interface BindingTarget {
    arch: string;
    musl?: boolean;
    key: string;
}

interface PlatformTarget {
    platform: string;
    bindings: BindingTarget[];
}

const platforms: PlatformTarget[] = [
    {
        platform: 'arm64',
        bindings: [
            {arch: 'arm64', key: 'android-arm64'},
            {arch: 'arm', key: 'android-arm-eabi'},
        ],
    },
    {
        platform: 'win32',
        bindings: [
            {arch: 'x64', key: 'win32-x64-msvc'},
            {arch: 'ia32', key: 'win32-ia32-msvc'},
            {arch: 'arm64', key: 'win32-arm64-msvc'},
        ],
    },
    {
        platform: 'darwin',
        bindings: [
            {arch: 'x64', key: 'darwin-x64'},
            {arch: 'arm64', key: 'darwin-arm64'},
        ],
    },
    {
        platform: 'freebsd',
        bindings: [
            {arch: 'x64', key: 'freebsd-x64'},
        ],
    },
    {
        platform: 'linux',
        bindings: [
            {arch: 'x64', musl: true, key: 'linux-x64-musl'},
            {arch: 'x64', musl: false, key: 'linux-x64-gnu'},
            {arch: 'arm64', musl: true, key: 'linux-arm64-musl'},
            {arch: 'arm64', musl: false, key: 'linux-arm64-gnu'},
            {arch: 'arm', key: 'linux-arm-gnueabihf'},
        ],
    },
];

const isMusl = () => {
    // @ts-expect-error
    const {glibcVersionRuntime} = process.report?.getReport().header;
    return !glibcVersionRuntime;
};

const resolve = () => {
    const musl = isMusl();
    const platformFound = platforms.find(v => v.platform === process.platform);

    if (!platformFound) {
        throw new Error(`Unsupported OS: ${process.platform}, architecture: ${process.arch}`);
    }

    const isArchMatch = (target: BindingTarget) => {
        if (target.arch !== process.arch) {
            return false;
        }

        return target.musl === undefined || target.musl === musl;
    };
    const bindingFound = platformFound.bindings.find(isArchMatch);

    if (!bindingFound) {
        throw new Error(`Unsupported architecture on ${platformFound.platform}: ${process.arch}`);
    }

    const hasLocalFile = existsSync(path.join(__dirname, `swc.${bindingFound.key}.node`));
    return hasLocalFile ? require(`./swc.${bindingFound.key}.node`) : require(`@next/swc-${bindingFound.key}`);
};

const {transform} = resolve();

export {transform};

import {EntryObject} from 'webpack';
import ProxyAgent from 'proxy-agent';
import {resolveFrom} from '@reskript/core';

type EntryType = EntryObject[string];

const HOT_MODULES = [
    'webpack/hot/dev-server.js',
    'webpack-dev-server/client/index.js',
] as const;

export const addHotModuleToEntry = async (entry: string | EntryType, resolveBase: string): Promise<EntryType> => {
    const [serverHotEntry, clientHotEntry] = await Promise.all(HOT_MODULES.map(resolveFrom(resolveBase)));
    const hotImports = [
        serverHotEntry,
        `${clientHotEntry}?hot=true&live-reload=true`,
    ];

    if (typeof entry === 'string' || Array.isArray(entry)) {
        return hotImports.concat(entry);
    }

    return {
        ...entry,
        import: entry.import ? hotImports.concat(entry.import) : hotImports,
    };
};

const createAgent = (possibleProxyURL?: string) => {
    if (possibleProxyURL) {
        return new ProxyAgent(possibleProxyURL);
    }
    return undefined;
};

interface ProxyOptions {
    https: boolean;
    prefixes: string[];
    rewrite: Record<string, string>;
    targetDomain: string;
}

export const constructProxyConfiguration = (options: ProxyOptions) => {
    const {https, prefixes, rewrite, targetDomain} = options;
    const agent = createAgent(process.env[https ? 'https_proxy' : 'http_proxy']);
    const rules = [
        ...Object.entries(rewrite),
        ...prefixes.map(path => [path, `${targetDomain}/${path}`]),
    ];
    const proxy = rules.reduce(
        (proxy, [prefix, target]) => {
            const parsedURL = new URL(`${https ? 'https' : 'http'}://${target}`);
            proxy[prefix] = {
                agent,
                target: `${parsedURL.protocol}//${parsedURL.hostname}${parsedURL.port ? ':' + parsedURL.port : ''}`,
                pathRewrite: {
                    [`^${prefix}`]: parsedURL.pathname.replace(/^\//, ''),
                },
                changeOrigin: true,
            };
            return proxy;
        },
        {} as Record<string, any>
    );
    return proxy;
};

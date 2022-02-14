import ProxyAgent from 'proxy-agent';

const createAgent = (possibleProxyURL?: string) => {
    if (possibleProxyURL) {
        return new ProxyAgent(possibleProxyURL);
    }
    return undefined;
};

export interface ProxyOptions {
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

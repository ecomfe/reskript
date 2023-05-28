import escapeStringRegexp from 'escape-string-regexp';
import {ProxyAgent} from 'proxy-agent';

export interface ProxyOptions {
    https: boolean;
    prefixes: string[];
    rewrite: Record<string, string>;
    targetDomain: string;
}

export const constructProxyConfiguration = (options: ProxyOptions) => {
    const {https, prefixes, rewrite, targetDomain} = options;
    const agent = new ProxyAgent();
    const rules = [
        ...Object.entries(rewrite),
        ...prefixes.map(path => [path, `${targetDomain}${path}`]),
    ];
    const proxy = rules.reduce(
        (proxy, [prefix, target]) => {
            // 假设我们要配置`{'/api': 'example.com/gateway'}，那么`/api/list`要变成`example.com/gateway/list`
            const parsedUrl = new URL(/^https?:\/\//.test(target) ? target : `${https ? 'https' : 'http'}://${target}`);
            // 此处的`pathPrefix`就是`/gateway`
            const pathPrefix = parsedUrl.pathname;
            // 这个正则相当于`^\/api`
            const prefixRegExp = new RegExp('^' + escapeStringRegexp(prefix));
            proxy[prefix] = {
                agent,
                target: `${parsedUrl.protocol}//${parsedUrl.hostname}${parsedUrl.port ? ':' + parsedUrl.port : ''}`,
                // 这个用于Webpack
                pathRewrite: {
                    // 这里把`^/api`变成`/gateway`
                    [`^${prefix}`]: pathPrefix,
                },
                // 这个用于Vite
                rewrite: (path: string) => {
                    // 这里把`/api/list`变成`gateway/list`
                    return pathPrefix + path.replace(prefixRegExp, '');
                },
                changeOrigin: true,
            };
            return proxy;
        },
        {} as Record<string, any>
    );
    return proxy;
};

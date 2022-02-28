import {Middleware, MiddlewareHook} from '@reskript/settings';

interface MiddlewareInternal {
    path: string;
    middleware: Middleware;
}

interface MiddlewareHookInternal extends MiddlewareHook {
    items: () => MiddlewareInternal[];
}

type Method = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

export const createMiddlewareHook = (): MiddlewareHookInternal => {
    const container: MiddlewareInternal[] = [];
    const withMethod = (method: Method) => (route: string, fn: Middleware) => {
        const middleware: MiddlewareInternal = {
            path: route,
            middleware: (req, res, next) => {
                if (req.method === method) {
                    fn(req, res, next);
                }
                else {
                    next();
                }
            },
        };
        container.push(middleware);
    };

    return {
        use: (route: string, fn: Middleware) => {
            container.push({path: route, middleware: fn});
        },
        get: withMethod('GET'),
        post: withMethod('POST'),
        put: withMethod('PUT'),
        delete: withMethod('DELETE'),
        patch: withMethod('PATCH'),
        items: () => container,
    };
};

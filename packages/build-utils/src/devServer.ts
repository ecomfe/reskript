import {Middleware, RequestHandler, MiddlewareHook} from '@reskript/settings';

interface MiddlewareHookInternal extends MiddlewareHook {
    items: () => Middleware[];
}

type Method = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

export const createMiddlewareHook = (): MiddlewareHookInternal => {
    const container: Middleware[] = [];
    const withMethod = (method: Method) => (route: string, fn: RequestHandler) => {
        const middleware: Middleware = {
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
        use: (route: string, fn: RequestHandler) => {
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

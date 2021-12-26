import {ExpressApp} from './interface.js';
import setupHTTPService from './http.js';
import setupWebSocket from './socket.js';

export default (app: ExpressApp, componentModulePath: string): void => {
    setupHTTPService(app, componentModulePath);
    setupWebSocket(componentModulePath);
};

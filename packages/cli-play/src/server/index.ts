import {ExpressApp} from './interface';
import setupHTTPService from './http';
import setupWebSocket from './socket';

export default (app: ExpressApp, componentModulePath: string): void => {
    setupHTTPService(app, componentModulePath);
    setupWebSocket(componentModulePath);
};

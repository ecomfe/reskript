import {Application, Router} from 'express';

export interface PortalHelper {
    router: typeof Router;
}

export type SetupPortal = (app: Application, helper: PortalHelper) => Promise<void>;

export interface PortalSettings {
    readonly setup: SetupPortal;
}

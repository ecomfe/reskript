import {Application, Router} from 'express';

export interface PortalHelper {
    router: typeof Router;
}

export type SetupPortal = (app: Application, helper: PortalHelper) => void;

export interface PortalSettings {
    readonly setup: SetupPortal;
}

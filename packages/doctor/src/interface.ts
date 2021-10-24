import {ProjectSettings} from '@reskript/settings';
import {PackageInfo} from '@reskript/core';

export interface DoctorContext {
    cwd: string;
    projectSettings: ProjectSettings;
    packageInfo: PackageInfo;
}

export interface DoctorResult {
    rule: string;
    errors: string[];
    warnings: string[];
}

export type Rule = (context: DoctorContext) => Promise<DoctorResult>;

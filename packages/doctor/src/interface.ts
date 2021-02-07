import {ProjectSettings} from '@reskript/settings';

export interface PackageInfo {
    name: string;
    scripts: Record<string, string>;
    dependencies: Record<string, string>;
    devDependencies: Record<string, string>;
    peerDependencies: Record<string, string>;
}

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

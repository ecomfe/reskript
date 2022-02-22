import {BuildEntry, ProjectSettings} from '@reskript/settings';

export interface EntryLocation {
    cwd: string;
    srcDirectory: string;
    entryDirectory: string;
    only?: string[];
}

interface EntryConfigBase {
    templateData?: Record<string, unknown>;
}

export interface AppEntry<C> {
    readonly file: string;
    readonly name: string;
    readonly template: string;
    readonly config: C & EntryConfigBase;
}

export type TransformConfig<C> = (imported: any, resolved: string | undefined) => C & EntryConfigBase;

export interface ResolveOptions<C> {
    /** 模板文件的后缀名，如`.ejs`或`.html` */
    templateExtension: string;
    /** 默认的模板路径，找不到模板的情况下会使用这个 */
    defaultTemplate: string;
    /** 用户编写的入口配置转换为程序可读的 */
    transformConfig: TransformConfig<C>;
}

export interface EntryOptions<C> extends EntryLocation, ResolveOptions<C> {
}

export interface BuildContext<C, S extends ProjectSettings = ProjectSettings> extends BuildEntry<S> {
    readonly isDefaultTarget: boolean;
    readonly entries: Array<AppEntry<C>>;
}

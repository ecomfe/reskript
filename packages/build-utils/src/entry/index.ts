import path from 'node:path';
import fs from 'node:fs/promises';
import {existsSync} from 'node:fs';
import escapeRegExp from 'escape-string-regexp';
import {logger, pMap, compact} from '@reskript/core';
import {BuildEntry} from '@reskript/settings';
import {resolveEntry} from './resolve.js';
import {AppEntry, EntryLocation, EntryOptions, BuildContext} from './interface.js';

export {AppEntry, EntryLocation, EntryOptions, BuildContext};

export const collectAppEntries = async <C>(options: EntryOptions<C>): Promise<Array<AppEntry<C>>> => {
    const {cwd, srcDirectory, entryDirectory, only, templateExtension, defaultTemplate, transformConfig} = options;
    const directory = path.join(cwd, srcDirectory, entryDirectory);

    if (!existsSync(directory)) {
        logger.error(`No ${srcDirectory}/${entryDirectory} directory found`);
        process.exit(24);
    }

    const files = await fs.readdir(directory);
    const resolveOptions = {
        templateExtension,
        defaultTemplate,
        transformConfig,
        shouldInclude: (name: string) => (only ? only.includes(name) : true),
    };
    const mayBeEntries = await pMap(files, f => resolveEntry<C>(path.resolve(directory, f), resolveOptions));
    return compact(mayBeEntries);
};

export const constructEntryTemplateData = (context: BuildEntry, entry: AppEntry<unknown>): Record<string, unknown> => {
    const settings = context.projectSettings;

    return {
        favicon: settings.build.favicon,
        appContainerId: settings.build.appContainerId,
        mode: context.mode,
        buildVersion: context.buildVersion,
        buildTime: context.buildTime,
        buildTarget: context.buildTarget,
        buildIdentifier: `${context.buildVersion}/${context.buildTarget}@${context.buildTime}`,
        title: settings.build.appTitle,
        ...entry.config.templateData,
    };
};

export const interpolateEntryContent = (html: string, replacements: Record<string, string | undefined>) => {
    return Object.entries(replacements).reduce(
        (html, [key, value]) => (
            value === undefined
                ? html
                : html.replace(new RegExp(`%${escapeRegExp(key)}%`, 'g'), value)
        ),
        html
    );
};

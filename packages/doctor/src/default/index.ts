import path from 'path';
import ora from 'ora';
import logSymbols from 'log-symbols';
import {logger, readPackageConfig} from '@reskript/core';
import {readProjectSettings} from '@reskript/settings';
import {DoctorContext, DoctorResult} from '../interface.js';
import entry from './entry.js';
import version from './version.js';
import peerDependencies from './peerDependency.js';

const rules = [entry, version, peerDependencies];

const formatDirectory = (packageDirectory: string) => {
    const relative = path.relative(process.cwd(), packageDirectory);

    if (!relative) {
        return 'current directory';
    }

    return relative.startsWith('.') ? packageDirectory : relative;
};

const aggregateResult = (results: DoctorResult[]) => {
    const errors = results.reduce((errors, current) => [...errors, ...current.errors], [] as string[]);
    const warnings = results.reduce((warnings, current) => [...warnings, ...current.warnings], [] as string[]);
    return {errors, warnings};
};

export const run = async (packageDirectory: string) => {
    const projectSettings = await readProjectSettings({cwd: packageDirectory}, 'build');
    const packageInfo = await readPackageConfig(packageDirectory);
    const context: DoctorContext = {
        projectSettings,
        packageInfo,
        cwd: packageDirectory,
    };

    const directoryText = formatDirectory(packageDirectory);
    const spinner = ora();
    spinner.start(`Checking ${directoryText}`);

    const results = await Promise.all(rules.map(r => r(context)));

    const {errors, warnings} = aggregateResult(results);
    if (errors.length) {
        spinner.fail(`Oops! There are errors you must fix in ${directoryText}`);
    }
    else if (warnings.length) {
        spinner.warn(`Please take care of some warnings in ${directoryText}`);
    }
    else {
        spinner.succeed(`Everything goes fine in ${directoryText}`);
    }

    for (const error of errors) {
        logger.error(`  ${logSymbols.error} ${error}`, {dedent: false});
    }
    for (const warning of warnings) {
        logger.warn(`  ${logSymbols.warning} ${warning}`, {dedent: false});
    }
};

import path from 'path';
import fs from 'fs';
import ora from 'ora';
import chalk from 'chalk';
import logSymbols from 'log-symbols';
import {readProjectSettings} from '@reskript/settings';
import {DoctorContext, DoctorResult} from '../interface';
import entry from './entry';
import version from './version';
import peerDependencies from './peerDependency';

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

export default async (packageDirectory: string) => {
    const context: DoctorContext = {
        cwd: packageDirectory,
        projectSettings: readProjectSettings({cwd: packageDirectory}, 'build'),
        packageInfo: JSON.parse(fs.readFileSync(path.join(packageDirectory, 'package.json'), 'utf-8')),
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
        spinner.succeed(`Everything goes find in ${directoryText}`);
    }

    for (const error of errors) {
        console.log(chalk.red(`  ${logSymbols.error} ${error}`));
    }
    for (const warning of warnings) {
        console.log(chalk.yellow(`  ${logSymbols.warning} ${warning}`));
    }
};

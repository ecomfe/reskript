import path from 'path';
import fs from 'fs';
import {get, isEqual} from 'lodash';
import chalk from 'chalk';
import {FeatureMatrix} from '@reskript/settings';

const toStringTag = Object.prototype.toString;

const getSchema = (obj: Record<string, any>): Array<[string, string]> => {
    const entries = Object.entries(obj);
    entries.sort(([keyX], [keyY]) => keyX.localeCompare(keyY));

    return entries.map(([key, value]) => [key, toStringTag.call(value)] as [string, string]);
};

export const checkFeatureMatrixSchema = (features: FeatureMatrix): void => {
    const featurePairs = Object.entries(features);
    // 计算每一个feature的结构是不是一样，如果有结构不一样的，则直接报错退出
    const baseSchema = getSchema(featurePairs[0][1]);
    const conflicts = featurePairs.slice(1).reduce(
        (errors, [key, value]) => {
            const currentSchema = getSchema(value);

            if (!isEqual(baseSchema, currentSchema)) {
                return [...errors, key];
            }

            return errors;
        },
        [] as string[]
    );

    if (conflicts.length > 0) {
        console.error(`Build target ${conflicts.join(' & ')} have incompatible feature schema`);
        process.exit(21);
    }
};

export const checkPreCommitHookWhenLintDisabled = (cwd: string): void => {
    if (fs.existsSync(path.join(cwd, '.husky', 'pre-commit'))) {
        return;
    }

    const packageConfig = JSON.parse(fs.readFileSync(path.join(cwd, 'package.json'), 'utf-8'));

    if (!get(packageConfig, ['husky', 'hooks', 'pre-commit'])) {
        const warning = fs.readFileSync(path.join(__dirname, '..', 'assets', 'lint-disabled-warning.txt'), 'utf-8');
        console.warn(chalk.yellowBright(warning));
        process.exit(21);
    }
};

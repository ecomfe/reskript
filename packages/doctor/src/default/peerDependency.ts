import {DoctorResult, Rule} from '../interface.js';

const REQUIRED_PEERS = ['eslint', 'stylelint', 'typescript', 'webpack'];

const rule: Rule = ({packageInfo}) => {
    const result: DoctorResult = {
        rule: 'peer dependencies',
        warnings: [],
        errors: [],
    };

    for (const peer of REQUIRED_PEERS) {
        if (!packageInfo.dependencies?.[peer] && !packageInfo.devDependencies?.[peer]) {
            result.errors.push(`Missing peer dependency ${peer}, please install it.`);
        }
    }

    return Promise.resolve(result);
};

export default rule;

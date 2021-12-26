import {DoctorResult, Rule} from '../interface.js';

const rule: Rule = ({packageInfo}) => {
    const result: DoctorResult = {
        rule: 'reskript versions',
        warnings: [],
        errors: [],
    };

    const dependencies = {
        ...packageInfo.dependencies,
        ...packageInfo.devDependencies,
    };
    const [isVersionIdentical] = Object.entries(dependencies).reduce(
        ([identical, baseVersion], [name, version]) => {
            if (!identical || !name.startsWith('@reskript/')) {
                return [identical, baseVersion];
            }

            return [
                baseVersion ? baseVersion === version : true,
                version,
            ];
        },
        [true, '']
    );
    if (!isVersionIdentical) {
        result.errors.push('Your @reskript/* packages have different versions, they should be in exactly same version');
    }

    return Promise.resolve(result);
};

export default rule;

import fs from 'node:fs';
import path from 'node:path';
import semver from 'semver';

const RESTRICTED_DEPENDENCIES = [
    ['imagemin', '7.x'],
    ['img-loader', '3.x'],
    ['p-reduce', '2.x'],
    ['log-symbols', '4.x'],
    ['@types/webpack-dev-server', '3.11.2'],
];

const checkDependencyFor = restrictedVersionRange => definedVersionRange => {
    if (definedVersionRange) {
        const minVersion = semver.minVersion(definedVersionRange);
        return semver.satisfies(minVersion, restrictedVersionRange);
    }

    return true;
};

const packages = fs.readdirSync('packages');
for (const packageName of packages) {
    const packageContent = fs.readFileSync(path.join('packages', packageName, 'package.json'), 'utf-8');
    const {dependencies = {}, devDependencies = {}} = JSON.parse(packageContent);
    for (const [name, range] of RESTRICTED_DEPENDENCIES) {
        const check = checkDependencyFor(range);
        if (!check(dependencies[name]) || !check(devDependencies[name])) {
            console.error(`Dependency ${name} (installed in ${packageName} does not satisfy restriction ${range})`);
            process.exit(1);
        }
    }
}

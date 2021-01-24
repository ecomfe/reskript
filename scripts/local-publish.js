const path = require('path');
const fs = require('fs');
const semver = require('semver');
const {execSync} = require('child_process');
const {sync: glob} = require('glob');

const folders = glob('./packages/*');
for (const folder of folders) {
    const cwd = path.join(__dirname, '..', folder);
    console.log(`work in ${cwd}`);
    process.chdir(cwd);
    const packageInfo = require(`${cwd}/package.json`);
    console.log(`package name: ${packageInfo.name}`);
    const latest = (() => {
        try {
            const output = execSync(`npm info ${packageInfo.name} version --registry=http://localhost:4873`);
            return output.toString().trim();
        }
        catch (ex) {
            return packageInfo.version;
        }
    })();
    console.log(`latest version: ${latest}`);
    const next = semver.inc(latest, 'patch');
    console.log(`next version: ${next}`);
    const baseInfo = fs.readFileSync(`${cwd}/package.json`, 'utf-8');
    fs.writeFileSync(
        `${cwd}/package.json`,
        JSON.stringify({...packageInfo, publishConfig: {}, version: next}, null, '  '),
        'utf-8'
    );
    try {
        console.log('publish');
        execSync('npm publish --registry=http://localhost:4873');
    }
    finally {
        console.log('rollback package.json');
        fs.writeFileSync(`${cwd}/package.json`, baseInfo);
    }
}

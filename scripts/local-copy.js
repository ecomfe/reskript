// 这个脚本用于把所有的包尝试复制到某个项目里去替换项目安装的包，主要作用是进行本地的测试。
const path = require('path');
const fs = require('fs');
const {execSync} = require('child_process');
const cpy = require('cpy');

const destination = process.argv[2];

if (!destination || !destination.startsWith('/') || destination.includes('node_modules')) {
    console.error('Must specify an absolute path without node_modules');
    process.exit(1);
}

process.chdir(path.join(__dirname, '..'));
console.log('Building...');
execSync('yarn build');

const copy = async package => {
    const target = path.join(destination, 'node_modules', '@reskript', package);
    if (!fs.existsSync(target)) {
        return;
    }

    const {files} = JSON.parse(fs.readFileSync(`packages/${package}/package.json`, 'utf-8'));

    if (files) {
        await cpy(
            [...files, 'package.json'],
            target,
            {cwd: path.resolve(`packages/${package}`), parents: true}
        );
    }
    else {
        await cpy(`packages/${package}/**`, target);
    }

    console.log(`Copied ${package}`);
}

(async () => {
    const packages = fs.readdirSync('packages');
    for (const package of packages) {
        await copy(package);
    }

    fs.chmodSync(`${destination}/node_modules/.bin/skr`, 0o755);
})();

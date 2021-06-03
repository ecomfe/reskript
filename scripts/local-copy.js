// 这个脚本用于把所有的包尝试复制到某个项目里去替换项目安装的包，主要作用是进行本地的测试。
//
// 使用方法：
//
// ```
// node scripts/local-copy.js [--no-build] [--copy-all] -- path-to-project
// ```
//
// 以下参数可选：
//
// - `--no-build`：默认在复制以前会做一次构建，用该参数可以跳过构建直接复制，连续做测试的时候可能有用
// - `--copy-all`：默认只覆盖目标项目中安装过的`@reskript/*`包，用该参数可以把所有的包复制过去，可以用来测新开发的包
const path = require('path');
const fs = require('fs');
const {execSync} = require('child_process');
const cpy = require('cpy');
const yargs = require('yargs/yargs')
const {hideBin} = require('yargs/helpers')

const argv = yargs(hideBin(process.argv)).argv
const [destination] = argv._;

if (!destination || !destination.startsWith('/') || destination.includes('node_modules')) {
    console.error('Must specify an absolute path without node_modules');
    process.exit(1);
}

process.chdir(path.join(__dirname, '..'));

if (!argv.noBuild) {
    console.log('Building...');
    execSync('yarn build');
}

const copy = async package => {
    const target = path.join(destination, 'node_modules', '@reskript', package);
    if (!argv.copyAll && !fs.existsSync(target)) {
        return;
    }

    fs.mkdirSync(target, {recursive: true});
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

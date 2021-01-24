const path = require('path');
const fs = require('fs');
const babel = require('@babel/core');
const glob = require('glob');

const {default: addDisplayNamePlugin} = require('../index');

const transformAndSnapshot = (description, inputCode, filename, test) => test(
    description,
    () => {
        const output = babel.transformSync(
            inputCode,
            {
                filename,
                presets: [
                    // eslint-disable-next-line global-require
                    require('@babel/preset-typescript'),
                    // eslint-disable-next-line global-require
                    require('@babel/preset-react'),
                ],
                plugins: [
                    addDisplayNamePlugin,
                    // eslint-disable-next-line global-require
                    require('@babel/plugin-proposal-class-properties'),
                ],
            }
        );

        expect(output.code).toMatchSnapshot();
    }
);

const createRunner = (describe, test) => suite => describe(
    path.basename(suite).replace(/-/g, ' '),
    () => {
        const fixtures = glob.sync(`${__dirname}/fixtures/${suite}/**/*.{js,tsx}`);
        for (const fixture of fixtures) {
            const code = fs.readFileSync(fixture, 'utf-8');
            const description = code.split('\n')[0].substring(3);
            transformAndSnapshot(description, code, fixture, test);
        }
    }
);

const runSuite = createRunner(describe, test);

runSuite.x = createRunner(xdescribe, xtest);

module.exports = runSuite;

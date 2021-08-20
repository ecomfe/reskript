import {createTestRunner} from '@reskript/babel-utils';
import plugin from '../index';

const runSuite = createTestRunner(
    __dirname,
    {test, expect},
    {
        presets: [
            '@babel/preset-react',
        ],
        plugins: [plugin],
    }
);

runSuite();

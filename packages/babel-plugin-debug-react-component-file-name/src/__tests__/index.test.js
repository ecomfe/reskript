import path from 'path';
import {createTestRunner} from '@reskript/babel-utils';
import plugin from '../index';

const runSuite = createTestRunner(
    __dirname,
    {test, expect},
    {
        plugins: [
            [
                plugin,
                {srcDirectory: path.resolve(__dirname, 'fixtures', 'src')},
            ],
        ],
    }
);

runSuite();

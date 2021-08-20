import {createTestRunner} from '../testRunner';
import plugin from './plugin';

const runSuite = createTestRunner(
    __dirname,
    {test, expect},
    {
        plugins: [plugin],
    }
);

runSuite('import-react');

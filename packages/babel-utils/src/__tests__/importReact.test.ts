import {test, expect} from 'vitest';
import {dirFromImportMeta} from '@reskript/core';
import {createTestRunner} from '../testRunner';
import plugin from './plugin';

const runSuite = createTestRunner(
    dirFromImportMeta(import.meta.url),
    {test, expect},
    {
        plugins: [plugin],
    }
);

runSuite('import-react');

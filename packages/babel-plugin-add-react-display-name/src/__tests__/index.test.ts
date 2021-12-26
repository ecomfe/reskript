import {test, expect} from 'vitest';
import {dirFromImportMeta} from '@reskript/core';
import {createTestRunner} from '@reskript/babel-utils';
import plugin from '../index';

const runSuite = createTestRunner(
    dirFromImportMeta(import.meta.url),
    {test, expect},
    {
        presets: [
            '@babel/preset-react',
        ],
        plugins: [plugin],
    }
);

runSuite();

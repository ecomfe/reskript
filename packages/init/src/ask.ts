import {prompt, QuestionCollection} from 'inquirer';
import {UserOptions} from './interface.js';

const questions: QuestionCollection<UserOptions> = [
    {
        name: 'packageManager',
        message: 'Choose your package manager',
        type: 'list',
        choices: ['npm', 'yarn', 'pnpm'],
    },
    {
        name: 'packageName',
        message: 'Enter your package name, this will be set to package.json',
        type: 'input',
        validate: (value: string) => !!value.length,
    },
    {
        name: 'appTitle',
        message: 'Enter your application title in browser tab',
        type: 'input',
        validate: (value: string) => !!value.length,
    },
    {
        name: 'gerrit',
        message: 'Are you developing on Gerrit which creates a Change-Id line in your commit',
        type: 'confirm',
    },
    {
        name: 'devServerPort',
        message: 'Choose a port for dev server',
        type: 'number',
        default: 8788,
        validate: (value: number) => !!value,
    },
    {
        name: 'tasks',
        message: 'Select tasks you involve in your project',
        type: 'checkbox',
        multiple: true,
        choices: [
            {message: 'Unit test with jest', value: 'test'},
            {message: 'Debug a single component inside project', value: 'play'},
        ],
    },
];

export default () => prompt<UserOptions>(questions);

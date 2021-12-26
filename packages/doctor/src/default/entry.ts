import path from 'path';
import {existsSync} from 'fs';
import fs from 'fs/promises';
import {DoctorResult, Rule} from '../interface.js';

const isEntryDirectoryValid = async (entryDirectory: string) => {
    if (!existsSync(entryDirectory)) {
        return false;
    }

    const stat = await fs.stat(entryDirectory);
    return stat.isDirectory();
};

const rule: Rule = async ({cwd}) => {
    const result: DoctorResult = {
        rule: 'project structure',
        warnings: [],
        errors: [],
    };

    const entryDirectory = path.join(cwd, 'src', 'entries');
    const validEntryDirectory = await isEntryDirectoryValid(entryDirectory);
    if (!validEntryDirectory) {
        result.errors.push('Missing src/entries directory, this directory should contain app entry.');
    }

    return Promise.resolve(result);
};

export default rule;

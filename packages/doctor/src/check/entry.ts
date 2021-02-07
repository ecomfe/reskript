import path from 'path';
import fs from 'fs';
import {DoctorResult, Rule} from '../interface';

const rule: Rule = ({cwd}) => {
    const result: DoctorResult = {
        rule: 'project structure',
        warnings: [],
        errors: [],
    };

    const entryDirectory = path.join(cwd, 'src', 'entries');
    const validEntryDirectory = fs.existsSync(entryDirectory) && fs.statSync(entryDirectory).isDirectory();
    if (!validEntryDirectory) {
        result.errors.push('Missing src/entries directory, this directory should contain app entry.');
    }

    return Promise.resolve(result);
};

export default rule;

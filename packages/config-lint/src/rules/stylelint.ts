import {sync as resolve} from 'resolve';
import lessSyntax from 'postcss-less';

const config: Record<string, any> = {
    extends: resolve('@ecomfe/stylelint-config'),
    overrides: [
        {
            files: ['**/*.less'],
            customSyntax: lessSyntax,
        },
    ],
};

export default config;

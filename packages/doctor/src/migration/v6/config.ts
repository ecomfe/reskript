import {warn} from '../logger.js';
import {importClientSettings, requireClientConfigIfExists} from '../utils.js';

const stylisticRuleNames = [
    'at-rule-name-case',
    'at-rule-name-newline-after',
    'at-rule-name-space-after',
    'at-rule-semicolon-newline-after',
    'at-rule-semicolon-space-before',
    'block-closing-brace-empty-line-before',
    'block-closing-brace-newline-after',
    'block-closing-brace-newline-before',
    'block-closing-brace-space-after',
    'block-closing-brace-space-before',
    'block-opening-brace-newline-after',
    'block-opening-brace-newline-before',
    'block-opening-brace-space-after',
    'block-opening-brace-space-before',
    'color-hex-case',
    'declaration-bang-space-after',
    'declaration-bang-space-before',
    'declaration-block-semicolon-newline-after',
    'declaration-block-semicolon-newline-before',
    'declaration-block-semicolon-space-after',
    'declaration-block-semicolon-space-before',
    'declaration-block-trailing-semicolon',
    'declaration-colon-newline-after',
    'declaration-colon-space-after',
    'declaration-colon-space-before',
    'function-comma-newline-after',
    'function-comma-newline-before',
    'function-comma-space-after',
    'function-comma-space-before',
    'function-max-empty-lines',
    'function-parentheses-newline-inside',
    'function-parentheses-space-inside',
    'function-whitespace-after',
    'indentation',
    'linebreaks',
    'max-empty-lines',
    'max-line-length',
    'media-feature-colon-space-after',
    'media-feature-colon-space-before',
    'media-feature-name-case',
    'media-feature-parentheses-space-inside',
    'media-feature-range-operator-space-after',
    'media-feature-range-operator-space-before',
    'media-query-list-comma-newline-after',
    'media-query-list-comma-newline-before',
    'media-query-list-comma-space-after',
    'media-query-list-comma-space-before',
    'no-empty-first-line',
    'no-eol-whitespace',
    'no-extra-semicolons',
    'no-missing-end-of-source-newline',
    'number-leading-zero',
    'number-no-trailing-zeros',
    'property-case',
    'selector-attribute-brackets-space-inside',
    'selector-attribute-operator-space-after',
    'selector-attribute-operator-space-before',
    'selector-combinator-space-after',
    'selector-combinator-space-before',
    'selector-descendant-combinator-no-non-space',
    'selector-list-comma-newline-after',
    'selector-list-comma-newline-before',
    'selector-list-comma-space-after',
    'selector-list-comma-space-before',
    'selector-max-empty-lines',
    'selector-pseudo-class-case',
    'selector-pseudo-class-parentheses-space-inside',
    'selector-pseudo-element-case',
    'string-quotes',
    'unicode-bom',
    'unit-case',
    'value-list-comma-newline-after',
    'value-list-comma-newline-before',
    'value-list-comma-space-after',
    'value-list-comma-space-before',
    'value-list-max-empty-lines',
];

// eslint-disable-next-line @typescript-eslint/ban-types
const finalizeUsesPublicPath = (finalize: Function | undefined) => {
    const content = finalize?.toString() ?? '';
    return content.includes('publicPath') && content.includes('/assets');
};

// eslint-disable-next-line complexity
export default async (cwd: string) => {
    const settings = await importClientSettings(cwd);

    if (!settings) {
        return;
    }

    if (settings.build?.publicPath?.endsWith('/assets') || finalizeUsesPublicPath(settings.build?.finalize)) {
        warn(
            'your publicPath no longer needs to end with "/assets", please remove it from config',
            'see: https://reskript.dev/docs/migration/v6#Webpack产出结构升级'
        );
    }

    const [stylelintConfigFile, stylelintConfig] = await requireClientConfigIfExists(cwd, 'stylelint');

    if (stylelintConfigFile) {
        if (stylelintConfig) {
            const hasStylisticRule = stylelintConfig.rules?.some((v: string) => stylisticRuleNames.includes(v));
            if (hasStylisticRule) {
                warn(
                    `your ${stylelintConfigFile} uses some stylistic rules, please migrate them`,
                    'see: https://reskript.dev/docs/migration/v6#工具版本更新'
                );
            }
        }
        else {
            warn(
                `unable to read ${stylelintConfigFile}, please migrate stylistic rule name inside it`,
                'see: https://reskript.dev/docs/migration/v6#工具版本更新'
            );
        }
    }
};

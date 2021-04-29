const builtins = require('builtins');

const BUILTIN_MODULES = new Set(builtins());

const BASE_PRIORITY = {
    native: 0,
    package: 100,
    alias: 200,
    relative: 300,
};

const RELATIVE_HINT = '..';

const importSourceType = name => {
    if (BUILTIN_MODULES.has(name)) {
        return 'native';
    }
    if (name.startsWith('.')) {
        return 'relative';
    }
    if (name.startsWith('@/')) {
        return 'alias';
    }

    return 'package';
};

const sortImportsFix = (context, imports) => {
    const sourceCode = context.getSourceCode();
    const sortedImports = [...imports].sort((a, b) => a.priority - b.priority);

    return fixer => {
        return imports.map(({node}, index) => {
            const text = sourceCode.getText(sortedImports[index].node);
            return fixer.replaceTextRange(node.range, text);
        });
    };
};

const relativeLevelCount = (path, startIndex = 0, totalCount = 0) => {
    if (path.substr(startIndex, RELATIVE_HINT.length) === RELATIVE_HINT) {
        return relativeLevelCount(path, startIndex + RELATIVE_HINT.length, totalCount - 1);
    }

    return totalCount;
};

const importSourcePriority = name => {
    const type = importSourceType(name);
    const priority = BASE_PRIORITY[type];

    return type === 'relative' ? priority + relativeLevelCount(name) : priority;
};

const reportOutOfOrder = (context, imports) => {
    let currentMax = -1;
    for (const {priority, node, source} of imports) {
        if (priority >= currentMax) {
            currentMax = priority;
            continue;
        }

        const firstPriorImport = imports.find(i => i.priority > priority);
        const error = {
            node,
            message: `Import of ${source} should be placed before ${firstPriorImport.source}`,
            fix: sortImportsFix(context, imports),
        };
        context.report(error);
    }
};

module.exports = {
    meta: {
        type: 'layout',
        fixable: 'whitespace',
        docs: {
            description: 'Enforce a convention in the order of statements',
            category: 'reskript',
            recommended: false,
            url: 'https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/order.md',
        },
    },
    create(context) {
        const foundImports = [];

        return {
            ImportDeclaration(node) {
                const source = node.source.value;
                const priority = importSourcePriority(source);
                foundImports.push({source, priority, node});
            },
            'Program:exit'() {
                reportOutOfOrder(context, foundImports);
            },
        };
    },
};

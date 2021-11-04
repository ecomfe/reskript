const builtins = require('builtins');

const BUILTIN_MODULES = builtins();

const BASE_PRIORITY = {
    node: 0,
    native: 100,
    package: 200,
    local: 300,
    alias: 400,
    relative: 500,
};

const RELATIVE_HINT = '..';

const isLocalPackage = (declaredPackageNames, currentPackageName) => {
    const isMatchLocal = pattern => {
        if (pattern[pattern.length - 1] === '*') {
            return currentPackageName.startsWith(pattern.slice(0, -1));
        }
        return currentPackageName === pattern || currentPackageName.startsWith(pattern + '/');
    };

    return declaredPackageNames.some(isMatchLocal);
};

const importSourceType = (name, {localPackageNames}) => {
    if (BUILTIN_MODULES.some(v => v === name || name.startsWith(v + '/'))) {
        return 'native';
    }
    if (name.startsWith('node:')) {
        return 'node';
    }
    if (name.startsWith('.')) {
        return 'relative';
    }
    if (name.startsWith('@/')) {
        return 'alias';
    }
    if (isLocalPackage(localPackageNames, name)) {
        return 'local';
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

const importSourcePriority = (name, options) => {
    const type = importSourceType(name, options);
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
            recommended: false,
            url: 'https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/order.md',
        },
    },
    create(context) {
        const localPackageNames = context.settings.localPackageNames || [];
        const foundImports = [];

        return {
            ImportDeclaration(node) {
                const source = node.source.value;
                const priority = importSourcePriority(source, {localPackageNames});
                foundImports.push({source, priority, node});
            },
            'Program:exit'() {
                reportOutOfOrder(context, foundImports);
            },
        };
    },
};

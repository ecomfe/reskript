import {basename, dirname, extname, sep} from 'path';
import * as babel from '@babel/core';
import {NodePath, Node} from '@babel/traverse';
import {last, get, compact, flatMap} from 'lodash';

type ClassExpression = babel.types.ClassExpression;
type ClassDeclaration = babel.types.ClassDeclaration;
type FunctionExpression = babel.types.FunctionExpression;
type ArrowFunctionExpression = babel.types.ArrowFunctionExpression;
type FunctionDeclaration = babel.types.FunctionDeclaration;
type ImportDeclaration = babel.types.ImportDeclaration;
type Program = babel.types.Program;
type Identifier = babel.types.Identifier;
type StringLiteral = babel.types.StringLiteral;

interface ImportNames {
    readonly defaults: Set<string>;
    readonly named: Set<string>;
}

type PossibleComponentName = ['error', null] | ['named' | 'module' | 'assignment' | 'declare', string];

type ClassPath = NodePath<ClassExpression> | NodePath<ClassDeclaration>;

type FunctionPath = NodePath<FunctionExpression> | NodePath<ArrowFunctionExpression> | NodePath<FunctionDeclaration>;

type ComponentPath = ClassPath | FunctionPath;

const getDefaultImportLocalName = (node?: ImportDeclaration): string | null => {
    if (!node) {
        return null;
    }

    return get(
        node.specifiers.find(n => n.type === 'ImportDefaultSpecifier' || n.type === 'ImportNamespaceSpecifier'),
        ['local', 'name'],
        null
    );
};

const getImportedName = (imported: Identifier | StringLiteral): string => (
    imported.type === 'Identifier' ? imported.name : imported.value
);

const getNamedImportLocalName = (importedName: string, node?: ImportDeclaration): string | null => {
    if (!node) {
        return null;
    }

    return get(
        node.specifiers.find(n => n.type === 'ImportSpecifier' && getImportedName(n.imported) === importedName),
        ['local', 'name'],
        null
    );
};

const REACT_BASE_CLASS_NAMES = ['Component', 'PureComponent'];

const findReactImportNames = (path: ClassPath): ImportNames => {
    const program = path.parentPath.find(n => n.type === 'Program') as NodePath<Program>;
    const imports = program.node.body.filter(n => n.type === 'ImportDeclaration') as ImportDeclaration[];
    // 是有可能存在多个`react`的引入的，特别是有类似`babel-plugin-react-require`这种插件增加代码的情况下
    const reactImports = imports.filter(n => n.source.value === 'react');
    const defaults = compact(reactImports.map(getDefaultImportLocalName));
    const named = compact(
        flatMap(
            reactImports,
            importNode => REACT_BASE_CLASS_NAMES.map(name => getNamedImportLocalName(name, importNode))
        )
    );
    return {
        defaults: new Set(defaults),
        named: new Set(named),
    };
};

export const isExpressionContextElligible = ({node, parentPath}: ComponentPath): boolean => {
    if (node.type === 'ArrowFunctionExpression' && parentPath.node.type === 'ExportDefaultDeclaration') {
        return true;
    }

    if (parentPath.node.type === 'VariableDeclarator') {
        return true;
    }

    if (parentPath.node.type !== 'AssignmentExpression') {
        return false;
    }

    return parentPath.parentPath.node.type === 'ExpressionStatement';
};

export const isClassDefinitionElligible = (path: ClassPath): boolean => {
    const {node: {superClass}} = path;

    if (!superClass) {
        return false;
    }

    const reactImportNames = findReactImportNames(path);

    if (superClass.type === 'Identifier') {
        return reactImportNames.named.has(superClass.name);
    }
    if (superClass.type === 'MemberExpression') {
        const object = superClass.object as Identifier;
        const objectName = object.name;
        const propertyName = (superClass.property as Identifier).name;
        return reactImportNames.defaults.has(objectName) && REACT_BASE_CLASS_NAMES.includes(propertyName);
    }
    return false;
};

const validExpressionHead = (path: NodePath): boolean => {
    return path.isAssignmentExpression() || path.isVariableDeclarator() || path.isStatement();
};

// eslint-disable-next-line complexity
const resolvePossibleComponentName = (path: ComponentPath, filename: string): PossibleComponentName => {
    const nodeWithID = path.node as {id: {name: string}};
    if (nodeWithID.id) {
        return ['named', nodeWithID.id.name];
    }

    // 函数和类声明一定是有名字的，没名字的只能是表达式，有几种情况：
    //
    // 1. 变量声明，取变量名
    // 2. 对象赋值，取被赋值的对象或属性的名称
    // 3. 默认导出匿名函数或类，按照文件路径来猜名字

    if (path.parentPath.node.type === 'ExportDefaultDeclaration') {
        /* istanbul ignore next */
        if (!filename) {
            return ['module', 'Unknown'];
        }

        const file = basename(filename, extname(filename));
        return [
            'module',
            file === 'index' ? last(dirname(filename).split(sep)) as string : file,
        ];
    }

    const validHead = path.find(validExpressionHead);

    /* istanbul ignore next */
    if (!validHead) {
        return ['error', null];
    }

    if (validHead.isAssignmentExpression()) {
        const {node: {left}} = validHead;
        switch (left.type) {
            case 'Identifier':
                return ['assignment', left.name];
            case 'MemberExpression':
                return ['assignment', (left.property as Identifier).name];
            /* istanbul ignore next */
            default:
                throw new Error(`Unexpected assignment expression in ${filename}`);
        }
    }

    /* istanbul ignore else */
    if (validHead.isVariableDeclarator() && validHead.node.id.type === 'Identifier') {
        return ['declare', validHead.node.id.name];
    }

    /* istanbul ignore next */
    return ['error', null];
};

export const isFunctionDefinitionElligible = (path: FunctionPath, filename: string): boolean => {
    const {node: {params}} = path;

    // 组件最多只能有1个参数
    if (params.length > 1) {
        return false;
    }

    const [nameType, functionName] = resolvePossibleComponentName(path, filename);
    return nameType !== 'error' && /^[A-Z]/.test(functionName as string);
};

// eslint-disable-next-line complexity
const computeDisplayNameAssignmentLeft = (node: Node, path: ComponentPath, filename: string): Identifier => {
    if (node.type === 'VariableDeclaration') {
        return node.declarations[0].id as Identifier;
    }
    if (node.type === 'FunctionDeclaration' || node.type === 'ClassDeclaration') {
        return node.id as Identifier;
    }
    if (node.type === 'ExpressionStatement' && node.expression.type === 'AssignmentExpression') {
        return node.expression.left as Identifier;
    }
    if (node.type === 'ExportNamedDeclaration' && node.declaration) {
        return computeDisplayNameAssignmentLeft(node.declaration, path, filename);
    }
    if (node.type === 'ExportDefaultDeclaration' && node.declaration.type === 'Identifier') {
        return node.declaration;
    }

    const nodeWithID = path.node as {id: Identifier};
    /* istanbul ignore else */
    if (nodeWithID.id) {
        return nodeWithID.id;
    }

    /* istanbul ignore next */
    throw new Error(`Unexpected block statement of type ${node.type} in ${filename}`);
};

const replaceDefaultExportWithAssignable = (path: ComponentPath, types: typeof babel.types, name: string): NodePath => {
    if (path.node.type === 'ArrowFunctionExpression') {
        // export default () => {}
        // 由于默认导出的箭头函数不能加名称，所以要先变成一个变量定义再导出去
        const autoNameIdentifier = path.parentPath.scope.generateUidIdentifier(name);
        const variableDeclaration = types.variableDeclaration(
            'const',
            [
                types.variableDeclarator(
                    autoNameIdentifier,
                    types.cloneDeep(path.node)
                ),
            ]
        );
        const [inserted] = path.parentPath.insertBefore(variableDeclaration);
        path.parentPath.scope.registerDeclaration(inserted as NodePath<Node>);
        path.parentPath.replaceWith(types.exportDefaultDeclaration(autoNameIdentifier));
        return path.parentPath;
    }

    // export default function () {}
    // export default class {}
    const id = path.scope.generateUidIdentifier(name);
    const nodeWithID = path.node as ClassDeclaration | FunctionDeclaration;
    nodeWithID.id = id;
    return path as NodePath;
};

export const insertDisplayNameAfter = (path: ComponentPath, types: typeof babel.types, filename: string): void => {
    const [nameType, componentName] = resolvePossibleComponentName(path, filename);

    /* istanbul ignore next */
    if (nameType === 'error') {
        throw new Error(`Cannot resolve component display name from node of type ${path.node.type}`);
    }

    const exportDeclarationPath = nameType === 'module'
        ? replaceDefaultExportWithAssignable(path, types, componentName as string)
        : path;

    const blockStatement = exportDeclarationPath.find(path => path.parentPath.isBlock());

    /* istanbul ignore next */
    if (!blockStatement) {
        return;
    }

    const {expressionStatement, assignmentExpression, memberExpression, identifier, stringLiteral} = types;
    const displayNameStatement = expressionStatement(
        assignmentExpression(
            '=',
            memberExpression(
                computeDisplayNameAssignmentLeft(blockStatement.node, path, filename),
                identifier('displayName')
            ),
            stringLiteral(componentName as string)
        )
    );

    blockStatement.insertAfter(displayNameStatement);
};

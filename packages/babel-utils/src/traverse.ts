import {NodePath} from '@babel/traverse';
import {types} from '@babel/core';

export const findParentProgram = (current: NodePath): NodePath<types.Program> | null => {
    const program = current.findParent(v => v.isProgram());
    return program ? program as NodePath<types.Program> : null;
};

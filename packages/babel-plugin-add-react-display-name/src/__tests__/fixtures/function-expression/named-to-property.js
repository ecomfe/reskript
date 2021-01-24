// named function assigned to object property
/* eslint-disable */
import {Component} from 'react';

const global = {
    namespace: {}
};
global.namespace.Foo = function Bar() {
    return <div />;
};

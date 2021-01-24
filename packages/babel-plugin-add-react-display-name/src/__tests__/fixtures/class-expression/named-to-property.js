// named class assigned to object property
/* eslint-disable */
import {Component} from 'react';

const global = {
    namespace: {}
};
global.namespace.Foo = class Bar extends Component {
    render() {
        return <div />;
    }
}

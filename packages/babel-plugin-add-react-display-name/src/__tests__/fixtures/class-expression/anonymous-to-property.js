// anonymous class assigned to object property
/* eslint-disable */
import {Component} from 'react';

const global = {
    namespace: {}
};
global.namespace.Foo = class extends Component {
    render() {
        return <div />;
    }
}

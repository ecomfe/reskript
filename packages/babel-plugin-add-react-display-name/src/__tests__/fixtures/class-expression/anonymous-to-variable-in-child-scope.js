// nested in child scope as a variable
/* eslint-disable */
import {Component} from 'react';

const factory = () => {
    const Foo = class extends Component {
        render() {
            return <div />;
        }
    };

    return Foo;
};

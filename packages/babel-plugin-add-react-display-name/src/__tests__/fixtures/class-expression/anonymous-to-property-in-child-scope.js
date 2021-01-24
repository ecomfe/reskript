// nested in child scope as an assignment
/* eslint-disable */
import {Component} from 'react';

const initialize = () => {
    window.Foo = class extends Component {
        render() {
            return <div />;
        }
    };
};

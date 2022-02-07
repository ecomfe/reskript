import {Component} from 'react';

export default class Foo extends Component {
    renderTitle = () => {
        return <h2>Title</h2>
    }

    render() {
        return (
            <>
                {this.renderTitle()}
                <p>Hello World</p>
            </>
        );
    }
}

import {Component, ComponentType, StrictMode} from 'react';

interface RenderProps {
    target: ComponentType;
}

interface RenderState {
    error: string;
}

export default class Render extends Component<RenderProps, RenderState> {
    state = {error: ''};

    componentDidCatch(error: Error) {
        this.setState({error: error.message});
    }

    render() {
        const {error} = this.state;
        const {target: Component} = this.props;

        if (error) {
            return <pre style={{color: 'red'}}>{error}</pre>;
        }

        return (
            <StrictMode>
                <Component />
            </StrictMode>
        );
    }
}

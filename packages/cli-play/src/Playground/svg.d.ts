declare module '*.svg?react' {
    import {SVGAttributes, ComponentType, RefAttributes} from 'react';

    const Component: ComponentType<SVGAttributes<SVGElement> & RefAttributes<SVGElement>>;
    export default Component;
}

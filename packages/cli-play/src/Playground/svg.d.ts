declare module '*.svg?react' {
    import {ComponentType, SVGAttributes} from 'react';

    export type SVGComponent = ComponentType<SVGAttributes<SVGElement>>;

    declare const Component: SVGComponent;
    export default Component;
}

declare module '*.svg?react' {
    import {ComponentType, SVGAttributes} from 'react';

    declare const ReactComponent: ComponentType<SVGAttributes<SVGElement>>;
    export default ReactComponent;
}

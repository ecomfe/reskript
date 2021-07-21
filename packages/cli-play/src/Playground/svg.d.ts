declare module '*.svg' {
    import {ComponentType, SVGAttributes} from 'react';

    export const ReactComponent: ComponentType<SVGAttributes<SVGElement>>;
}

declare module '*.less' {
    const content: {
        [className: string]: string;
        (...names: Array<string | null | undefined | {[key: string]: string | boolean | undefined}>): string;
    };
    export default content;
}

declare module '*.css' {
    const content: {
        [className: string]: string;
        (...names: Array<string | null | undefined | {[key: string]: string | boolean | undefined}>): string;
    };
    export default content;
}

declare module '*.svg?react' {
    import {SVGAttributes, ComponentType, RefAttributes} from 'react';

    const Component: ComponentType<SVGAttributes<SVGElement> & RefAttributes<SVGElement>>;
    export default Component;
}

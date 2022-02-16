declare module '*.less' {
    const content: {
        [className: string]: string;
        (...names: Array<string | null | undefined | {[key: string]: string | boolean | undefined}>): string;
    };
    export default content;
}

// 图片资源
declare module '*.jpg' {
    const src: string;
    export default src;
}

declare module '*.jpeg' {
    const src: string;
    export default src;
}

declare module '*.png' {
    const src: string;
    export default src;
}

declare module '*.gif' {
    const src: string;
    export default src;
}

declare module '*.svg' {
    const src: string;
    export default src;
}

declare module '*.ico' {
    const src: string;
    export default src;
}

declare module '*.webp' {
    const src: string;
    export default src;
}

declare module '*.avif' {
    const src: string;
    export default src;
}

// 字体
declare module '*.woff' {
    const src: string;
    export default src;
}

declare module '*.woff2' {
    const src: string;
    export default src;
}

declare module '*.eot' {
    const src: string;
    export default src;
}

declare module '*.ttf' {
    const src: string;
    export default src;
}

declare module '*.otf' {
    const src: string;
    export default src;
}

// Worker
declare module '*?worker' {
    // From https://github.com/vitejs/vite/blob/3311686bbcc12481495374c58cd1bc054d2429b8/packages/vite/client.d.ts
    const worker: {
        new(): Worker
    };
    export default worker;
}

// SVG组件
declare module '*.svg?react' {
    import {SVGAttributes, ComponentType, RefAttributes} from 'react';

    const Component: ComponentType<SVGAttributes<SVGElement> & RefAttributes<SVGElement>>;
    export default Component;
}

// 全局替换
interface ReskriptGlobal {
    features: Record<string, unknown>;
    build: {version: string, time: string, target: string};
}

declare const skr: ReskriptGlobal;

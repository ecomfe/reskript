import {resolve} from '@reskript/core';
import {LoaderFactory} from '../interface.js';

const factory: LoaderFactory = async () => {
    return {
        loader: await resolve('svgo-loader'),
        options: {
            // 取了一个相对安全的插件集合
            plugins: [
                {name: 'removeDoctype'},
                {name: 'removeXMLProcInst'},
                {name: 'removeComments'},
                {name: 'removeMetadata'},
                {name: 'removeEditorsNSData'},
                {name: 'cleanupAttrs'},
                {name: 'minifyStyles'},
                {name: 'convertStyleToAttrs'},
                {name: 'cleanupIDs'},
                {name: 'removeEmptyText'},
                {name: 'removeEmptyContainers'},
                {name: 'convertColors'},
                {name: 'convertTransform'},
                {name: 'removeUselessStrokeAndFill'},
                {name: 'cleanupNumericValues'},
            ],
        },
    };
};

export default factory;

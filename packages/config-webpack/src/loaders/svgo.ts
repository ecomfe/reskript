import {sync as resolve} from 'resolve';
import {LoaderFactory} from '../interface';

const factory: LoaderFactory = () => {
    return {
        loader: resolve('svgo-loader'),
        options: {
            // 取了一个相对安全的插件集合
            plugins: [
                {removeDoctype: true},
                {removeXMLProcInst: true},
                {removeComments: true},
                {removeMetadata: true},
                {removeEditorsNSData: true},
                {cleanupAttrs: true},
                {minifyStyles: true},
                {convertStyleToAttrs: true},
                {cleanupIDs: true},
                {removeEmptyText: true},
                {removeEmptyContainers: true},
                {convertColors: true},
                {convertTransform: true},
                {removeUselessStrokeAndFill: true},
                {cleanupNumericValues: true},
            ],
        },
    };
};

export default factory;

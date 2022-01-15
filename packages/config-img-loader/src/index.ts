import resolve from 'resolve';
import {RuleSetUseItem} from 'webpack';
import gif from 'imagemin-gifsicle';
import jpeg from 'imagemin-mozjpeg';
import png from 'imagemin-optipng';

const pluginOptions = {
    gifsicle: {
        interlaced: true,
    },
    mozjpeg: {
        quality: 80,
    },
    optipng: {
    },
    pngquant: {
        quality: 80,
    },
};

export default (): RuleSetUseItem => {
    const plugins = [
        gif(pluginOptions.gifsicle),
        jpeg(pluginOptions.mozjpeg),
        png(pluginOptions.optipng),
    ];

    return {
        loader: resolve.sync('img-loader'),
        options: {plugins},
    };
};

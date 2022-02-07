import {RuleSetUseItem} from 'webpack';
import gif from 'imagemin-gifsicle';
import jpeg from 'imagemin-mozjpeg';
import png from 'imagemin-optipng';
import {resolve} from '@reskript/core';

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

export default async (): Promise<RuleSetUseItem> => {
    const plugins = [
        gif(pluginOptions.gifsicle),
        jpeg(pluginOptions.mozjpeg),
        png(pluginOptions.optipng),
    ];

    return {
        loader: await resolve('img-loader'),
        options: {plugins},
    };
};

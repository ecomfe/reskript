import {LoaderFactory} from '../interface.js';

const factory: LoaderFactory = async () => {
    const {default: MiniCssExtractPlugin} = await import('mini-css-extract-plugin');

    return {
        loader: MiniCssExtractPlugin.loader,
    };
};

export default factory;

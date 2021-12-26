import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import {LoaderFactory} from '../interface.js';

const factory: LoaderFactory = () => {
    return {
        loader: MiniCssExtractPlugin.loader,
    };
};

export default factory;

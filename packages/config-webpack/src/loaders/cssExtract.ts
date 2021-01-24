import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import {LoaderFactory} from '../interface';

const factory: LoaderFactory = () => {
    return {
        loader: MiniCssExtractPlugin.loader,
    };
};

export default factory;

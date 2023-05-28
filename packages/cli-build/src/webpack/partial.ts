import {Configuration} from 'webpack';
import {BundleAnalyzerPlugin} from 'webpack-bundle-analyzer';
import {BuildContext} from '@reskript/config-webpack';

// @ts-expect-error 官方类型错误
export const analyze = (context: BuildContext): Configuration => (
    context.isDefaultTarget
        ? {
            plugins: [
                // TODO: https://github.com/webpack/webpack/pull/11698
                new BundleAnalyzerPlugin({analyzerMode: 'static', generateStatsFile: true}),
            ],
        }
        : {}
);

export const profile = (): Configuration => {
    return {
        resolve: {
            alias: {
                'react-dom$': 'react-dom/profiling',
                'scheduler/tracing': 'scheduler/tracing-profiling',
            },
        },
    };
};

export const noSourceMaps = (): Configuration => {
    return {
        devtool: false,
    };
};

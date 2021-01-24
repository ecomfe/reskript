import {Configuration} from 'webpack';
import {BundleAnalyzerPlugin} from 'webpack-bundle-analyzer';
import {BuildContext} from '@reskript/config-webpack';

export const analyze = (context: BuildContext): Configuration => (
    context.isDefaultTarget
        ? {
            plugins: [
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

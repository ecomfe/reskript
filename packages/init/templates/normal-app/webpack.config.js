// WARNING: 此文件用于WebStorm自动完成路径用。不要修改这个文件，任何对本文件的修改都不会影响你的构建配置。
// 如果需要对构建进行自定义调整，请修改reskript.config.js，具体参考：
//
// - 调整webpack配置：https://ecomfe.github.io/reskript/docs/settings/build#自定义调整webpack配置
// - 调整webpack-dev-server配置：https://ecomfe.github.io/reskript/docs/settings/dev-server#扩展配置
// - 调整babel配置：https://ecomfe.github.io/reskript/docs/settings/build#扩展babel配置
const path = require('path');

module.exports = {
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src'),
        },
    },
};

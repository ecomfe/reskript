import {constructDefines, DefineContext} from '@reskript/build-utils';
import {ConfigFactory} from '../interface.js';

const factory: ConfigFactory = async context => {
    const defines: DefineContext = {
        features: context.features,
        mode: context.mode,
        buildVersion: context.buildVersion,
        buildTarget: context.buildTarget,
        buildTime: context.buildTime,
        env: process.env,
    };
    return {
        define: constructDefines(defines),
    };
};

export default factory;

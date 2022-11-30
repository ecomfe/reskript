import {UserSettings} from '@reskript/settings';
import baseConfig from './reskript-vite.config';

const enhance = <S extends UserSettings>(settings: S): S => {
    return {
        ...settings,
        devServer: {
            ...settings.devServer,
            port: 8975,
            https: undefined,
            customizeMiddleware: ({before}) => {
                before.get(
                    '/ok',
                    (req, res) => {
                        res.setHeader('content-type', 'text/plain');
                        res.end('OK');
                    }
                );
            },
        },
        portal: {
            setup: app => {
                app.get('/e2e', (req, res) => res.end('For Test'));
            },
        },
    };
};

export default enhance(baseConfig);

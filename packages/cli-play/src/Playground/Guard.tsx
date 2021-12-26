import {ReactNode, useEffect, useState} from 'react';
// @ts-expect-error
import dedent from 'dedent';
import Notice from './Notice/index.js';

const EXAMPLE_CODE = dedent`
    exports.devServer = {
        finalize: devServerConfig => {
            const {onBeforeSetupMiddleware} = devServerConfig;
            devServerConfig.onBeforeSetupMiddleware = devServer => {
                onBeforeSetupMiddleware?.(devServer);
                // 你的其它逻辑
            };
            return devServerConfig;
        },
    };
`;

interface Props {
    children: ReactNode;
}

export default function Guard({children}: Props) {
    const [ok, setOk] = useState(false);
    useEffect(
        () => {
            (async () => {
                const text = await fetch('/play/ok').then(r => r.text());
                setOk(text === 'OK');
            })();
        },
        []
    );

    return ok
        ? <>{children}</>
        : (
            <Notice title="PlayGround服务未响应">
                <p>检测到用例管理等服务未响应，这很可能是由错误的<code>reskript.config.js</code>配置造成的。</p>
                <p>请检查你的<code>reskript.config.js</code>配置中的<code>devServer.finalize</code>配置。</p>
                <p>
                    如果该配置没有正确地调用传入的<code>devServerConfig.onBeforeSetupMiddleware</code>方法，
                    则会导致你的配置覆盖了<code>skr play</code>的服务注册逻辑，丢失相关的服务。
                </p>
                <p>以下为一个正确的<code>devServer.finalize</code>配置的实现样例：</p>
                <pre><code>{EXAMPLE_CODE}</code></pre>
                <p>请在完成配置文件修复后，重启<code>skr play</code>并刷新本页面。</p>
            </Notice>
        );
}

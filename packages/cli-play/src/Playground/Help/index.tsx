import './index.css';

interface Props {
    configurationSourceCode: string;
    componentFilePath: string;
    configurationFilePath: string;
}

export default function Help({componentFilePath, configurationFilePath, configurationSourceCode}: Props) {
    return (
        <article className="help">
            <h2>调试台说明</h2>
            <p>你正在调试<code>{componentFilePath}</code>。</p>
            <p>
                可以通过<code>{configurationFilePath}</code>文件进行调试台的配置，具体请参考
                <a
                    target="_blank"
                    href="https://ecomfe.github.io/reskript/docs/advanced/debug-component#组件调试配置"
                    rel="noopener noreferrer"
                >
                    组件调试配置文档
                </a>
                。
            </p>
            {
                configurationSourceCode && (
                    <>
                        <p>以下为你当前的调试台配置，你可以通过<code>I.*</code>访问到其中<code>provides</code>变量中的属性。</p>
                        <pre>{configurationSourceCode}</pre>
                    </>
                )
            }
        </article>
    );
}

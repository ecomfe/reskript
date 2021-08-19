import * as %MODULE_NAME% from '%CONFIGURATION_PATH%';

((configuration) => {
    Object.assign(G.provides, configuration.provides);
    if (configuration.Wrapper) {
        const currentRenderPreview = G.renderPreview;
        const Wrapper = configuration.Wrapper;
        G.renderPreview = content => <Wrapper>{currentRenderPreview(content)}</Wrapper>;
    }
})(%MODULE_NAME%);

import * as configuration from '%CONFIGURATION_PATH%';

const [provides, renderPreview] = ((configuration) => {
    const {Wrapper} = configuration;

    return [
        configuration.provides || {},
        content => {
            return Wrapper ? <Wrapper>{content}</Wrapper> : content;
        },
    ];
})(configuration);

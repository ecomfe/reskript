import * as configuration from '%CONFIGURATION_PATH%';

const [injects, renderPreview, cases] = ((configuration) => {
    const {Wrapper} = configuration;

    return [
        configuration.injects || {},
        content => {
            return Wrapper ? <Wrapper>{content}</Wrapper> : content;
        },
        configuration.cases || []
    ];
})(configuration);

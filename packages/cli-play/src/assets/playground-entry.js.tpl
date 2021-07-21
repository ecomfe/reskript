/* eslint-disable */
import {render} from 'react-dom';
import Playground from '%PLAYGROUND_PATH%';
import Target from '%COMPONENT_MODULE_PATH%';
%EXTRA_IMPORTS%
%CONFIGURATION_BLOCK%

const playground = {
    componentName: "%COMPONENT_TYPE_NAME%",
    componentFilePath: '%COMPONENT_MODULE_PATH_RELATIVE%',
    configurationFilePath: '%CONFIGURATION_FILE_PATH%',
    configurationSourceCode: '%CONFIGURATION_SOURCE%',
};

render(
    <Playground
        {...playground}
        componentType={Target}
        injects={provides}
        renderPreview={renderPreview}
    />,
    document.body.appendChild(document.createElement('div'))
);

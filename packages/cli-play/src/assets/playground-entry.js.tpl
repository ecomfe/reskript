/* eslint-disable */
import {render} from 'react-dom';
import Playground from '%PLAYGROUND_PATH%';
import Target from '%COMPONENT_MODULE_PATH%';
%CONFIGURATION_INITIALIZE_BLOCK%
%GLOBAL_CONFIGURATION_BLOCK%
%LOCAL_CONFIGURATION_BLOCK%

const playground = {
    componentName: "%COMPONENT_TYPE_NAME%",
    componentFilePath: '%COMPONENT_MODULE_PATH_RELATIVE%',
    configurationSourceCode: '%CONFIGURATION_SOURCE%',
};

render(
    <Playground
        {...playground}
        componentType={Target}
        injects={G.provides}
        renderPreview={G.renderPreview}
    />,
    document.body.appendChild(document.createElement('div'))
);

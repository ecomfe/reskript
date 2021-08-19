/* eslint-disable */
import {createRoot} from 'react-dom';
import Playground from '%PLAYGROUND_PATH%';
import Target from '%COMPONENT_MODULE_PATH%';
%EXTRA_IMPORTS%
%CONFIGURATION_INITIALIZE_BLOCK%
%GLOBAL_CONFIGURATION_BLOCK%
%LOCAL_CONFIGURATION_BLOCK%

const playground = {
    componentName: "%COMPONENT_TYPE_NAME%",
    componentFilePath: '%COMPONENT_MODULE_PATH_RELATIVE%',
    configurationFilePath: '%CONFIGURATION_FILE_PATH%',
    configurationSourceCode: '%CONFIGURATION_SOURCE%',
};

const root = createRoot(document.body.appendChild(document.createElement('div')));
root.render(
    <Playground
        {...playground}
        componentType={Target}
        injects={G.provides}
        renderPreview={G.renderPreview}
    />
);

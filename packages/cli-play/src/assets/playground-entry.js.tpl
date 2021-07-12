/* eslint-disable */
import {render} from 'react-dom';
import Playground from '%PLAYGROUND_PATH%';
import Target from '%COMPONENT_MODULE_PATH%';
%EXTRA_IMPORTS%

const PreviewLayoutWrapper = ({children}) => (
    %WRAPPER_RETURN%
);

render(
    <Playground
        componentTypeName="%COMPONENT_TYPE_NAME%"
        defaultComponentType={Target}
        wrapperComponent={PreviewLayoutWrapper}
    />,
    document.body.appendChild(document.createElement('div'))
);

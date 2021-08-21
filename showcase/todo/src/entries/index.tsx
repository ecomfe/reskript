import {render} from 'react-dom';
import '@/styles';
import App from '@/components/App';

render(
    <App />,
    document.body.appendChild(document.createElement('div'))
);

import {createRoot} from 'react-dom/client';
import '@/styles';
import App from '@/components/App';

const root = createRoot(document.body.appendChild(document.createElement('div')));
root.render(<App />);

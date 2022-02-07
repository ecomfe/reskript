/* eslint-disable no-console */
import {StrictMode} from 'react';
import {render, unmountComponentAtNode} from 'react-dom';
import '@/styles/index.js';
import App from '@/components/App/index.js';

export const bootstrap = async () => {
    console.log('App TodoMVC bootstraped');
};

export const mount = async () => {
    const root = document.getElementById('root')!;
    render(
        <StrictMode>
            <App />
        </StrictMode>,
        root.appendChild(document.createElement('div'))
    );
};

export const unmount = async () => {
    unmountComponentAtNode(document.getElementById('root')!);
};

export const update = async () => {
    console.log('App TodoMVC updated');
};

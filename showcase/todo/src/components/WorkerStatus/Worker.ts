addEventListener(
    'message',
    e => {
        if (e.data === 'ready') {
            postMessage('ok');
        }
    }
);

import {pathToFileURL} from 'node:url';
import express, {Application} from 'express';
// @ts-ignore
import dedent from 'dedent';

export const router = express.Router;

export const createPortal = (): Application => {
    const app = express();

    app.use(express.json());
    app.get('/ok', (req, res) => res.end('OK'));
    app.get(
        '/',
        express.json(),
        (req, res) => {
            const html = dedent`
                <!DOCTYPE html>
                <html>
                    <head>
                        <meta charset="UTF-8">
                        <title>reSKRipt Portal</title>
                    </head>
                    <body>
                        <h1>reSKRipt Portal</h1>
                        <p>We don't have an UI for portal yet.</p>
                    </body>
                </html>
            `;
            res.type('html').end(html);
        }
    );

    return app;
};

export type PortalApplication = Application;

if (import.meta.url === pathToFileURL(process.argv[1]).toString()) {
    const app = createPortal();
    // eslint-disable-next-line no-console
    app.listen(3456, () => console.log('http://localhost:3456'));
}

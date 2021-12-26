import {existsSync} from 'fs';
import http from 'http';
import fs from 'fs/promises';
import chokidar from 'chokidar';
import {Server, Socket} from 'socket.io';
import {resolveCasePath} from '../utils/path.js';
import {parseMarkdownToCases} from '../utils/case.js';

const createWatcher = (componentModulePath: string) => {
    const casePath = resolveCasePath(componentModulePath);
    const watcher = chokidar.watch(casePath);

    return (callback: (content: string) => void) => {
        const notify = async (): Promise<void> => {
            const content = existsSync(casePath) ? await fs.readFile(casePath, 'utf-8') : '';
            callback(content);
        };
        watcher.on('all', notify);
        return () => {
            watcher.off('all', notify);
        };
    };
};

const setupSocket = (socket: Socket, watch: ReturnType<typeof createWatcher>) => {
    const pushNewCases = async (content: string) => {
        const cases = await parseMarkdownToCases(content);
        socket.emit('cases', cases);
    };
    const unwatch = watch(pushNewCases);
    socket.on('disconnect', unwatch);
};

export default (componentModulePath: string): void => {
    const watch = createWatcher(componentModulePath);
    const server = http.createServer();
    const io = new Server(server, {path: '/io-play'});
    server.listen(
        9998,
        () => io.on(
            'connection',
            socket => setupSocket(socket, watch)
        )
    );
};

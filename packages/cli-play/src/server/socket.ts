import fs from 'fs';
import http from 'http';
import chokidar from 'chokidar';
import {Server, Socket} from 'socket.io';
import {resolveCasePath} from '../utils/path';
import {parseMarkdownToCases} from '../utils/case';

const createWatcher = (componentModulePath: string) => {
    const casePath = resolveCasePath(componentModulePath);
    const watcher = chokidar.watch(casePath);

    return (callback: (content: string) => void) => {
        const notify = async (): Promise<void> => {
            const content = fs.existsSync(casePath) ? fs.readFileSync(casePath, 'utf-8') : '';
            callback(content);
        };
        watcher.on('all', notify);
        return () => {
            watcher.off('all', notify);
        };
    };
};

const setupSocket = (socket: Socket, watch: ReturnType<typeof createWatcher>) => {
    const pushNewCases = (content: string) => {
        const cases = parseMarkdownToCases(content);
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

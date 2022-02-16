import run from './dev';

run({driver: 'webpack', config: 'reskript-e2e.config.ts', port: 9976});
run({driver: 'vite', config: 'reskript-vite-e2e.config.ts', port: 9975});

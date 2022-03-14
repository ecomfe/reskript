export interface UserOptions {
    driver: 'webpack' | 'vite';
    packageManager: 'npm' | 'yarn' | 'pnpm';
    packageName: string;
    appTitle: string;
    gerrit: boolean;
    devServerPort: number;
    tasks: string[];
}

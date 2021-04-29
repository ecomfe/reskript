export interface UserOptions {
    packageManager: 'npm' | 'yarn';
    packageName: string;
    appTitle: string;
    gerrit: boolean;
    devServerPort: number;
    tasks: string[];
}

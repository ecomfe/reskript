export interface UserOptions {
    packageManager: 'npm' | 'yarn';
    packageName: string;
    appTitle: string;
    devServerPort: number;
    tasks: string[];
}

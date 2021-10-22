declare module 'g-status' {
    type IndexStatusType = 'A' | 'R' | 'C' | 'D' | 'M' | ' ' | '?';

    type WorkingTreeStatusType = ' ' | '?' | 'M' | 'D';

    interface GitStatusItem {
        path: string;
        index: IndexStatusType;
        workingTree: WorkingTreeStatusType;
    }

    interface GitStatusOptions {
        cwd?: string;
        path?: string | string[];
    }

    export default function status(options: GitStatusOptions): Promise<GitStatusItem[]>;
}

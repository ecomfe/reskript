declare module 'g-status' {
    type GitStatusType = 'A' | 'R' | 'C' | 'D' | 'M' | ' ' | '?';

    interface GitStatusItem {
        path: string;
        index: GitStatusType;
        workingTree: GitStatusType;
    }

    interface GitStatusOptions {
        path: string | string[];
    }

    export default function status(options: GitStatusOptions): Promise<GitStatusItem[]>;
}

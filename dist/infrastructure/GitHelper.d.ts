import { StatusResult } from 'simple-git';
export declare class GitHelper {
    private git;
    constructor(baseDir?: string);
    init(projectPath: string): Promise<void>;
    add(projectPath: string, files: string[]): Promise<void>;
    commit(projectPath: string, message: string): Promise<void>;
    status(projectPath: string): Promise<StatusResult>;
    isRepo(projectPath: string): Promise<boolean>;
    isGitInstalled(): Promise<boolean>;
    createGitignore(projectPath: string, content: string): Promise<void>;
    configUser(projectPath: string, name: string, email: string): Promise<void>;
    currentBranch(projectPath: string): Promise<string>;
}
//# sourceMappingURL=GitHelper.d.ts.map
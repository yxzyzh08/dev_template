import { ProjectType } from '../types';
export interface ProjectConfigSchema {
    project: {
        name: string;
        type: ProjectType;
        version: string;
        description?: string;
    };
    author?: {
        name: string;
        email?: string;
    };
    git?: {
        enabled: boolean;
        remote?: string;
    };
    install?: {
        enabled: boolean;
        manager?: 'npm' | 'yarn' | 'pnpm';
    };
    template?: {
        id: string;
        version: string;
        customVariables?: Record<string, any>;
    };
    skills?: {
        enabled: boolean;
        list?: string[];
    };
    documentation?: {
        enabled: boolean;
        outputDir?: string;
    };
    custom?: Record<string, any>;
}
export declare const ConfigValidationRules: {
    projectName: {
        minLength: number;
        maxLength: number;
        pattern: RegExp;
        message: string;
    };
    version: {
        pattern: RegExp;
        message: string;
    };
    email: {
        pattern: RegExp;
        message: string;
    };
    gitRemote: {
        pattern: RegExp;
        message: string;
    };
};
export declare const DefaultConfig: Partial<ProjectConfigSchema>;
export declare const CONFIG_FILE_NAME = ".ai-dev.json";
export declare const CONFIG_FILE_PATH = "./.ai-dev.json";
//# sourceMappingURL=schema.d.ts.map
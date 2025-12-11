import { ProjectConfigSchema } from './schema';
import { ConfigValidator, ValidationResult } from './ConfigValidator';
import { FileSystemHelper } from '../infrastructure';
export declare class ConfigManager {
    private fs;
    private validator;
    private config;
    constructor(fs?: FileSystemHelper, validator?: ConfigValidator);
    load(projectPath: string): Promise<ProjectConfigSchema>;
    save(projectPath: string, config: ProjectConfigSchema): Promise<void>;
    createDefault(projectPath: string, overrides?: Partial<ProjectConfigSchema>): Promise<ProjectConfigSchema>;
    getConfig(): ProjectConfigSchema | null;
    update(projectPath: string, updates: Partial<ProjectConfigSchema>): Promise<ProjectConfigSchema>;
    validate(config: ProjectConfigSchema): ValidationResult;
    exists(projectPath: string): Promise<boolean>;
    getConfigPath(projectPath: string): string;
    private mergeWithDefaults;
    private deepMerge;
    export(config: ProjectConfigSchema): string;
    import(jsonString: string): ProjectConfigSchema;
}
//# sourceMappingURL=ConfigManager.d.ts.map
import { ProjectMetadata } from '../../types';
import { FileSystemHelper, GitHelper } from '../../infrastructure';
import { TemplateRegistry, TemplateApplicator } from '../../templates';
import { SkillManager } from '../../skills';
import { ConfigManager } from '../../config';
import { Logger, Spinner } from '../../cli/ui';
export declare class InitWorkflow {
    private fs;
    private git;
    private templateRegistry;
    private templateApplicator;
    private skillManager;
    private configManager;
    private logger;
    private spinner;
    constructor(fs?: FileSystemHelper, git?: GitHelper, templateRegistry?: TemplateRegistry, templateApplicator?: TemplateApplicator, skillManager?: SkillManager, configManager?: ConfigManager, logger?: Logger, spinner?: Spinner);
    execute(metadata: ProjectMetadata): Promise<InitResult>;
    private validateInput;
    private prepareTargetDirectory;
    private getTemplate;
    private applyTemplate;
    private copySkills;
    private createConfig;
    private initializeGit;
    private installDependencies;
}
export interface InitResult {
    success: boolean;
    projectPath?: string;
    error?: string;
    duration: number;
}
//# sourceMappingURL=InitWorkflow.d.ts.map
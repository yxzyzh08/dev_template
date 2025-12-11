import { FileSystemHelper } from '../../infrastructure';
import { Logger, Spinner } from '../../cli/ui';
export declare class GeneratePRDWorkflow {
    private fs;
    private logger;
    private spinner;
    constructor(fs?: FileSystemHelper, logger?: Logger, spinner?: Spinner);
    execute(options: GeneratePRDOptions): Promise<GeneratePRDResult>;
    private validateProject;
    private collectDocuments;
    private analyzeEntities;
    private renderMermaid;
    private generatePRD;
}
export interface GeneratePRDOptions {
    projectPath: string;
    outputDir: string;
    force?: boolean;
    skipRender?: boolean;
}
export interface GeneratePRDResult {
    success: boolean;
    outputPath?: string;
    error?: string;
    duration: number;
}
//# sourceMappingURL=GeneratePRDWorkflow.d.ts.map
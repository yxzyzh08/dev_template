import { Template, TemplateVariables, ProjectMetadata } from '../../types';
import { FileSystemHelper } from '../../infrastructure';
import { TemplateEngine } from './TemplateEngine';
import { FileGenerator } from './FileGenerator';
export declare class TemplateApplicator {
    private fs;
    private engine;
    private generator;
    constructor(fs?: FileSystemHelper, engine?: TemplateEngine, generator?: FileGenerator);
    apply(template: Template, targetDir: string, metadata: ProjectMetadata): Promise<void>;
    private createDirectories;
    private prepareVariables;
    private generateFiles;
    validateTargetDir(targetDir: string, force?: boolean): Promise<void>;
    getPreview(template: Template, metadata: ProjectMetadata): TemplatePreview;
}
interface TemplatePreview {
    directories: string[];
    files: Array<{
        path: string;
        isTemplate: boolean;
    }>;
    variables: TemplateVariables;
    estimatedFileCount: number;
    estimatedDirCount: number;
}
export {};
//# sourceMappingURL=TemplateApplicator.d.ts.map
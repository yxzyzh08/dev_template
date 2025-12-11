import { TemplateFile, TemplateVariables } from '../../types';
import { FileSystemHelper } from '../../infrastructure';
import { TemplateEngine } from './TemplateEngine';
export declare class FileGenerator {
    private fs;
    private engine;
    constructor(fs?: FileSystemHelper, engine?: TemplateEngine);
    generate(file: TemplateFile, targetDir: string, variables: TemplateVariables): Promise<void>;
    private generateFromTemplate;
    private copyStaticFile;
    generateBatch(files: TemplateFile[], targetDir: string, variables: TemplateVariables): Promise<GenerateResult[]>;
    preview(file: TemplateFile, variables: TemplateVariables): Promise<string>;
    willOverwrite(file: TemplateFile, targetDir: string): Promise<boolean>;
    getOverwriteList(files: TemplateFile[], targetDir: string): Promise<string[]>;
}
interface GenerateResult {
    file: string;
    success: boolean;
    error?: string;
}
export {};
//# sourceMappingURL=FileGenerator.d.ts.map
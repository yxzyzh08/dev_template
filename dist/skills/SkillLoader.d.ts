import { Skill } from '../types';
import { FileSystemHelper } from '../infrastructure';
export declare class SkillLoader {
    private fs;
    constructor(fs?: FileSystemHelper);
    loadFromDirectory(dirPath: string): Promise<Skill[]>;
    loadFromFile(filePath: string): Promise<Skill | null>;
    private parseMetadata;
    private formatSkillName;
    validateSkillFile(filePath: string): Promise<boolean>;
    validateDirectory(dirPath: string): Promise<ValidationReport>;
}
interface ValidationReport {
    totalFiles: number;
    validFiles: number;
    invalidFiles: string[];
    allValid: boolean;
}
export {};
//# sourceMappingURL=SkillLoader.d.ts.map
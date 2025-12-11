import { Skill } from '../types';
import { FileSystemHelper } from '../infrastructure';
export declare class SkillCopier {
    private fs;
    constructor(fs?: FileSystemHelper);
    copySkills(skills: Skill[], targetProjectPath: string): Promise<void>;
    copySkill(skill: Skill, targetDir: string): Promise<void>;
    copyFromDirectory(sourceDir: string, targetProjectPath: string): Promise<void>;
    checkOverwrite(skills: Skill[], targetProjectPath: string): Promise<string[]>;
    copySkillsWithReport(skills: Skill[], targetProjectPath: string): Promise<CopyReport>;
    backupExistingSkills(targetProjectPath: string): Promise<string>;
    cleanTargetDirectory(targetProjectPath: string): Promise<void>;
}
interface CopyResult {
    skillId: string;
    success: boolean;
    error?: string;
}
interface CopyReport {
    total: number;
    succeeded: number;
    failed: number;
    failedSkills: string[];
    results: CopyResult[];
}
export {};
//# sourceMappingURL=SkillCopier.d.ts.map
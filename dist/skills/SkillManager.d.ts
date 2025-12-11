import { Skill } from '../types';
import { FileSystemHelper } from '../infrastructure';
import { SkillLoader } from './SkillLoader';
import { SkillCopier } from './SkillCopier';
export declare class SkillManager {
    private fs;
    private loader;
    private copier;
    private skills;
    constructor(fs?: FileSystemHelper, loader?: SkillLoader, copier?: SkillCopier);
    loadAvailableSkills(): Promise<void>;
    get(id: string): Skill | undefined;
    getAll(): Skill[];
    has(id: string): boolean;
    copyToProject(skillIds: string[], targetProjectPath: string): Promise<void>;
    copyAllToProject(targetProjectPath: string): Promise<void>;
    validateProjectSkills(projectPath: string): Promise<ValidationResult>;
    count(): number;
    listIds(): string[];
    getRecommendedSkills(): string[];
}
interface ValidationResult {
    valid: boolean;
    message: string;
    missingSkills: string[];
}
export {};
//# sourceMappingURL=SkillManager.d.ts.map
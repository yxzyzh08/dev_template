import { ProjectConfigSchema } from './schema';
export declare class ConfigValidator {
    validate(config: ProjectConfigSchema): ValidationResult;
    private validateProject;
    private validateAuthor;
    private validateGit;
    private validateInstall;
    validateField(field: string, value: any): ValidationError | null;
}
export interface ValidationResult {
    valid: boolean;
    errors: ValidationError[];
}
export interface ValidationError {
    field: string;
    message: string;
}
//# sourceMappingURL=ConfigValidator.d.ts.map
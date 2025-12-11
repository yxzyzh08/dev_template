import { Template, ProjectType } from '../../types';
export declare class TemplateRegistry {
    private templates;
    constructor();
    private registerDefaultTemplates;
    register(template: Template): void;
    getById(id: string): Template | undefined;
    getByType(type: ProjectType): Template | undefined;
    getAll(): Template[];
    getAllIds(): string[];
    has(id: string): boolean;
    count(): number;
    listTypes(): ProjectType[];
}
//# sourceMappingURL=TemplateRegistry.d.ts.map
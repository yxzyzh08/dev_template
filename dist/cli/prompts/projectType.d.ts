import { ProjectType } from '../../types';
export interface ProjectTypeChoice {
    type: ProjectType;
    name: string;
    description: string;
}
export declare function promptProjectType(): Promise<ProjectType | null>;
export declare function getProjectTypeDescription(type: ProjectType): string;
export declare function getProjectTypeName(type: ProjectType): string;
//# sourceMappingURL=projectType.d.ts.map
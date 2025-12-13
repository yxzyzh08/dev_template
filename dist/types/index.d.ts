export type ProjectType = 'web-fullstack' | 'frontend-demo' | 'mobile-app' | 'backend-api' | 'cli-tool';
export interface ProjectMetadata {
    projectName: string;
    projectType: ProjectType;
    version?: string;
    description?: string;
    author?: string;
    license?: string;
    gitEnabled?: boolean;
    gitRemote?: string;
    installDeps?: boolean;
    features?: string[];
    customVariables?: Record<string, any>;
}
export interface ProjectConfig {
    version: string;
    projectType: ProjectType;
    projectName: string;
    description: string;
    author: string;
    createdAt: Date;
    updatedAt?: Date;
    metadata: ConfigMetadata;
}
export interface ConfigMetadata {
    templateVersion: string;
    claudeVersion: string;
    skills: string[];
    customSettings?: Record<string, any>;
}
export interface Template {
    id: string;
    type: ProjectType;
    name: string;
    version: string;
    description: string;
    files: TemplateFile[];
    directories: string[];
    scripts: PackageScripts;
}
export interface TemplateFile {
    targetPath: string;
    content: string;
    isTemplate: boolean;
}
export interface TemplateContent {
    template: string;
    data: Record<string, any>;
}
export type TemplateVariables = Record<string, any>;
export type PackageScripts = Record<string, string>;
export interface Skill {
    id: string;
    name: string;
    description: string;
    version?: string;
    content: string;
    filePath: string;
}
export interface CommandOption {
    flags: string;
    description: string;
    defaultValue?: any;
}
export interface CommandArgs {
    [key: string]: any;
}
export interface CommandResult<T = any> {
    success: boolean;
    message?: string;
    data?: T;
    error?: Error;
    duration?: number;
}
export interface InitOptions {
    type?: ProjectType;
    template?: string;
    skipGit?: boolean;
    skipInstall?: boolean;
    interactive?: boolean;
}
export interface InitResult {
    success: boolean;
    projectPath: string;
    files: string[];
    duration: number;
    error?: Error;
}
export interface GeneratePRDOptions {
    output?: string;
    force?: boolean;
    skipRender?: boolean;
    skipAI?: boolean;
}
export interface GeneratePRDResult {
    success: boolean;
    prdPath?: string;
    diagrams?: DiagramInfo[];
    duration: number;
    error?: Error;
}
export interface DiagramInfo {
    type: string;
    imagePath: string;
    mermaidCode: string;
}
export interface DocumentData {
    projectOverview: ProjectOverview;
    moduleDivision: ModuleDivision;
    userStories: UserStory[];
    modules: ModuleDetail[];
}
export interface ProjectOverview {
    name: string;
    vision: string;
    targetUsers: string;
    coreValue: string;
    competitiveAnalysis: string;
}
export interface ModuleDivision {
    modules: ModuleInfo[];
    relationships: string;
}
export interface ModuleInfo {
    name: string;
    description: string;
    priority: 'P0' | 'P1' | 'P2';
}
export interface UserStory {
    id: string;
    title: string;
    description: string;
    priority: 'P0' | 'P1' | 'P2';
    module: string;
}
export interface ModuleDetail {
    name: string;
    coreFlow: string;
    acceptanceCriteria: string;
    prototype?: string;
}
export interface BusinessEntities {
    entities: BusinessEntity[];
    relationships: EntityRelationship[];
}
export interface BusinessEntity {
    name: string;
    displayName: string;
    attributes: EntityAttribute[];
    description?: string;
}
export interface EntityAttribute {
    name: string;
    type: string;
    constraints: string[];
    description?: string;
}
export interface EntityRelationship {
    from: string;
    to: string;
    type: '1:1' | '1:N' | 'N:M';
    description: string;
}
export interface RenderedDiagrams {
    businessEntityDiagram?: DiagramResult;
    flowDiagrams: DiagramResult[];
}
export interface DiagramResult {
    type: string;
    mermaidCode: string;
    imagePath?: string;
    success: boolean;
    error?: string;
}
export interface MermaidBlock {
    type: string;
    code: string;
    lineNumber: number;
}
export interface ValidateOptions {
    phase?: 'requirements' | 'architecture' | 'implementation' | 'testing';
    strict?: boolean;
    fix?: boolean;
}
export interface ValidationResult {
    valid: boolean;
    errors: ValidationError[];
    warnings: ValidationWarning[];
}
export interface ValidationError {
    code: string;
    message: string;
    file?: string;
    suggestion?: string;
}
export interface ValidationWarning {
    code: string;
    message: string;
    file?: string;
}
export interface RenderOptions {
    width?: number;
    height?: number;
    backgroundColor?: string;
    theme?: 'default' | 'dark' | 'forest';
}
export interface MermaidDiagram {
    code: string;
    outputPath: string;
    options?: RenderOptions;
}
export interface RenderResult {
    success: boolean;
    outputPath?: string;
    error?: string;
}
export interface CopyOptions {
    overwrite?: boolean;
    errorOnExist?: boolean;
    preserveTimestamps?: boolean;
}
export interface WriteOptions {
    spaces?: number | string;
    EOL?: string;
    replacer?: ((key: string, value: any) => any) | null;
}
export declare class AIDevError extends Error {
    code: string;
    suggestion?: string | undefined;
    constructor(message: string, code: string, suggestion?: string | undefined);
}
export declare class FileSystemError extends AIDevError {
    constructor(message: string, suggestion?: string);
}
export declare class ValidationError extends AIDevError {
    errors: string[];
    constructor(message: string, errors: string[]);
}
export declare class AIAnalysisError extends AIDevError {
    constructor(message: string);
}
export declare class GitError extends AIDevError {
    constructor(message: string, suggestion?: string);
}
//# sourceMappingURL=index.d.ts.map
/**
 * 核心类型定义
 *
 * 定义系统中使用的所有核心类型、接口和枚举
 */

// ==================== 项目类型 ====================

/**
 * 项目类型枚举
 */
export type ProjectType =
  | 'web-fullstack'    // Web全栈应用
  | 'frontend-demo'    // 纯前端项目（Demo演示）
  | 'mobile-app'       // 移动应用
  | 'backend-api'      // 后端API
  | 'cli-tool';        // CLI工具

/**
 * 项目元数据
 */
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

/**
 * 项目配置
 */
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

/**
 * 配置元数据
 */
export interface ConfigMetadata {
  templateVersion: string;
  claudeVersion: string;
  skills: string[];
  customSettings?: Record<string, any>;
}

// ==================== 模板相关 ====================

/**
 * 模板定义
 */
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

/**
 * 模板文件
 */
export interface TemplateFile {
  targetPath: string;              // 目标相对路径
  content: string;                 // 文件内容
  isTemplate: boolean;             // 是否需要Handlebars渲染
}

/**
 * 模板内容（Handlebars）
 */
export interface TemplateContent {
  template: string;                 // Handlebars模板字符串
  data: Record<string, any>;        // 模板数据
}

/**
 * 模板变量
 */
export type TemplateVariables = Record<string, any>;

/**
 * package.json scripts
 */
export type PackageScripts = Record<string, string>;

// ==================== Skills相关 ====================

/**
 * Skill定义
 */
export interface Skill {
  id: string;
  name: string;
  description: string;
  version?: string;
  content: string;
  filePath: string;
}

// ==================== CLI相关 ====================

/**
 * 命令选项
 */
export interface CommandOption {
  flags: string;
  description: string;
  defaultValue?: any;
}

/**
 * 命令参数
 */
export interface CommandArgs {
  [key: string]: any;
}

/**
 * 命令结果
 */
export interface CommandResult<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  error?: Error;
  duration?: number;
}

/**
 * init命令选项
 */
export interface InitOptions {
  type?: ProjectType;
  template?: string;
  skipGit?: boolean;
  skipInstall?: boolean;
  interactive?: boolean;
}

/**
 * init命令结果
 */
export interface InitResult {
  success: boolean;
  projectPath: string;
  files: string[];
  duration: number;
  error?: Error;
}

// ==================== PRD生成相关 ====================

/**
 * 生成PRD选项
 */
export interface GeneratePRDOptions {
  output?: string;
  force?: boolean;
  skipRender?: boolean;
  skipAI?: boolean;
}

/**
 * 生成PRD结果
 */
export interface GeneratePRDResult {
  success: boolean;
  prdPath?: string;
  diagrams?: DiagramInfo[];
  duration: number;
  error?: Error;
}

/**
 * 图表信息
 */
export interface DiagramInfo {
  type: string;
  imagePath: string;
  mermaidCode: string;
}

/**
 * 文档数据（从需求文档收集）
 */
export interface DocumentData {
  projectOverview: ProjectOverview;
  moduleDivision: ModuleDivision;
  userStories: UserStory[];
  modules: ModuleDetail[];
}

/**
 * 项目概览
 */
export interface ProjectOverview {
  name: string;
  vision: string;
  targetUsers: string;
  coreValue: string;
  competitiveAnalysis: string;
}

/**
 * 模块划分
 */
export interface ModuleDivision {
  modules: ModuleInfo[];
  relationships: string;         // Mermaid代码
}

/**
 * 模块信息
 */
export interface ModuleInfo {
  name: string;
  description: string;
  priority: 'P0' | 'P1' | 'P2';
}

/**
 * 用户故事
 */
export interface UserStory {
  id: string;
  title: string;
  description: string;
  priority: 'P0' | 'P1' | 'P2';
  module: string;
}

/**
 * 模块详情
 */
export interface ModuleDetail {
  name: string;
  coreFlow: string;              // Markdown内容
  acceptanceCriteria: string;    // Markdown内容
  prototype?: string;            // Markdown内容（可选）
}

/**
 * 业务实体集合
 */
export interface BusinessEntities {
  entities: BusinessEntity[];
  relationships: EntityRelationship[];
}

/**
 * 业务实体
 */
export interface BusinessEntity {
  name: string;                  // 实体名称（如 "USER"）
  displayName: string;           // 显示名称（如 "用户"）
  attributes: EntityAttribute[];
  description?: string;
}

/**
 * 实体属性
 */
export interface EntityAttribute {
  name: string;                  // 属性名（如 "id"）
  type: string;                  // 数据类型（如 "uuid"）
  constraints: string[];         // 约束（如 ["PK", "NOT NULL"]）
  description?: string;
}

/**
 * 实体关系
 */
export interface EntityRelationship {
  from: string;                  // 源实体名
  to: string;                    // 目标实体名
  type: '1:1' | '1:N' | 'N:M';  // 关系类型
  description: string;           // 关系描述
}

/**
 * 渲染的图表集合
 */
export interface RenderedDiagrams {
  businessEntityDiagram?: DiagramResult;
  flowDiagrams: DiagramResult[];
}

/**
 * 图表渲染结果
 */
export interface DiagramResult {
  type: string;
  mermaidCode: string;
  imagePath?: string;
  success: boolean;
  error?: string;
}

/**
 * Mermaid代码块
 */
export interface MermaidBlock {
  type: string;               // 图表类型（erDiagram/graph/sequence）
  code: string;               // Mermaid代码
  lineNumber: number;         // 行号
}

// ==================== 验证相关 ====================

/**
 * 验证选项
 */
export interface ValidateOptions {
  phase?: 'requirements' | 'architecture' | 'implementation' | 'testing';
  strict?: boolean;
  fix?: boolean;
}

/**
 * 验证结果
 */
export interface ValidationResult {
  valid: boolean;
  errors: ValidationError[];
  warnings: ValidationWarning[];
}

/**
 * 验证错误
 */
export interface ValidationError {
  code: string;
  message: string;
  file?: string;
  suggestion?: string;
}

/**
 * 验证警告
 */
export interface ValidationWarning {
  code: string;
  message: string;
  file?: string;
}

// ==================== 工具类型 ====================

/**
 * 渲染选项
 */
export interface RenderOptions {
  width?: number;
  height?: number;
  backgroundColor?: string;
  theme?: 'default' | 'dark' | 'forest';
}

/**
 * Mermaid图表
 */
export interface MermaidDiagram {
  code: string;
  outputPath: string;
  options?: RenderOptions;
}

/**
 * 渲染结果
 */
export interface RenderResult {
  success: boolean;
  outputPath?: string;
  error?: string;
}

/**
 * 复制选项
 */
export interface CopyOptions {
  overwrite?: boolean;
  errorOnExist?: boolean;
  preserveTimestamps?: boolean;
}

/**
 * 写入选项
 */
export interface WriteOptions {
  spaces?: number | string;
  EOL?: string;
  replacer?: ((key: string, value: any) => any) | null;
}

// ==================== 错误类型 ====================

/**
 * 自定义错误基类
 */
export class AIDevError extends Error {
  constructor(
    message: string,
    public code: string,
    public suggestion?: string
  ) {
    super(message);
    this.name = 'AIDevError';
  }
}

/**
 * 文件系统错误
 */
export class FileSystemError extends AIDevError {
  constructor(message: string, suggestion?: string) {
    super(message, 'FS_ERROR', suggestion);
    this.name = 'FileSystemError';
  }
}

/**
 * 验证错误
 */
export class ValidationError extends AIDevError {
  constructor(
    message: string,
    public errors: string[]
  ) {
    super(message, 'VALIDATION_ERROR');
    this.name = 'ValidationError';
  }
}

/**
 * AI分析错误
 */
export class AIAnalysisError extends AIDevError {
  constructor(message: string) {
    super(message, 'AI_ERROR', '检查网络连接或使用--no-ai选项');
    this.name = 'AIAnalysisError';
  }
}

/**
 * Git操作错误
 */
export class GitError extends AIDevError {
  constructor(message: string, suggestion?: string) {
    super(message, 'GIT_ERROR', suggestion);
    this.name = 'GitError';
  }
}

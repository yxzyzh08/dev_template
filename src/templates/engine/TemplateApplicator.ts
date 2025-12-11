/**
 * 模板应用器
 *
 * 负责将模板应用到目标项目目录
 */

import path from 'path';
import { Template, TemplateVariables, ProjectMetadata } from '@/types';
import { FileSystemHelper } from '@/infrastructure';
import { TemplateEngine } from './TemplateEngine';
import { FileGenerator } from './FileGenerator';

export class TemplateApplicator {
  private fs: FileSystemHelper;
  private engine: TemplateEngine;
  private generator: FileGenerator;

  constructor(
    fs?: FileSystemHelper,
    engine?: TemplateEngine,
    generator?: FileGenerator
  ) {
    this.fs = fs || new FileSystemHelper();
    this.engine = engine || new TemplateEngine();
    this.generator = generator || new FileGenerator(this.fs, this.engine);
  }

  /**
   * 应用模板到目标目录
   */
  async apply(
    template: Template,
    targetDir: string,
    metadata: ProjectMetadata
  ): Promise<void> {
    // 1. 创建项目根目录
    await this.fs.ensureDir(targetDir);

    // 2. 创建所有子目录
    await this.createDirectories(template, targetDir);

    // 3. 准备模板变量
    const variables = this.prepareVariables(template, metadata);

    // 4. 生成所有文件
    await this.generateFiles(template, targetDir, variables);
  }

  /**
   * 创建目录结构
   */
  private async createDirectories(template: Template, targetDir: string): Promise<void> {
    for (const dir of template.directories) {
      const fullPath = path.join(targetDir, dir);
      await this.fs.ensureDir(fullPath);
    }
  }

  /**
   * 准备模板变量
   */
  private prepareVariables(
    template: Template,
    metadata: ProjectMetadata
  ): TemplateVariables {
    return {
      // 项目元数据
      projectName: metadata.projectName,
      projectType: metadata.projectType,
      description: metadata.description || `${metadata.projectName} - ${template.name}项目`,
      author: metadata.author || 'AI Developer',
      version: metadata.version || '0.1.0',
      license: metadata.license || 'MIT',

      // 模板信息
      templateId: template.id,
      templateVersion: template.version,

      // 时间信息
      createdAt: new Date().toISOString(),
      year: new Date().getFullYear(),

      // Git信息
      gitEnabled: metadata.gitEnabled !== false,
      gitRemote: metadata.gitRemote || '',

      // 依赖安装
      installDeps: metadata.installDeps !== false,

      // 项目特性
      features: metadata.features || [],

      // 自定义变量
      ...metadata.customVariables,
    };
  }

  /**
   * 生成所有文件
   */
  private async generateFiles(
    template: Template,
    targetDir: string,
    variables: TemplateVariables
  ): Promise<void> {
    for (const file of template.files) {
      await this.generator.generate(file, targetDir, variables);
    }
  }

  /**
   * 验证目标目录
   */
  async validateTargetDir(targetDir: string, force: boolean = false): Promise<void> {
    const exists = await this.fs.exists(targetDir);

    if (exists) {
      const files = await this.fs.listFiles(targetDir);
      if (files.length > 0 && !force) {
        throw new Error(
          `目标目录不为空: ${targetDir}\n提示: 使用 --force 选项强制覆盖`
        );
      }
    }
  }

  /**
   * 获取模板预览信息
   */
  getPreview(template: Template, metadata: ProjectMetadata): TemplatePreview {
    const variables = this.prepareVariables(template, metadata);

    return {
      directories: template.directories,
      files: template.files.map((f) => ({
        path: f.targetPath,
        isTemplate: f.isTemplate,
      })),
      variables,
      estimatedFileCount: template.files.length,
      estimatedDirCount: template.directories.length,
    };
  }
}

/**
 * 模板预览信息
 */
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

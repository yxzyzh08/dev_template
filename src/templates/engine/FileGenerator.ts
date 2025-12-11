/**
 * 文件生成器
 *
 * 负责根据模板文件生成实际文件
 */

import path from 'path';
import { TemplateFile, TemplateVariables } from '@/types';
import { FileSystemHelper } from '@/infrastructure';
import { TemplateEngine } from './TemplateEngine';

export class FileGenerator {
  private fs: FileSystemHelper;
  private engine: TemplateEngine;

  constructor(fs?: FileSystemHelper, engine?: TemplateEngine) {
    this.fs = fs || new FileSystemHelper();
    this.engine = engine || new TemplateEngine();
  }

  /**
   * 生成单个文件
   */
  async generate(
    file: TemplateFile,
    targetDir: string,
    variables: TemplateVariables
  ): Promise<void> {
    const targetPath = path.join(targetDir, file.targetPath);

    // 确保目标文件的目录存在
    const targetDirPath = path.dirname(targetPath);
    await this.fs.ensureDir(targetDirPath);

    if (file.isTemplate) {
      // 模板文件：渲染后写入
      await this.generateFromTemplate(file, targetPath, variables);
    } else {
      // 普通文件：直接复制
      await this.copyStaticFile(file, targetPath);
    }
  }

  /**
   * 从模板生成文件
   */
  private async generateFromTemplate(
    file: TemplateFile,
    targetPath: string,
    variables: TemplateVariables
  ): Promise<void> {
    try {
      // 渲染模板内容
      const content = this.engine.render(file.content, variables);

      // 写入文件
      await this.fs.writeFile(targetPath, content);
    } catch (error) {
      throw new Error(
        `生成模板文件失败 ${file.targetPath}: ${
          error instanceof Error ? error.message : '未知错误'
        }`
      );
    }
  }

  /**
   * 复制静态文件
   */
  private async copyStaticFile(
    file: TemplateFile,
    targetPath: string
  ): Promise<void> {
    try {
      await this.fs.writeFile(targetPath, file.content);
    } catch (error) {
      throw new Error(
        `复制静态文件失败 ${file.targetPath}: ${
          error instanceof Error ? error.message : '未知错误'
        }`
      );
    }
  }

  /**
   * 批量生成文件
   */
  async generateBatch(
    files: TemplateFile[],
    targetDir: string,
    variables: TemplateVariables
  ): Promise<GenerateResult[]> {
    const results: GenerateResult[] = [];

    for (const file of files) {
      try {
        await this.generate(file, targetDir, variables);
        results.push({
          file: file.targetPath,
          success: true,
        });
      } catch (error) {
        results.push({
          file: file.targetPath,
          success: false,
          error: error instanceof Error ? error.message : '未知错误',
        });
      }
    }

    return results;
  }

  /**
   * 生成文件并返回内容（预览模式）
   */
  async preview(
    file: TemplateFile,
    variables: TemplateVariables
  ): Promise<string> {
    if (file.isTemplate) {
      return this.engine.render(file.content, variables);
    } else {
      return file.content;
    }
  }

  /**
   * 验证文件是否会被覆盖
   */
  async willOverwrite(
    file: TemplateFile,
    targetDir: string
  ): Promise<boolean> {
    const targetPath = path.join(targetDir, file.targetPath);
    return await this.fs.exists(targetPath);
  }

  /**
   * 获取将被覆盖的文件列表
   */
  async getOverwriteList(
    files: TemplateFile[],
    targetDir: string
  ): Promise<string[]> {
    const overwriteList: string[] = [];

    for (const file of files) {
      const willOverwrite = await this.willOverwrite(file, targetDir);
      if (willOverwrite) {
        overwriteList.push(file.targetPath);
      }
    }

    return overwriteList;
  }
}

/**
 * 文件生成结果
 */
interface GenerateResult {
  file: string;
  success: boolean;
  error?: string;
}

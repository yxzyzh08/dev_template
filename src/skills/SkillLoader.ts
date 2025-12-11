/**
 * Skills加载器
 *
 * 负责从文件系统加载技能文件
 */

import path from 'path';
import { Skill } from '@/types';
import { FileSystemHelper } from '@/infrastructure';

export class SkillLoader {
  private fs: FileSystemHelper;

  constructor(fs?: FileSystemHelper) {
    this.fs = fs || new FileSystemHelper();
  }

  /**
   * 从目录加载所有技能
   */
  async loadFromDirectory(dirPath: string): Promise<Skill[]> {
    const exists = await this.fs.exists(dirPath);
    if (!exists) {
      return [];
    }

    const files = await this.fs.listFiles(dirPath);
    const skillFiles = files.filter((f) => f.endsWith('.md'));

    const skills: Skill[] = [];
    for (const file of skillFiles) {
      // listFiles 已经返回完整路径，不需要再拼接
      const skill = await this.loadFromFile(file);
      if (skill) {
        skills.push(skill);
      }
    }

    return skills;
  }

  /**
   * 从单个文件加载技能
   */
  async loadFromFile(filePath: string): Promise<Skill | null> {
    try {
      const content = await this.fs.readFile(filePath);
      const fileName = path.basename(filePath, '.md');

      // 解析技能元数据
      const metadata = this.parseMetadata(content);

      return {
        id: metadata.id || fileName,
        name: metadata.name || this.formatSkillName(fileName),
        description: metadata.description || '',
        version: metadata.version || '1.0.0',
        content,
        filePath,
      };
    } catch (error) {
      console.error(`加载技能文件失败 ${filePath}:`, error);
      return null;
    }
  }

  /**
   * 解析技能文件的元数据
   */
  private parseMetadata(content: string): SkillMetadata {
    const metadata: SkillMetadata = {};

    // 从Markdown文件的第一个标题提取名称
    const titleMatch = content.match(/^#\s+(.+)$/m);
    if (titleMatch) {
      metadata.name = titleMatch[1].trim();
    }

    // 提取description（第一个段落）
    const descMatch = content.match(/^>\s*(.+)$/m);
    if (descMatch) {
      metadata.description = descMatch[1].trim();
    }

    // 提取YAML front matter（如果有）
    const frontMatterMatch = content.match(/^---\n([\s\S]+?)\n---/);
    if (frontMatterMatch) {
      const frontMatter = frontMatterMatch[1];
      const idMatch = frontMatter.match(/id:\s*(.+)/);
      const versionMatch = frontMatter.match(/version:\s*(.+)/);

      if (idMatch) metadata.id = idMatch[1].trim();
      if (versionMatch) metadata.version = versionMatch[1].trim();
    }

    return metadata;
  }

  /**
   * 格式化技能名称（kebab-case转换为标题）
   */
  private formatSkillName(kebabCase: string): string {
    return kebabCase
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  /**
   * 验证技能文件格式
   */
  async validateSkillFile(filePath: string): Promise<boolean> {
    try {
      const content = await this.fs.readFile(filePath);

      // 检查必需元素
      const hasTitle = /^#\s+.+$/m.test(content);
      const hasContent = content.trim().length > 0;

      return hasTitle && hasContent;
    } catch {
      return false;
    }
  }

  /**
   * 批量验证技能文件
   */
  async validateDirectory(dirPath: string): Promise<ValidationReport> {
    const files = await this.fs.listFiles(dirPath);
    const skillFiles = files.filter((f) => f.endsWith('.md'));

    const results: Array<{ file: string; valid: boolean }> = [];

    for (const file of skillFiles) {
      // listFiles 已经返回完整路径，不需要再拼接
      const valid = await this.validateSkillFile(file);
      const fileName = path.basename(file);
      results.push({ file: fileName, valid });
    }

    const validCount = results.filter((r) => r.valid).length;
    const invalidFiles = results.filter((r) => !r.valid).map((r) => r.file);

    return {
      totalFiles: skillFiles.length,
      validFiles: validCount,
      invalidFiles,
      allValid: invalidFiles.length === 0,
    };
  }
}

/**
 * 技能元数据
 */
interface SkillMetadata {
  id?: string;
  name?: string;
  description?: string;
  version?: string;
}

/**
 * 验证报告
 */
interface ValidationReport {
  totalFiles: number;
  validFiles: number;
  invalidFiles: string[];
  allValid: boolean;
}

/**
 * Skills复制器
 *
 * 负责将技能文件复制到目标项目
 */

import path from 'path';
import { Skill } from '@/types';
import { FileSystemHelper } from '@/infrastructure';

export class SkillCopier {
  private fs: FileSystemHelper;

  constructor(fs?: FileSystemHelper) {
    this.fs = fs || new FileSystemHelper();
  }

  /**
   * 复制技能到目标项目
   */
  async copySkills(skills: Skill[], targetProjectPath: string): Promise<void> {
    const targetSkillsDir = path.join(targetProjectPath, '.claude/skills');

    // 确保目标目录存在
    await this.fs.ensureDir(targetSkillsDir);

    // 复制每个技能文件
    for (const skill of skills) {
      await this.copySkill(skill, targetSkillsDir);
    }
  }

  /**
   * 复制单个技能文件
   */
  async copySkill(skill: Skill, targetDir: string): Promise<void> {
    const targetPath = path.join(targetDir, `${skill.id}.md`);

    try {
      await this.fs.writeFile(targetPath, skill.content);
    } catch (error) {
      throw new Error(
        `复制技能文件失败 ${skill.id}: ${
          error instanceof Error ? error.message : '未知错误'
        }`
      );
    }
  }

  /**
   * 从源目录复制到目标目录
   */
  async copyFromDirectory(
    sourceDir: string,
    targetProjectPath: string
  ): Promise<void> {
    const targetSkillsDir = path.join(targetProjectPath, '.claude/skills');

    // 确保源目录存在
    const sourceExists = await this.fs.exists(sourceDir);
    if (!sourceExists) {
      throw new Error(`源目录不存在: ${sourceDir}`);
    }

    // 确保目标目录存在
    await this.fs.ensureDir(targetSkillsDir);

    // 获取所有.md文件
    const files = await this.fs.listFiles(sourceDir);
    const skillFiles = files.filter((f) => f.endsWith('.md'));

    // 复制文件
    for (const file of skillFiles) {
      const sourcePath = path.join(sourceDir, file);
      const targetPath = path.join(targetSkillsDir, file);
      await this.fs.copy(sourcePath, targetPath);
    }
  }

  /**
   * 检查是否需要覆盖
   */
  async checkOverwrite(
    skills: Skill[],
    targetProjectPath: string
  ): Promise<string[]> {
    const targetSkillsDir = path.join(targetProjectPath, '.claude/skills');
    const overwriteFiles: string[] = [];

    for (const skill of skills) {
      const targetPath = path.join(targetSkillsDir, `${skill.id}.md`);
      const exists = await this.fs.exists(targetPath);
      if (exists) {
        overwriteFiles.push(`${skill.id}.md`);
      }
    }

    return overwriteFiles;
  }

  /**
   * 复制技能并返回结果
   */
  async copySkillsWithReport(
    skills: Skill[],
    targetProjectPath: string
  ): Promise<CopyReport> {
    const results: CopyResult[] = [];
    const targetSkillsDir = path.join(targetProjectPath, '.claude/skills');

    await this.fs.ensureDir(targetSkillsDir);

    for (const skill of skills) {
      try {
        await this.copySkill(skill, targetSkillsDir);
        results.push({
          skillId: skill.id,
          success: true,
        });
      } catch (error) {
        results.push({
          skillId: skill.id,
          success: false,
          error: error instanceof Error ? error.message : '未知错误',
        });
      }
    }

    const successCount = results.filter((r) => r.success).length;
    const failedSkills = results.filter((r) => !r.success).map((r) => r.skillId);

    return {
      total: skills.length,
      succeeded: successCount,
      failed: failedSkills.length,
      failedSkills,
      results,
    };
  }

  /**
   * 备份现有技能文件
   */
  async backupExistingSkills(targetProjectPath: string): Promise<string> {
    const skillsDir = path.join(targetProjectPath, '.claude/skills');
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const backupDir = path.join(
      targetProjectPath,
      '.claude',
      `skills-backup-${timestamp}`
    );

    const exists = await this.fs.exists(skillsDir);
    if (!exists) {
      return backupDir;
    }

    await this.fs.copy(skillsDir, backupDir);
    return backupDir;
  }

  /**
   * 清理目标技能目录
   */
  async cleanTargetDirectory(targetProjectPath: string): Promise<void> {
    const skillsDir = path.join(targetProjectPath, '.claude/skills');
    const exists = await this.fs.exists(skillsDir);

    if (exists) {
      await this.fs.remove(skillsDir);
    }

    await this.fs.ensureDir(skillsDir);
  }
}

/**
 * 复制结果
 */
interface CopyResult {
  skillId: string;
  success: boolean;
  error?: string;
}

/**
 * 复制报告
 */
interface CopyReport {
  total: number;
  succeeded: number;
  failed: number;
  failedSkills: string[];
  results: CopyResult[];
}

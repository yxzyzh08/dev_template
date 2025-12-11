/**
 * Skills管理器
 *
 * 负责管理Claude技能文件
 */

import path from 'path';
import { Skill } from '@/types';
import { FileSystemHelper } from '@/infrastructure';
import { SkillLoader } from './SkillLoader';
import { SkillCopier } from './SkillCopier';

export class SkillManager {
  private fs: FileSystemHelper;
  private loader: SkillLoader;
  private copier: SkillCopier;
  private skills: Map<string, Skill>;

  constructor(
    fs?: FileSystemHelper,
    loader?: SkillLoader,
    copier?: SkillCopier
  ) {
    this.fs = fs || new FileSystemHelper();
    this.loader = loader || new SkillLoader(this.fs);
    this.copier = copier || new SkillCopier(this.fs);
    this.skills = new Map();
  }

  /**
   * 加载所有可用的技能
   */
  async loadAvailableSkills(): Promise<void> {
    const skillsDir = path.join(__dirname, '../../assets/skills');
    const skills = await this.loader.loadFromDirectory(skillsDir);

    for (const skill of skills) {
      this.skills.set(skill.id, skill);
    }
  }

  /**
   * 获取技能
   */
  get(id: string): Skill | undefined {
    return this.skills.get(id);
  }

  /**
   * 获取所有技能
   */
  getAll(): Skill[] {
    return Array.from(this.skills.values());
  }

  /**
   * 检查技能是否存在
   */
  has(id: string): boolean {
    return this.skills.has(id);
  }

  /**
   * 复制技能到目标项目
   */
  async copyToProject(
    skillIds: string[],
    targetProjectPath: string
  ): Promise<void> {
    const skillsToCopy: Skill[] = [];

    for (const id of skillIds) {
      const skill = this.get(id);
      if (!skill) {
        throw new Error(`技能不存在: ${id}`);
      }
      skillsToCopy.push(skill);
    }

    await this.copier.copySkills(skillsToCopy, targetProjectPath);
  }

  /**
   * 复制所有技能到目标项目
   */
  async copyAllToProject(targetProjectPath: string): Promise<void> {
    const allSkills = this.getAll();
    await this.copier.copySkills(allSkills, targetProjectPath);
  }

  /**
   * 验证项目的技能配置
   */
  async validateProjectSkills(projectPath: string): Promise<ValidationResult> {
    const skillsDir = path.join(projectPath, '.claude/skills');
    const exists = await this.fs.exists(skillsDir);

    if (!exists) {
      return {
        valid: false,
        message: '.claude/skills目录不存在',
        missingSkills: this.getAll().map((s) => s.id),
      };
    }

    const projectSkills = await this.loader.loadFromDirectory(skillsDir);
    const projectSkillIds = new Set(projectSkills.map((s) => s.id));
    const expectedSkillIds = new Set(this.getAll().map((s) => s.id));

    const missingSkills = Array.from(expectedSkillIds).filter(
      (id) => !projectSkillIds.has(id)
    );

    if (missingSkills.length > 0) {
      return {
        valid: false,
        message: `缺少${missingSkills.length}个技能文件`,
        missingSkills,
      };
    }

    return {
      valid: true,
      message: '技能配置完整',
      missingSkills: [],
    };
  }

  /**
   * 获取技能数量
   */
  count(): number {
    return this.skills.size;
  }

  /**
   * 列出所有技能ID
   */
  listIds(): string[] {
    return Array.from(this.skills.keys());
  }

  /**
   * 获取推荐的技能集合（默认4个核心技能）
   */
  getRecommendedSkills(): string[] {
    return [
      'requirements-analyzer',
      'architecture-designer',
      'developer-guide',
      'test-planner',
    ];
  }
}

/**
 * 验证结果
 */
interface ValidationResult {
  valid: boolean;
  message: string;
  missingSkills: string[];
}

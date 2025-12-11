/**
 * 配置管理器
 *
 * 负责加载、保存和管理项目配置
 */

import path from 'path';
import {
  ProjectConfigSchema,
  DefaultConfig,
  CONFIG_FILE_NAME,
} from './schema';
import { ConfigValidator, ValidationResult } from './ConfigValidator';
import { FileSystemHelper } from '@/infrastructure';

export class ConfigManager {
  private fs: FileSystemHelper;
  private validator: ConfigValidator;
  private config: ProjectConfigSchema | null = null;

  constructor(fs?: FileSystemHelper, validator?: ConfigValidator) {
    this.fs = fs || new FileSystemHelper();
    this.validator = validator || new ConfigValidator();
  }

  /**
   * 加载配置文件
   */
  async load(projectPath: string): Promise<ProjectConfigSchema> {
    const configPath = path.join(projectPath, CONFIG_FILE_NAME);

    try {
      const configData = await this.fs.readJson(configPath);
      const config = this.mergeWithDefaults(configData);

      // 验证配置
      const validation = this.validator.validate(config);
      if (!validation.valid) {
        throw new Error(
          `配置验证失败:\n${validation.errors.map((e) => `- ${e.field}: ${e.message}`).join('\n')}`
        );
      }

      this.config = config;
      return config;
    } catch (error) {
      if (error instanceof Error && error.message.includes('ENOENT')) {
        throw new Error(`配置文件不存在: ${configPath}`);
      }
      throw error;
    }
  }

  /**
   * 保存配置文件
   */
  async save(projectPath: string, config: ProjectConfigSchema): Promise<void> {
    // 验证配置
    const validation = this.validator.validate(config);
    if (!validation.valid) {
      throw new Error(
        `配置验证失败:\n${validation.errors.map((e) => `- ${e.field}: ${e.message}`).join('\n')}`
      );
    }

    const configPath = path.join(projectPath, CONFIG_FILE_NAME);

    try {
      await this.fs.writeJson(configPath, config, { spaces: 2 });
      this.config = config;
    } catch (error) {
      throw new Error(
        `保存配置文件失败: ${error instanceof Error ? error.message : '未知错误'}`
      );
    }
  }

  /**
   * 创建默认配置文件
   */
  async createDefault(projectPath: string, overrides?: Partial<ProjectConfigSchema>): Promise<ProjectConfigSchema> {
    const config: ProjectConfigSchema = {
      ...DefaultConfig,
      ...overrides,
    } as ProjectConfigSchema;

    await this.save(projectPath, config);
    return config;
  }

  /**
   * 获取当前配置
   */
  getConfig(): ProjectConfigSchema | null {
    return this.config;
  }

  /**
   * 更新配置
   */
  async update(
    projectPath: string,
    updates: Partial<ProjectConfigSchema>
  ): Promise<ProjectConfigSchema> {
    const currentConfig = await this.load(projectPath);
    const newConfig = this.deepMerge(currentConfig, updates);

    await this.save(projectPath, newConfig);
    return newConfig;
  }

  /**
   * 验证配置
   */
  validate(config: ProjectConfigSchema): ValidationResult {
    return this.validator.validate(config);
  }

  /**
   * 检查配置文件是否存在
   */
  async exists(projectPath: string): Promise<boolean> {
    const configPath = path.join(projectPath, CONFIG_FILE_NAME);
    return await this.fs.exists(configPath);
  }

  /**
   * 获取配置文件路径
   */
  getConfigPath(projectPath: string): string {
    return path.join(projectPath, CONFIG_FILE_NAME);
  }

  /**
   * 合并默认配置
   */
  private mergeWithDefaults(config: Partial<ProjectConfigSchema>): ProjectConfigSchema {
    return this.deepMerge(DefaultConfig, config) as ProjectConfigSchema;
  }

  /**
   * 深度合并对象
   */
  private deepMerge(target: any, source: any): any {
    const result = { ...target };

    for (const key in source) {
      if (source[key] instanceof Object && key in target) {
        result[key] = this.deepMerge(target[key], source[key]);
      } else {
        result[key] = source[key];
      }
    }

    return result;
  }

  /**
   * 导出配置为JSON字符串
   */
  export(config: ProjectConfigSchema): string {
    return JSON.stringify(config, null, 2);
  }

  /**
   * 从JSON字符串导入配置
   */
  import(jsonString: string): ProjectConfigSchema {
    try {
      const config = JSON.parse(jsonString);
      const validation = this.validator.validate(config);

      if (!validation.valid) {
        throw new Error(
          `配置验证失败:\n${validation.errors.map((e) => `- ${e.field}: ${e.message}`).join('\n')}`
        );
      }

      return config;
    } catch (error) {
      throw new Error(
        `导入配置失败: ${error instanceof Error ? error.message : '未知错误'}`
      );
    }
  }
}

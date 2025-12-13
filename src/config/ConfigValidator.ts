/**
 * 配置验证器
 *
 * 验证项目配置的正确性
 */

import {
  ProjectConfigSchema,
  ConfigValidationRules,
} from './schema';

export class ConfigValidator {
  /**
   * 验证完整配置
   */
  validate(config: ProjectConfigSchema): ValidationResult {
    const errors: ValidationError[] = [];

    // 验证项目信息
    if (config.project) {
      errors.push(...this.validateProject(config.project));
    } else {
      errors.push({
        field: 'project',
        message: '缺少项目配置',
      });
    }

    // 验证作者信息
    if (config.author) {
      errors.push(...this.validateAuthor(config.author));
    }

    // 验证Git配置
    if (config.git) {
      errors.push(...this.validateGit(config.git));
    }

    // 验证安装配置
    if (config.install) {
      errors.push(...this.validateInstall(config.install));
    }

    return {
      valid: errors.length === 0,
      errors,
    };
  }

  /**
   * 验证项目配置
   */
  private validateProject(project: ProjectConfigSchema['project']): ValidationError[] {
    const errors: ValidationError[] = [];

    // 验证项目名称
    if (!project.name) {
      errors.push({
        field: 'project.name',
        message: '项目名称不能为空',
      });
    } else {
      const nameRule = ConfigValidationRules.projectName;
      if (project.name.length < nameRule.minLength) {
        errors.push({
          field: 'project.name',
          message: `项目名称至少${nameRule.minLength}个字符`,
        });
      }
      if (project.name.length > nameRule.maxLength) {
        errors.push({
          field: 'project.name',
          message: `项目名称最多${nameRule.maxLength}个字符`,
        });
      }
      if (!nameRule.pattern.test(project.name)) {
        errors.push({
          field: 'project.name',
          message: nameRule.message,
        });
      }
    }

    // 验证项目类型
    const validTypes = ['web-fullstack', 'frontend-demo', 'mobile-app', 'backend-api', 'cli-tool'];
    if (!validTypes.includes(project.type)) {
      errors.push({
        field: 'project.type',
        message: `项目类型必须是: ${validTypes.join(', ')}`,
      });
    }

    // 验证版本号
    if (!project.version) {
      errors.push({
        field: 'project.version',
        message: '版本号不能为空',
      });
    } else if (!ConfigValidationRules.version.pattern.test(project.version)) {
      errors.push({
        field: 'project.version',
        message: ConfigValidationRules.version.message,
      });
    }

    return errors;
  }

  /**
   * 验证作者配置
   */
  private validateAuthor(author: ProjectConfigSchema['author']): ValidationError[] {
    const errors: ValidationError[] = [];

    if (!author) return errors;

    if (!author.name || author.name.trim() === '') {
      errors.push({
        field: 'author.name',
        message: '作者名称不能为空',
      });
    }

    if (author.email && !ConfigValidationRules.email.pattern.test(author.email)) {
      errors.push({
        field: 'author.email',
        message: ConfigValidationRules.email.message,
      });
    }

    return errors;
  }

  /**
   * 验证Git配置
   */
  private validateGit(git: ProjectConfigSchema['git']): ValidationError[] {
    const errors: ValidationError[] = [];

    if (!git) return errors;

    if (git.remote && !ConfigValidationRules.gitRemote.pattern.test(git.remote)) {
      errors.push({
        field: 'git.remote',
        message: ConfigValidationRules.gitRemote.message,
      });
    }

    return errors;
  }

  /**
   * 验证安装配置
   */
  private validateInstall(install: ProjectConfigSchema['install']): ValidationError[] {
    const errors: ValidationError[] = [];

    if (!install) return errors;

    const validManagers = ['npm', 'yarn', 'pnpm'];
    if (install.manager && !validManagers.includes(install.manager)) {
      errors.push({
        field: 'install.manager',
        message: `包管理器必须是: ${validManagers.join(', ')}`,
      });
    }

    return errors;
  }

  /**
   * 验证单个字段
   */
  validateField(field: string, value: any): ValidationError | null {
    switch (field) {
      case 'project.name':
        if (!value) return { field, message: '项目名称不能为空' };
        if (!ConfigValidationRules.projectName.pattern.test(value)) {
          return { field, message: ConfigValidationRules.projectName.message };
        }
        break;

      case 'project.version':
        if (!value) return { field, message: '版本号不能为空' };
        if (!ConfigValidationRules.version.pattern.test(value)) {
          return { field, message: ConfigValidationRules.version.message };
        }
        break;

      case 'author.email':
        if (value && !ConfigValidationRules.email.pattern.test(value)) {
          return { field, message: ConfigValidationRules.email.message };
        }
        break;

      case 'git.remote':
        if (value && !ConfigValidationRules.gitRemote.pattern.test(value)) {
          return { field, message: ConfigValidationRules.gitRemote.message };
        }
        break;
    }

    return null;
  }
}

/**
 * 验证结果
 */
export interface ValidationResult {
  valid: boolean;
  errors: ValidationError[];
}

/**
 * 验证错误
 */
export interface ValidationError {
  field: string;
  message: string;
}

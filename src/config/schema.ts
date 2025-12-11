/**
 * 配置Schema定义
 *
 * 定义项目配置的结构和验证规则
 */

import { ProjectType } from '@/types';

/**
 * 项目配置Schema
 */
export interface ProjectConfigSchema {
  // 项目基本信息
  project: {
    name: string;
    type: ProjectType;
    version: string;
    description?: string;
  };

  // 作者信息
  author?: {
    name: string;
    email?: string;
  };

  // Git配置
  git?: {
    enabled: boolean;
    remote?: string;
  };

  // 依赖安装
  install?: {
    enabled: boolean;
    manager?: 'npm' | 'yarn' | 'pnpm';
  };

  // 模板配置
  template?: {
    id: string;
    version: string;
    customVariables?: Record<string, any>;
  };

  // Skills配置
  skills?: {
    enabled: boolean;
    list?: string[];
  };

  // 文档配置
  documentation?: {
    enabled: boolean;
    outputDir?: string;
  };

  // 自定义配置
  custom?: Record<string, any>;
}

/**
 * 配置验证规则
 */
export const ConfigValidationRules = {
  // 项目名称规则
  projectName: {
    minLength: 1,
    maxLength: 100,
    pattern: /^[a-zA-Z0-9-_]+$/,
    message: '项目名称只能包含字母、数字、横线和下划线',
  },

  // 版本号规则
  version: {
    pattern: /^\d+\.\d+\.\d+$/,
    message: '版本号必须符合 semver 格式 (例如: 1.0.0)',
  },

  // 邮箱规则
  email: {
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    message: '邮箱格式不正确',
  },

  // Git远程仓库规则
  gitRemote: {
    pattern: /^(https?:\/\/|git@).+\.git$/,
    message: 'Git远程仓库地址格式不正确',
  },
};

/**
 * 默认配置
 */
export const DefaultConfig: Partial<ProjectConfigSchema> = {
  project: {
    name: 'my-project',
    type: 'web-fullstack',
    version: '0.1.0',
  },
  git: {
    enabled: true,
  },
  install: {
    enabled: true,
    manager: 'npm',
  },
  skills: {
    enabled: true,
    list: [
      'requirements-analyzer',
      'architecture-designer',
      'developer-guide',
      'test-planner',
    ],
  },
  documentation: {
    enabled: true,
    outputDir: 'docs',
  },
};

/**
 * 配置文件名
 */
export const CONFIG_FILE_NAME = '.ai-dev.json';

/**
 * 配置文件路径（相对于项目根目录）
 */
export const CONFIG_FILE_PATH = `./${CONFIG_FILE_NAME}`;

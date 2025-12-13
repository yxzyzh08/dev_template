/**
 * 项目类型选择提示
 */

import prompts from 'prompts';
import { ProjectType } from '@/types';

export interface ProjectTypeChoice {
  type: ProjectType;
  name: string;
  description: string;
}

/**
 * 项目类型选项
 */
const PROJECT_TYPE_CHOICES: ProjectTypeChoice[] = [
  {
    type: 'web-fullstack',
    name: 'Web全栈应用',
    description: '前后端分离的Web应用，包含前端和后端代码',
  },
  {
    type: 'frontend-demo',
    name: '纯前端项目',
    description: 'Demo演示、原型开发、静态网站等纯前端项目',
  },
  {
    type: 'mobile-app',
    name: '移动应用',
    description: 'iOS/Android移动应用（React Native/Flutter）',
  },
  {
    type: 'backend-api',
    name: '后端API服务',
    description: 'RESTful API或GraphQL后端服务',
  },
  {
    type: 'cli-tool',
    name: '命令行工具',
    description: 'CLI工具或命令行应用',
  },
];

/**
 * 提示用户选择项目类型
 */
export async function promptProjectType(): Promise<ProjectType | null> {
  const response = await prompts({
    type: 'select',
    name: 'projectType',
    message: '请选择项目类型',
    choices: PROJECT_TYPE_CHOICES.map((choice) => ({
      title: choice.name,
      description: choice.description,
      value: choice.type,
    })),
    initial: 0,
  });

  // 用户取消了选择
  if (!response.projectType) {
    return null;
  }

  return response.projectType;
}

/**
 * 获取项目类型的描述
 */
export function getProjectTypeDescription(type: ProjectType): string {
  const choice = PROJECT_TYPE_CHOICES.find((c) => c.type === type);
  return choice?.description || '';
}

/**
 * 获取项目类型的名称
 */
export function getProjectTypeName(type: ProjectType): string {
  const choice = PROJECT_TYPE_CHOICES.find((c) => c.type === type);
  return choice?.name || type;
}

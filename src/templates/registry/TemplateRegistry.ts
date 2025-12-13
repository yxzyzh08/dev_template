/**
 * 模板注册中心
 *
 * 负责管理所有可用的项目模板
 */

import { Template, ProjectType } from '@/types';
import { WebFullstackTemplate } from './templates/WebFullstackTemplate';
import { FrontendDemoTemplate } from './templates/FrontendDemoTemplate';

export class TemplateRegistry {
  private templates: Map<string, Template>;

  constructor() {
    this.templates = new Map();
    this.registerDefaultTemplates();
  }

  /**
   * 注册默认模板
   */
  private registerDefaultTemplates(): void {
    const webFullstack = new WebFullstackTemplate();
    this.register(webFullstack.getTemplate());

    const frontendDemo = new FrontendDemoTemplate();
    this.register(frontendDemo.getTemplate());
  }

  /**
   * 注册模板
   */
  register(template: Template): void {
    if (this.templates.has(template.id)) {
      throw new Error(`模板已存在: ${template.id}`);
    }
    this.templates.set(template.id, template);
  }

  /**
   * 获取模板
   */
  getById(id: string): Template | undefined {
    return this.templates.get(id);
  }

  /**
   * 根据项目类型获取模板
   */
  getByType(type: ProjectType): Template | undefined {
    for (const template of this.templates.values()) {
      if (template.type === type) {
        return template;
      }
    }
    return undefined;
  }

  /**
   * 获取所有模板
   */
  getAll(): Template[] {
    return Array.from(this.templates.values());
  }

  /**
   * 获取所有模板ID
   */
  getAllIds(): string[] {
    return Array.from(this.templates.keys());
  }

  /**
   * 检查模板是否存在
   */
  has(id: string): boolean {
    return this.templates.has(id);
  }

  /**
   * 获取模板数量
   */
  count(): number {
    return this.templates.size;
  }

  /**
   * 列出所有项目类型
   */
  listTypes(): ProjectType[] {
    const types = new Set<ProjectType>();
    for (const template of this.templates.values()) {
      types.add(template.type);
    }
    return Array.from(types);
  }
}

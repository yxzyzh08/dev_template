/**
 * 模板引擎
 *
 * 基于Handlebars的模板渲染引擎
 */

import Handlebars from 'handlebars';
import { TemplateVariables } from '@/types';

export class TemplateEngine {
  private handlebars: typeof Handlebars;

  constructor() {
    this.handlebars = Handlebars.create();
    this.registerHelpers();
  }

  /**
   * 注册Handlebars辅助函数
   */
  private registerHelpers(): void {
    // 日期格式化
    this.handlebars.registerHelper('formatDate', (date: Date) => {
      return date.toISOString().split('T')[0];
    });

    // 当前年份
    this.handlebars.registerHelper('currentYear', () => {
      return new Date().getFullYear();
    });

    // 大写首字母
    this.handlebars.registerHelper('capitalize', (str: string) => {
      if (!str) return '';
      return str.charAt(0).toUpperCase() + str.slice(1);
    });

    // 转换为kebab-case
    this.handlebars.registerHelper('kebabCase', (str: string) => {
      if (!str) return '';
      return str
        .replace(/([a-z])([A-Z])/g, '$1-$2')
        .replace(/[\s_]+/g, '-')
        .toLowerCase();
    });

    // 转换为PascalCase
    this.handlebars.registerHelper('pascalCase', (str: string) => {
      if (!str) return '';
      return str
        .replace(/[-_\s]+(.)?/g, (_, c) => (c ? c.toUpperCase() : ''))
        .replace(/^(.)/, (c) => c.toUpperCase());
    });

    // 转换为camelCase
    this.handlebars.registerHelper('camelCase', (str: string) => {
      if (!str) return '';
      return str
        .replace(/[-_\s]+(.)?/g, (_, c) => (c ? c.toUpperCase() : ''))
        .replace(/^(.)/, (c) => c.toLowerCase());
    });

    // 条件相等
    this.handlebars.registerHelper('eq', (a: any, b: any) => {
      return a === b;
    });

    // JSON字符串化
    this.handlebars.registerHelper('json', (obj: any, indent?: number) => {
      return JSON.stringify(obj, null, indent || 2);
    });
  }

  /**
   * 渲染模板字符串
   */
  render(templateString: string, variables: TemplateVariables): string {
    try {
      const template = this.handlebars.compile(templateString);
      return template(variables);
    } catch (error) {
      throw new Error(`模板渲染失败: ${error instanceof Error ? error.message : '未知错误'}`);
    }
  }

  /**
   * 预编译模板（用于性能优化）
   */
  compile(templateString: string): HandlebarsTemplateDelegate {
    try {
      return this.handlebars.compile(templateString);
    } catch (error) {
      throw new Error(`模板编译失败: ${error instanceof Error ? error.message : '未知错误'}`);
    }
  }

  /**
   * 批量渲染模板
   */
  renderBatch(
    templates: Array<{ template: string; variables: TemplateVariables }>
  ): string[] {
    return templates.map(({ template, variables }) => this.render(template, variables));
  }

  /**
   * 注册自定义Helper
   */
  registerHelper(name: string, fn: Handlebars.HelperDelegate): void {
    this.handlebars.registerHelper(name, fn);
  }

  /**
   * 注册Partial
   */
  registerPartial(name: string, partial: string): void {
    this.handlebars.registerPartial(name, partial);
  }

  /**
   * 取消注册Helper
   */
  unregisterHelper(name: string): void {
    this.handlebars.unregisterHelper(name);
  }

  /**
   * 取消注册Partial
   */
  unregisterPartial(name: string): void {
    this.handlebars.unregisterPartial(name);
  }
}

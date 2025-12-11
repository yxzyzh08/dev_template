#!/usr/bin/env node

/**
 * AI超级个体开发模板 CLI入口
 *
 * 使用Commander.js构建CLI应用
 */

import { Command } from 'commander';
import {
  executeInitCommand,
  executeGeneratePRDCommand,
  executeValidateCommand,
} from './commands';

const program = new Command();

// CLI元信息
program
  .name('ai-dev')
  .version('1.0.0')
  .description('AI超级个体开发模板系统 - 深度集成Claude Code的标准化开发流程工具');

// init命令
program
  .command('init [project-name]')
  .description('初始化新项目')
  .option('-t, --type <type>', '项目类型 (web-fullstack|mobile-app|backend-api|cli-tool)')
  .option('--no-git', '跳过Git初始化')
  .option('--no-install', '跳过依赖安装')
  .option('--non-interactive', '非交互模式')
  .option('-f, --force', '强制覆盖已存在的目录')
  .action(async (projectName, options) => {
    await executeInitCommand(projectName, options);
  });

// generate-prd命令
program
  .command('generate-prd')
  .description('生成产品需求文档（PRD）')
  .option('-o, --output <path>', '输出目录', 'docs/PRD')
  .option('-f, --force', '强制覆盖已存在的PRD')
  .option('--skip-render', '跳过Mermaid图片渲染')
  .action(async (options) => {
    await executeGeneratePRDCommand(options);
  });

// validate命令
program
  .command('validate')
  .description('验证项目结构和文档完整性')
  .option('--phase <phase>', '验证特定阶段 (requirements|architecture|implementation|testing)')
  .option('--strict', '严格模式（警告视为错误）')
  .option('--fix', '自动修复问题')
  .action(async (options) => {
    await executeValidateCommand(options);
  });

// 解析命令行参数
program.parse(process.argv);

// 如果没有提供命令，显示帮助
if (!process.argv.slice(2).length) {
  program.outputHelp();
}

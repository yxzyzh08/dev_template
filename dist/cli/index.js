#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const commands_1 = require("./commands");
const program = new commander_1.Command();
program
    .name('ai-dev')
    .version('1.0.0')
    .description('AI超级个体开发模板系统 - 深度集成Claude Code的标准化开发流程工具');
program
    .command('init [project-name]')
    .description('初始化新项目')
    .option('-t, --type <type>', '项目类型 (web-fullstack|mobile-app|backend-api|cli-tool)')
    .option('--no-git', '跳过Git初始化')
    .option('--no-install', '跳过依赖安装')
    .option('--non-interactive', '非交互模式')
    .option('-f, --force', '强制覆盖已存在的目录')
    .action(async (projectName, options) => {
    await (0, commands_1.executeInitCommand)(projectName, options);
});
program
    .command('generate-prd')
    .description('生成产品需求文档（PRD）')
    .option('-o, --output <path>', '输出目录', 'docs/PRD')
    .option('-f, --force', '强制覆盖已存在的PRD')
    .option('--skip-render', '跳过Mermaid图片渲染')
    .action(async (options) => {
    await (0, commands_1.executeGeneratePRDCommand)(options);
});
program
    .command('validate')
    .description('验证项目结构和文档完整性')
    .option('--phase <phase>', '验证特定阶段 (requirements|architecture|implementation|testing)')
    .option('--strict', '严格模式（警告视为错误）')
    .option('--fix', '自动修复问题')
    .action(async (options) => {
    await (0, commands_1.executeValidateCommand)(options);
});
program.parse(process.argv);
if (!process.argv.slice(2).length) {
    program.outputHelp();
}
//# sourceMappingURL=index.js.map
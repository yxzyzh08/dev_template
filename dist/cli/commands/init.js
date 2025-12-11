"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.executeInitCommand = executeInitCommand;
const application_1 = require("../../application");
const ui_1 = require("../ui");
const prompts_1 = require("../prompts");
async function executeInitCommand(projectName, options) {
    const logger = new ui_1.Logger();
    try {
        logger.title('🚀 AI超级个体开发模板 v1.0.0');
        logger.log('');
        const metadata = await collectProjectMetadata(projectName, options, logger);
        if (!metadata) {
            logger.warn('初始化已取消');
            process.exit(0);
        }
        displaySummary(metadata, logger);
        if (!options.nonInteractive) {
            const confirmed = await (0, prompts_1.promptConfirm)('确认开始初始化？', true);
            if (!confirmed) {
                logger.warn('初始化已取消');
                process.exit(0);
            }
        }
        logger.log('');
        const workflow = new application_1.InitWorkflow();
        const result = await workflow.execute(metadata);
        if (!result.success) {
            logger.error(`初始化失败: ${result.error}`);
            process.exit(1);
        }
        displayNextSteps(metadata, logger);
    }
    catch (error) {
        logger.error(error instanceof Error ? error : new Error('未知错误'));
        process.exit(1);
    }
}
async function collectProjectMetadata(projectName, options, logger) {
    let name = projectName;
    let type = options.type;
    if (!name) {
        const path = require('path');
        const currentDir = process.cwd();
        name = path.basename(currentDir);
        logger.log(`📁 在当前目录初始化项目: ${name}`);
        logger.log('');
    }
    if (options.nonInteractive) {
        if (!type) {
            throw new Error('非交互模式下必须提供项目类型 (--type)');
        }
        return {
            projectName: name,
            projectType: type,
            gitEnabled: options.git,
            installDeps: options.install,
            customVariables: {
                initInCurrentDir: !projectName,
            },
        };
    }
    if (!type) {
        const selectedType = await (0, prompts_1.promptProjectType)();
        if (!selectedType) {
            return null;
        }
        type = selectedType;
    }
    const description = await (0, prompts_1.promptProjectDescription)();
    const author = await (0, prompts_1.promptAuthor)();
    return {
        projectName: name,
        projectType: type,
        description: description || undefined,
        author: author || undefined,
        gitEnabled: options.git,
        installDeps: options.install,
        customVariables: {
            initInCurrentDir: !projectName,
        },
    };
}
function displaySummary(metadata, logger) {
    logger.log('📋 项目配置摘要:');
    logger.log('');
    logger.log(`  项目名称: ${metadata.projectName}`);
    logger.log(`  项目类型: ${(0, prompts_1.getProjectTypeName)(metadata.projectType)}`);
    if (metadata.description) {
        logger.log(`  项目描述: ${metadata.description}`);
    }
    if (metadata.author) {
        logger.log(`  作者: ${metadata.author}`);
    }
    logger.log(`  Git初始化: ${metadata.gitEnabled !== false ? '是' : '否'}`);
    logger.log(`  安装依赖: ${metadata.installDeps !== false ? '是' : '否'}`);
    logger.log('');
}
function displayNextSteps(metadata, logger) {
    const initInCurrentDir = metadata.customVariables?.initInCurrentDir === true;
    logger.log('');
    logger.log('📚 推荐阅读:');
    if (initInCurrentDir) {
        logger.log(`   ./README.md - 项目说明`);
        logger.log(`   ./CLAUDE.md - AI辅助开发流程`);
        logger.log(`   ./docs/00-项目概览.md - 项目概览`);
    }
    else {
        logger.log(`   ${metadata.projectName}/README.md - 项目说明`);
        logger.log(`   ${metadata.projectName}/CLAUDE.md - AI辅助开发流程`);
        logger.log(`   ${metadata.projectName}/docs/00-项目概览.md - 项目概览`);
    }
    logger.log('');
    logger.log('🎯 开始开发:');
    logger.log('   1. 使用Claude进行需求分析（调用 requirements-analyzer skill）');
    logger.log('   2. 设计系统架构（调用 architecture-designer skill）');
    logger.log('   3. 开始编写代码（调用 developer-guide skill）');
    logger.log('   4. 编写测试用例（调用 test-planner skill）');
    logger.log('');
    logger.log('💡 提示: 所有AI技能已安装到 .claude/skills/ 目录');
    logger.log('');
}
//# sourceMappingURL=init.js.map
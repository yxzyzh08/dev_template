/**
 * init命令实现
 *
 * 初始化新项目
 */

import { ProjectMetadata, ProjectType } from '@/types';
import { InitWorkflow } from '@/application';
import { Logger } from '@/cli/ui';
import {
  promptProjectType,
  promptProjectName,
  promptProjectDescription,
  promptAuthor,
  promptConfirm,
  getProjectTypeName,
} from '@/cli/prompts';

export interface InitCommandOptions {
  type?: ProjectType;
  git?: boolean;
  install?: boolean;
  nonInteractive?: boolean;
  force?: boolean;
}

/**
 * 执行init命令
 */
export async function executeInitCommand(
  projectName: string | undefined,
  options: InitCommandOptions
): Promise<void> {
  const logger = new Logger();

  try {
    logger.title('🚀 AI超级个体开发模板 v1.0.0');
    logger.log('');

    // 1. 收集项目信息
    const metadata = await collectProjectMetadata(projectName, options, logger);

    if (!metadata) {
      logger.warn('初始化已取消');
      process.exit(0);
    }

    // 2. 显示配置摘要
    displaySummary(metadata, logger);

    // 3. 确认开始
    if (!options.nonInteractive) {
      const confirmed = await promptConfirm('确认开始初始化？', true);
      if (!confirmed) {
        logger.warn('初始化已取消');
        process.exit(0);
      }
    }

    logger.log('');

    // 4. 执行初始化工作流
    const workflow = new InitWorkflow();
    const result = await workflow.execute(metadata);

    if (!result.success) {
      logger.error(`初始化失败: ${result.error}`);
      process.exit(1);
    }

    // 5. 显示后续步骤
    displayNextSteps(metadata, logger);

  } catch (error) {
    logger.error(error instanceof Error ? error : new Error('未知错误'));
    process.exit(1);
  }
}

/**
 * 收集项目元数据
 */
async function collectProjectMetadata(
  projectName: string | undefined,
  options: InitCommandOptions,
  logger: Logger
): Promise<ProjectMetadata | null> {
  let name = projectName;
  let type = options.type;

  // 非交互模式：必须提供所有必需参数
  if (options.nonInteractive) {
    if (!name) {
      throw new Error('非交互模式下必须提供项目名称');
    }
    if (!type) {
      throw new Error('非交互模式下必须提供项目类型 (--type)');
    }

    return {
      projectName: name,
      projectType: type,
      gitEnabled: options.git,
      installDeps: options.install,
    };
  }

  // 交互模式：提示用户输入缺少的信息

  // 1. 项目名称
  if (!name) {
    const inputName = await promptProjectName();
    if (!inputName) {
      return null; // 用户取消
    }
    name = inputName;
  }

  // 2. 项目类型
  if (!type) {
    const selectedType = await promptProjectType();
    if (!selectedType) {
      return null; // 用户取消
    }
    type = selectedType;
  }

  // 3. 项目描述（可选）
  const description = await promptProjectDescription();

  // 4. 作者（可选）
  const author = await promptAuthor();

  return {
    projectName: name,
    projectType: type,
    description: description || undefined,
    author: author || undefined,
    gitEnabled: options.git,
    installDeps: options.install,
  };
}

/**
 * 显示配置摘要
 */
function displaySummary(metadata: ProjectMetadata, logger: Logger): void {
  logger.log('📋 项目配置摘要:');
  logger.log('');
  logger.log(`  项目名称: ${metadata.projectName}`);
  logger.log(`  项目类型: ${getProjectTypeName(metadata.projectType)}`);

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

/**
 * 显示后续步骤
 */
function displayNextSteps(metadata: ProjectMetadata, logger: Logger): void {
  logger.log('');
  logger.log('📚 推荐阅读:');
  logger.log(`   ${metadata.projectName}/README.md - 项目说明`);
  logger.log(`   ${metadata.projectName}/CLAUDE.md - AI辅助开发流程`);
  logger.log(`   ${metadata.projectName}/docs/00-项目概览.md - 项目概览`);
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

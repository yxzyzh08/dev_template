/**
 * generate-prd命令实现
 *
 * 生成产品需求文档（PRD）
 */

import path from 'path';
import { GeneratePRDWorkflow } from '@/application';
import { Logger } from '@/cli/ui';

export interface GeneratePRDCommandOptions {
  output?: string;
  force?: boolean;
  skipRender?: boolean;
}

/**
 * 执行generate-prd命令
 */
export async function executeGeneratePRDCommand(
  options: GeneratePRDCommandOptions
): Promise<void> {
  const logger = new Logger();

  try {
    logger.title('📝 生成产品需求文档（PRD）');
    logger.log('');

    // 获取项目路径（当前目录）
    const projectPath = process.cwd();

    // 确定输出目录
    const outputDir = options.output
      ? path.resolve(projectPath, options.output)
      : path.join(projectPath, 'docs/PRD');

    // 执行PRD生成工作流
    const workflow = new GeneratePRDWorkflow();
    const result = await workflow.execute({
      projectPath,
      outputDir,
      force: options.force,
      skipRender: options.skipRender,
    });

    if (!result.success) {
      logger.error(`PRD生成失败: ${result.error}`);
      process.exit(1);
    }

    logger.log('');
    logger.log('📚 生成的文件:');
    logger.log(`   ${outputDir}/PRD.md`);
    logger.log(`   ${outputDir}/assets/images/ (如果有图表)`);
    logger.log('');

  } catch (error) {
    logger.error(error instanceof Error ? error : new Error('未知错误'));
    process.exit(1);
  }
}

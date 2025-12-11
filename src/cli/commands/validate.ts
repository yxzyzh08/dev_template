/**
 * validate命令实现
 *
 * 验证项目结构和文档完整性
 */

import path from 'path';
import { FileSystemHelper } from '@/infrastructure';
import { Logger, Spinner } from '@/cli/ui';

export interface ValidateCommandOptions {
  phase?: 'requirements' | 'architecture' | 'implementation' | 'testing';
  strict?: boolean;
  fix?: boolean;
}

/**
 * 执行validate命令
 */
export async function executeValidateCommand(
  options: ValidateCommandOptions
): Promise<void> {
  const logger = new Logger();
  const spinner = new Spinner();
  const fs = new FileSystemHelper();

  try {
    logger.title('🔍 验证项目结构');
    logger.log('');

    const projectPath = process.cwd();

    // 检测当前阶段（如果未指定）
    const phase = options.phase || await detectCurrentPhase(projectPath, fs);

    logger.info(`验证阶段: ${getPhaseDisplayName(phase || 'requirements')}`);
    logger.log('');

    // 根据阶段验证不同的内容
    let errors: string[] = [];
    let warnings: string[] = [];

    switch (phase) {
      case 'requirements':
        ({ errors, warnings } = await validateRequirements(projectPath, fs, spinner));
        break;
      case 'architecture':
        ({ errors, warnings } = await validateArchitecture(projectPath, fs, spinner));
        break;
      case 'implementation':
        ({ errors, warnings } = await validateImplementation(projectPath, fs, spinner));
        break;
      case 'testing':
        ({ errors, warnings } = await validateTesting(projectPath, fs, spinner));
        break;
    }

    // 显示结果
    logger.log('');
    if (errors.length === 0 && warnings.length === 0) {
      logger.success('✅ 验证通过！项目结构完整');
    } else {
      if (errors.length > 0) {
        logger.error(`❌ 发现 ${errors.length} 个错误:`);
        errors.forEach((err) => logger.log(`   - ${err}`));
      }

      if (warnings.length > 0) {
        logger.warn(`⚠️  发现 ${warnings.length} 个警告:`);
        warnings.forEach((warn) => logger.log(`   - ${warn}`));
      }

      // 严格模式下，警告也视为错误
      if (options.strict && warnings.length > 0) {
        logger.error('严格模式：警告视为错误');
        process.exit(1);
      }

      if (errors.length > 0) {
        process.exit(1);
      }
    }

  } catch (error) {
    logger.error(error instanceof Error ? error : new Error('未知错误'));
    process.exit(1);
  }
}

/**
 * 检测当前阶段
 */
async function detectCurrentPhase(
  projectPath: string,
  fs: FileSystemHelper
): Promise<ValidateCommandOptions['phase']> {
  const hasRequirements = await fs.exists(path.join(projectPath, 'docs/00-项目概览.md'));
  const hasArchitecture = await fs.exists(path.join(projectPath, 'docs/architecture'));
  const hasSrc = await fs.exists(path.join(projectPath, 'src'));
  const hasTests = await fs.exists(path.join(projectPath, 'tests'));

  if (hasTests) return 'testing';
  if (hasSrc) return 'implementation';
  if (hasArchitecture) return 'architecture';
  if (hasRequirements) return 'requirements';

  return 'requirements'; // 默认
}

/**
 * 验证需求阶段
 */
async function validateRequirements(
  projectPath: string,
  fs: FileSystemHelper,
  spinner: Spinner
): Promise<{ errors: string[]; warnings: string[] }> {
  const errors: string[] = [];
  const warnings: string[] = [];

  spinner.start('验证需求文档...');

  const requiredFiles = [
    'docs/00-项目概览.md',
    'docs/01-模块划分.md',
    'docs/02-用户故事.md',
  ];

  for (const file of requiredFiles) {
    const filePath = path.join(projectPath, file);
    const exists = await fs.exists(filePath);
    if (!exists) {
      errors.push(`缺少文件: ${file}`);
    }
  }

  // 检查modules目录
  const modulesDir = path.join(projectPath, 'docs/modules');
  const modulesExists = await fs.exists(modulesDir);
  if (!modulesExists) {
    warnings.push('缺少 docs/modules/ 目录');
  }

  spinner.succeed('需求文档验证完成');
  return { errors, warnings };
}

/**
 * 验证架构阶段
 */
async function validateArchitecture(
  projectPath: string,
  fs: FileSystemHelper,
  spinner: Spinner
): Promise<{ errors: string[]; warnings: string[] }> {
  const { errors: reqErrors, warnings: reqWarnings } = await validateRequirements(
    projectPath,
    fs,
    spinner
  );

  const errors = [...reqErrors];
  const warnings = [...reqWarnings];

  spinner.start('验证架构文档...');

  const requiredFiles = [
    'docs/architecture/01-架构概览.md',
    'docs/architecture/02-技术选型.md',
    'docs/architecture/03-模块设计.md',
    'docs/architecture/04-数据模型.md',
    'docs/architecture/05-API设计.md',
  ];

  for (const file of requiredFiles) {
    const filePath = path.join(projectPath, file);
    const exists = await fs.exists(filePath);
    if (!exists) {
      errors.push(`缺少文件: ${file}`);
    }
  }

  spinner.succeed('架构文档验证完成');
  return { errors, warnings };
}

/**
 * 验证实现阶段
 */
async function validateImplementation(
  projectPath: string,
  fs: FileSystemHelper,
  spinner: Spinner
): Promise<{ errors: string[]; warnings: string[] }> {
  const { errors: archErrors, warnings: archWarnings } = await validateArchitecture(
    projectPath,
    fs,
    spinner
  );

  const errors = [...archErrors];
  const warnings = [...archWarnings];

  spinner.start('验证代码结构...');

  // 检查src目录
  const srcDir = path.join(projectPath, 'src');
  const srcExists = await fs.exists(srcDir);
  if (!srcExists) {
    errors.push('缺少 src/ 目录');
  }

  spinner.succeed('代码结构验证完成');
  return { errors, warnings };
}

/**
 * 验证测试阶段
 */
async function validateTesting(
  projectPath: string,
  fs: FileSystemHelper,
  spinner: Spinner
): Promise<{ errors: string[]; warnings: string[] }> {
  const { errors: implErrors, warnings: implWarnings } = await validateImplementation(
    projectPath,
    fs,
    spinner
  );

  const errors = [...implErrors];
  const warnings = [...implWarnings];

  spinner.start('验证测试文件...');

  // 检查tests目录
  const testsDir = path.join(projectPath, 'tests');
  const testsExists = await fs.exists(testsDir);
  if (!testsExists) {
    warnings.push('缺少 tests/ 目录');
  }

  spinner.succeed('测试文件验证完成');
  return { errors, warnings };
}

/**
 * 获取阶段显示名称
 */
function getPhaseDisplayName(phase: string): string {
  const names: Record<string, string> = {
    requirements: '需求分析',
    architecture: '架构设计',
    implementation: '代码实现',
    testing: '测试验证',
  };
  return names[phase] || phase;
}

/**
 * 初始化工作流
 *
 * 协调项目初始化的完整流程
 */

import path from 'path';
import { ProjectMetadata, Template } from '@/types';
import { FileSystemHelper, GitHelper } from '@/infrastructure';
import { TemplateRegistry, TemplateApplicator } from '@/templates';
import { SkillManager } from '@/skills';
import { ConfigManager, ProjectConfigSchema } from '@/config';
import { Logger, Spinner } from '@/cli/ui';

export class InitWorkflow {
  private fs: FileSystemHelper;
  private git: GitHelper;
  private templateRegistry: TemplateRegistry;
  private templateApplicator: TemplateApplicator;
  private skillManager: SkillManager;
  private configManager: ConfigManager;
  private logger: Logger;
  private spinner: Spinner;

  constructor(
    fs?: FileSystemHelper,
    git?: GitHelper,
    templateRegistry?: TemplateRegistry,
    templateApplicator?: TemplateApplicator,
    skillManager?: SkillManager,
    configManager?: ConfigManager,
    logger?: Logger,
    spinner?: Spinner
  ) {
    this.fs = fs || new FileSystemHelper();
    this.git = git || new GitHelper();
    this.templateRegistry = templateRegistry || new TemplateRegistry();
    this.templateApplicator = templateApplicator || new TemplateApplicator();
    this.skillManager = skillManager || new SkillManager();
    this.configManager = configManager || new ConfigManager();
    this.logger = logger || new Logger();
    this.spinner = spinner || new Spinner();
  }

  /**
   * 执行初始化流程
   */
  async execute(metadata: ProjectMetadata): Promise<InitResult> {
    const startTime = Date.now();

    try {
      // 1. 验证输入
      this.logger.info('正在验证项目配置...');
      await this.validateInput(metadata);

      // 2. 准备目标目录
      const targetDir = await this.prepareTargetDirectory(metadata);

      // 3. 获取模板
      const template = await this.getTemplate(metadata);

      // 4. 应用模板
      await this.applyTemplate(template, targetDir, metadata);

      // 5. 复制Skills
      await this.copySkills(targetDir, metadata);

      // 6. 创建配置文件
      await this.createConfig(targetDir, metadata);

      // 7. 初始化Git
      if (metadata.gitEnabled !== false) {
        await this.initializeGit(targetDir);
      }

      // 8. 安装依赖
      if (metadata.installDeps !== false) {
        await this.installDependencies(targetDir);
      }

      const duration = Date.now() - startTime;

      this.logger.success(`\n✨ 项目初始化完成！耗时 ${(duration / 1000).toFixed(2)}s`);
      this.logger.log(`\n📁 项目目录: ${targetDir}`);
      this.logger.log('\n🚀 下一步:');
      this.logger.log(`   cd ${metadata.projectName}`);
      this.logger.log(`   查看 README.md 了解项目结构`);

      return {
        success: true,
        projectPath: targetDir,
        duration,
      };
    } catch (error) {
      this.spinner.fail('初始化失败');
      this.logger.error(error instanceof Error ? error : new Error('未知错误'));

      return {
        success: false,
        error: error instanceof Error ? error.message : '未知错误',
        duration: Date.now() - startTime,
      };
    }
  }

  /**
   * 验证输入参数
   */
  private async validateInput(metadata: ProjectMetadata): Promise<void> {
    // 验证项目名称
    if (!metadata.projectName || metadata.projectName.trim() === '') {
      throw new Error('项目名称不能为空');
    }

    const namePattern = /^[a-zA-Z0-9-_]+$/;
    if (!namePattern.test(metadata.projectName)) {
      throw new Error('项目名称只能包含字母、数字、横线和下划线');
    }

    // 验证项目类型
    const validTypes = ['web-fullstack', 'mobile-app', 'backend-api', 'cli-tool'];
    if (!validTypes.includes(metadata.projectType)) {
      throw new Error(`项目类型必须是: ${validTypes.join(', ')}`);
    }
  }

  /**
   * 准备目标目录
   */
  private async prepareTargetDirectory(metadata: ProjectMetadata): Promise<string> {
    this.spinner.start('准备项目目录...');

    // 检查是否在当前目录初始化
    const initInCurrentDir = metadata.customVariables?.initInCurrentDir === true;

    const targetDir = initInCurrentDir
      ? process.cwd()  // 当前目录
      : path.resolve(process.cwd(), metadata.projectName);  // 新目录

    // 检查目录是否存在
    const exists = await this.fs.exists(targetDir);
    if (exists) {
      const files = await this.fs.listFiles(targetDir);
      if (files.length > 0 && !initInCurrentDir) {
        // 如果是新目录模式且目录不为空，报错
        this.spinner.fail();
        throw new Error(
          `目标目录不为空: ${targetDir}\n提示: 使用 --force 选项强制覆盖或选择其他项目名称`
        );
      }
    }

    // 创建目录（如果不存在）
    await this.fs.ensureDir(targetDir);
    this.spinner.succeed('项目目录准备完成');

    return targetDir;
  }

  /**
   * 获取模板
   */
  private async getTemplate(metadata: ProjectMetadata): Promise<Template> {
    this.spinner.start('加载项目模板...');

    const template = this.templateRegistry.getByType(metadata.projectType);
    if (!template) {
      this.spinner.fail();
      throw new Error(`未找到项目类型模板: ${metadata.projectType}`);
    }

    this.spinner.succeed(`已加载模板: ${template.name}`);
    return template;
  }

  /**
   * 应用模板
   */
  private async applyTemplate(
    template: Template,
    targetDir: string,
    metadata: ProjectMetadata
  ): Promise<void> {
    this.spinner.start('生成项目文件...');

    try {
      await this.templateApplicator.apply(template, targetDir, metadata);
      this.spinner.succeed(`已生成 ${template.files.length} 个文件`);
    } catch (error) {
      this.spinner.fail();
      throw new Error(
        `模板应用失败: ${error instanceof Error ? error.message : '未知错误'}`
      );
    }
  }

  /**
   * 复制Skills文件
   */
  private async copySkills(targetDir: string, metadata: ProjectMetadata): Promise<void> {
    this.spinner.start('复制AI技能文件...');

    try {
      // 加载可用的Skills
      await this.skillManager.loadAvailableSkills();

      // 复制所有Skills到项目
      await this.skillManager.copyAllToProject(targetDir);

      const skillCount = this.skillManager.count();
      this.spinner.succeed(`已复制 ${skillCount} 个AI技能`);
    } catch (error) {
      this.spinner.warn(`Skills复制失败: ${error instanceof Error ? error.message : '未知错误'}`);
      // Skills复制失败不阻断流程，只是警告
    }
  }

  /**
   * 创建配置文件
   */
  private async createConfig(targetDir: string, metadata: ProjectMetadata): Promise<void> {
    this.spinner.start('创建配置文件...');

    try {
      const config: ProjectConfigSchema = {
        project: {
          name: metadata.projectName,
          type: metadata.projectType,
          version: metadata.version || '0.1.0',
          description: metadata.description,
        },
        author: metadata.author
          ? {
              name: metadata.author,
            }
          : undefined,
        git: {
          enabled: metadata.gitEnabled !== false,
          remote: metadata.gitRemote,
        },
        install: {
          enabled: metadata.installDeps !== false,
          manager: 'npm',
        },
        skills: {
          enabled: true,
          list: this.skillManager.getRecommendedSkills(),
        },
        documentation: {
          enabled: true,
          outputDir: 'docs',
        },
      };

      await this.configManager.save(targetDir, config);
      this.spinner.succeed('配置文件创建完成');
    } catch (error) {
      this.spinner.fail();
      throw new Error(
        `配置文件创建失败: ${error instanceof Error ? error.message : '未知错误'}`
      );
    }
  }

  /**
   * 初始化Git仓库
   */
  private async initializeGit(targetDir: string): Promise<void> {
    this.spinner.start('初始化Git仓库...');

    try {
      // 检查Git是否已安装
      const isInstalled = await this.git.isGitInstalled();
      if (!isInstalled) {
        this.spinner.warn('Git未安装，跳过Git初始化');
        return;
      }

      // 初始化Git
      await this.git.init(targetDir);

      // 创建.gitignore
      const gitignoreContent = `node_modules/
dist/
.env
.DS_Store
*.log`;
      await this.git.createGitignore(targetDir, gitignoreContent);

      // 创建初始提交
      await this.git.add(targetDir, ['.']);
      await this.git.commit(
        targetDir,
        'Initial commit\n\n🤖 Generated with AI Dev Template\n\nCo-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>'
      );

      this.spinner.succeed('Git仓库初始化完成');
    } catch (error) {
      this.spinner.warn(`Git初始化失败: ${error instanceof Error ? error.message : '未知错误'}`);
      // Git初始化失败不阻断流程
    }
  }

  /**
   * 安装依赖
   */
  private async installDependencies(targetDir: string): Promise<void> {
    this.spinner.start('安装项目依赖...');

    try {
      // 检查package.json是否存在
      const packageJsonPath = path.join(targetDir, 'package.json');
      const exists = await this.fs.exists(packageJsonPath);

      if (!exists) {
        this.spinner.info('未找到package.json，跳过依赖安装');
        return;
      }

      // 这里暂时只是提示，不实际执行npm install
      // 因为在CLI中执行可能会很耗时
      this.spinner.info('依赖安装已跳过（手动运行: npm install）');
    } catch (error) {
      this.spinner.warn(`依赖安装失败: ${error instanceof Error ? error.message : '未知错误'}`);
    }
  }
}

/**
 * 初始化结果
 */
export interface InitResult {
  success: boolean;
  projectPath?: string;
  error?: string;
  duration: number;
}

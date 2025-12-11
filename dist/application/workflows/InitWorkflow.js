"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InitWorkflow = void 0;
const path_1 = __importDefault(require("path"));
const infrastructure_1 = require("../../infrastructure");
const templates_1 = require("../../templates");
const skills_1 = require("../../skills");
const config_1 = require("../../config");
const ui_1 = require("../../cli/ui");
class InitWorkflow {
    constructor(fs, git, templateRegistry, templateApplicator, skillManager, configManager, logger, spinner) {
        this.fs = fs || new infrastructure_1.FileSystemHelper();
        this.git = git || new infrastructure_1.GitHelper();
        this.templateRegistry = templateRegistry || new templates_1.TemplateRegistry();
        this.templateApplicator = templateApplicator || new templates_1.TemplateApplicator();
        this.skillManager = skillManager || new skills_1.SkillManager();
        this.configManager = configManager || new config_1.ConfigManager();
        this.logger = logger || new ui_1.Logger();
        this.spinner = spinner || new ui_1.Spinner();
    }
    async execute(metadata) {
        const startTime = Date.now();
        try {
            this.logger.info('正在验证项目配置...');
            await this.validateInput(metadata);
            const targetDir = await this.prepareTargetDirectory(metadata);
            const template = await this.getTemplate(metadata);
            await this.applyTemplate(template, targetDir, metadata);
            await this.copySkills(targetDir, metadata);
            await this.createConfig(targetDir, metadata);
            if (metadata.gitEnabled !== false) {
                await this.initializeGit(targetDir);
            }
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
        }
        catch (error) {
            this.spinner.fail('初始化失败');
            this.logger.error(error instanceof Error ? error : new Error('未知错误'));
            return {
                success: false,
                error: error instanceof Error ? error.message : '未知错误',
                duration: Date.now() - startTime,
            };
        }
    }
    async validateInput(metadata) {
        if (!metadata.projectName || metadata.projectName.trim() === '') {
            throw new Error('项目名称不能为空');
        }
        const namePattern = /^[a-zA-Z0-9-_]+$/;
        if (!namePattern.test(metadata.projectName)) {
            throw new Error('项目名称只能包含字母、数字、横线和下划线');
        }
        const validTypes = ['web-fullstack', 'mobile-app', 'backend-api', 'cli-tool'];
        if (!validTypes.includes(metadata.projectType)) {
            throw new Error(`项目类型必须是: ${validTypes.join(', ')}`);
        }
    }
    async prepareTargetDirectory(metadata) {
        this.spinner.start('准备项目目录...');
        const initInCurrentDir = metadata.customVariables?.initInCurrentDir === true;
        const targetDir = initInCurrentDir
            ? process.cwd()
            : path_1.default.resolve(process.cwd(), metadata.projectName);
        const exists = await this.fs.exists(targetDir);
        if (exists) {
            const files = await this.fs.listFiles(targetDir);
            if (files.length > 0 && !initInCurrentDir) {
                this.spinner.fail();
                throw new Error(`目标目录不为空: ${targetDir}\n提示: 使用 --force 选项强制覆盖或选择其他项目名称`);
            }
        }
        await this.fs.ensureDir(targetDir);
        this.spinner.succeed('项目目录准备完成');
        return targetDir;
    }
    async getTemplate(metadata) {
        this.spinner.start('加载项目模板...');
        const template = this.templateRegistry.getByType(metadata.projectType);
        if (!template) {
            this.spinner.fail();
            throw new Error(`未找到项目类型模板: ${metadata.projectType}`);
        }
        this.spinner.succeed(`已加载模板: ${template.name}`);
        return template;
    }
    async applyTemplate(template, targetDir, metadata) {
        this.spinner.start('生成项目文件...');
        try {
            await this.templateApplicator.apply(template, targetDir, metadata);
            this.spinner.succeed(`已生成 ${template.files.length} 个文件`);
        }
        catch (error) {
            this.spinner.fail();
            throw new Error(`模板应用失败: ${error instanceof Error ? error.message : '未知错误'}`);
        }
    }
    async copySkills(targetDir, metadata) {
        this.spinner.start('复制AI技能文件...');
        try {
            await this.skillManager.loadAvailableSkills();
            await this.skillManager.copyAllToProject(targetDir);
            const skillCount = this.skillManager.count();
            this.spinner.succeed(`已复制 ${skillCount} 个AI技能`);
        }
        catch (error) {
            this.spinner.warn(`Skills复制失败: ${error instanceof Error ? error.message : '未知错误'}`);
        }
    }
    async createConfig(targetDir, metadata) {
        this.spinner.start('创建配置文件...');
        try {
            const config = {
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
        }
        catch (error) {
            this.spinner.fail();
            throw new Error(`配置文件创建失败: ${error instanceof Error ? error.message : '未知错误'}`);
        }
    }
    async initializeGit(targetDir) {
        this.spinner.start('初始化Git仓库...');
        try {
            const isInstalled = await this.git.isGitInstalled();
            if (!isInstalled) {
                this.spinner.warn('Git未安装，跳过Git初始化');
                return;
            }
            await this.git.init(targetDir);
            const gitignoreContent = `node_modules/
dist/
.env
.DS_Store
*.log`;
            await this.git.createGitignore(targetDir, gitignoreContent);
            await this.git.add(targetDir, ['.']);
            await this.git.commit(targetDir, 'Initial commit\n\n🤖 Generated with AI Dev Template\n\nCo-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>');
            this.spinner.succeed('Git仓库初始化完成');
        }
        catch (error) {
            this.spinner.warn(`Git初始化失败: ${error instanceof Error ? error.message : '未知错误'}`);
        }
    }
    async installDependencies(targetDir) {
        this.spinner.start('安装项目依赖...');
        try {
            const packageJsonPath = path_1.default.join(targetDir, 'package.json');
            const exists = await this.fs.exists(packageJsonPath);
            if (!exists) {
                this.spinner.info('未找到package.json，跳过依赖安装');
                return;
            }
            this.spinner.info('依赖安装已跳过（手动运行: npm install）');
        }
        catch (error) {
            this.spinner.warn(`依赖安装失败: ${error instanceof Error ? error.message : '未知错误'}`);
        }
    }
}
exports.InitWorkflow = InitWorkflow;
//# sourceMappingURL=InitWorkflow.js.map
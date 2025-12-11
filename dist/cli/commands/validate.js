"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.executeValidateCommand = executeValidateCommand;
const path_1 = __importDefault(require("path"));
const infrastructure_1 = require("../../infrastructure");
const ui_1 = require("../ui");
async function executeValidateCommand(options) {
    const logger = new ui_1.Logger();
    const spinner = new ui_1.Spinner();
    const fs = new infrastructure_1.FileSystemHelper();
    try {
        logger.title('🔍 验证项目结构');
        logger.log('');
        const projectPath = process.cwd();
        const phase = options.phase || await detectCurrentPhase(projectPath, fs);
        logger.info(`验证阶段: ${getPhaseDisplayName(phase || 'requirements')}`);
        logger.log('');
        let errors = [];
        let warnings = [];
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
        logger.log('');
        if (errors.length === 0 && warnings.length === 0) {
            logger.success('✅ 验证通过！项目结构完整');
        }
        else {
            if (errors.length > 0) {
                logger.error(`❌ 发现 ${errors.length} 个错误:`);
                errors.forEach((err) => logger.log(`   - ${err}`));
            }
            if (warnings.length > 0) {
                logger.warn(`⚠️  发现 ${warnings.length} 个警告:`);
                warnings.forEach((warn) => logger.log(`   - ${warn}`));
            }
            if (options.strict && warnings.length > 0) {
                logger.error('严格模式：警告视为错误');
                process.exit(1);
            }
            if (errors.length > 0) {
                process.exit(1);
            }
        }
    }
    catch (error) {
        logger.error(error instanceof Error ? error : new Error('未知错误'));
        process.exit(1);
    }
}
async function detectCurrentPhase(projectPath, fs) {
    const hasRequirements = await fs.exists(path_1.default.join(projectPath, 'docs/00-项目概览.md'));
    const hasArchitecture = await fs.exists(path_1.default.join(projectPath, 'docs/architecture'));
    const hasSrc = await fs.exists(path_1.default.join(projectPath, 'src'));
    const hasTests = await fs.exists(path_1.default.join(projectPath, 'tests'));
    if (hasTests)
        return 'testing';
    if (hasSrc)
        return 'implementation';
    if (hasArchitecture)
        return 'architecture';
    if (hasRequirements)
        return 'requirements';
    return 'requirements';
}
async function validateRequirements(projectPath, fs, spinner) {
    const errors = [];
    const warnings = [];
    spinner.start('验证需求文档...');
    const requiredFiles = [
        'docs/00-项目概览.md',
        'docs/01-模块划分.md',
        'docs/02-用户故事.md',
    ];
    for (const file of requiredFiles) {
        const filePath = path_1.default.join(projectPath, file);
        const exists = await fs.exists(filePath);
        if (!exists) {
            errors.push(`缺少文件: ${file}`);
        }
    }
    const modulesDir = path_1.default.join(projectPath, 'docs/modules');
    const modulesExists = await fs.exists(modulesDir);
    if (!modulesExists) {
        warnings.push('缺少 docs/modules/ 目录');
    }
    spinner.succeed('需求文档验证完成');
    return { errors, warnings };
}
async function validateArchitecture(projectPath, fs, spinner) {
    const { errors: reqErrors, warnings: reqWarnings } = await validateRequirements(projectPath, fs, spinner);
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
        const filePath = path_1.default.join(projectPath, file);
        const exists = await fs.exists(filePath);
        if (!exists) {
            errors.push(`缺少文件: ${file}`);
        }
    }
    spinner.succeed('架构文档验证完成');
    return { errors, warnings };
}
async function validateImplementation(projectPath, fs, spinner) {
    const { errors: archErrors, warnings: archWarnings } = await validateArchitecture(projectPath, fs, spinner);
    const errors = [...archErrors];
    const warnings = [...archWarnings];
    spinner.start('验证代码结构...');
    const srcDir = path_1.default.join(projectPath, 'src');
    const srcExists = await fs.exists(srcDir);
    if (!srcExists) {
        errors.push('缺少 src/ 目录');
    }
    spinner.succeed('代码结构验证完成');
    return { errors, warnings };
}
async function validateTesting(projectPath, fs, spinner) {
    const { errors: implErrors, warnings: implWarnings } = await validateImplementation(projectPath, fs, spinner);
    const errors = [...implErrors];
    const warnings = [...implWarnings];
    spinner.start('验证测试文件...');
    const testsDir = path_1.default.join(projectPath, 'tests');
    const testsExists = await fs.exists(testsDir);
    if (!testsExists) {
        warnings.push('缺少 tests/ 目录');
    }
    spinner.succeed('测试文件验证完成');
    return { errors, warnings };
}
function getPhaseDisplayName(phase) {
    const names = {
        requirements: '需求分析',
        architecture: '架构设计',
        implementation: '代码实现',
        testing: '测试验证',
    };
    return names[phase] || phase;
}
//# sourceMappingURL=validate.js.map
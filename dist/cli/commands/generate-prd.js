"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.executeGeneratePRDCommand = executeGeneratePRDCommand;
const path_1 = __importDefault(require("path"));
const application_1 = require("../../application");
const ui_1 = require("../ui");
async function executeGeneratePRDCommand(options) {
    const logger = new ui_1.Logger();
    try {
        logger.title('📝 生成产品需求文档（PRD）');
        logger.log('');
        const projectPath = process.cwd();
        const outputDir = options.output
            ? path_1.default.resolve(projectPath, options.output)
            : path_1.default.join(projectPath, 'docs/PRD');
        const workflow = new application_1.GeneratePRDWorkflow();
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
    }
    catch (error) {
        logger.error(error instanceof Error ? error : new Error('未知错误'));
        process.exit(1);
    }
}
//# sourceMappingURL=generate-prd.js.map
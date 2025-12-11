"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileGenerator = void 0;
const path_1 = __importDefault(require("path"));
const infrastructure_1 = require("../../infrastructure");
const TemplateEngine_1 = require("./TemplateEngine");
class FileGenerator {
    constructor(fs, engine) {
        this.fs = fs || new infrastructure_1.FileSystemHelper();
        this.engine = engine || new TemplateEngine_1.TemplateEngine();
    }
    async generate(file, targetDir, variables) {
        const targetPath = path_1.default.join(targetDir, file.targetPath);
        const targetDirPath = path_1.default.dirname(targetPath);
        await this.fs.ensureDir(targetDirPath);
        if (file.isTemplate) {
            await this.generateFromTemplate(file, targetPath, variables);
        }
        else {
            await this.copyStaticFile(file, targetPath);
        }
    }
    async generateFromTemplate(file, targetPath, variables) {
        try {
            const content = this.engine.render(file.content, variables);
            await this.fs.writeFile(targetPath, content);
        }
        catch (error) {
            throw new Error(`生成模板文件失败 ${file.targetPath}: ${error instanceof Error ? error.message : '未知错误'}`);
        }
    }
    async copyStaticFile(file, targetPath) {
        try {
            await this.fs.writeFile(targetPath, file.content);
        }
        catch (error) {
            throw new Error(`复制静态文件失败 ${file.targetPath}: ${error instanceof Error ? error.message : '未知错误'}`);
        }
    }
    async generateBatch(files, targetDir, variables) {
        const results = [];
        for (const file of files) {
            try {
                await this.generate(file, targetDir, variables);
                results.push({
                    file: file.targetPath,
                    success: true,
                });
            }
            catch (error) {
                results.push({
                    file: file.targetPath,
                    success: false,
                    error: error instanceof Error ? error.message : '未知错误',
                });
            }
        }
        return results;
    }
    async preview(file, variables) {
        if (file.isTemplate) {
            return this.engine.render(file.content, variables);
        }
        else {
            return file.content;
        }
    }
    async willOverwrite(file, targetDir) {
        const targetPath = path_1.default.join(targetDir, file.targetPath);
        return await this.fs.exists(targetPath);
    }
    async getOverwriteList(files, targetDir) {
        const overwriteList = [];
        for (const file of files) {
            const willOverwrite = await this.willOverwrite(file, targetDir);
            if (willOverwrite) {
                overwriteList.push(file.targetPath);
            }
        }
        return overwriteList;
    }
}
exports.FileGenerator = FileGenerator;
//# sourceMappingURL=FileGenerator.js.map
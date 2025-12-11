"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TemplateApplicator = void 0;
const path_1 = __importDefault(require("path"));
const infrastructure_1 = require("../../infrastructure");
const TemplateEngine_1 = require("./TemplateEngine");
const FileGenerator_1 = require("./FileGenerator");
class TemplateApplicator {
    constructor(fs, engine, generator) {
        this.fs = fs || new infrastructure_1.FileSystemHelper();
        this.engine = engine || new TemplateEngine_1.TemplateEngine();
        this.generator = generator || new FileGenerator_1.FileGenerator(this.fs, this.engine);
    }
    async apply(template, targetDir, metadata) {
        await this.fs.ensureDir(targetDir);
        await this.createDirectories(template, targetDir);
        const variables = this.prepareVariables(template, metadata);
        await this.generateFiles(template, targetDir, variables);
    }
    async createDirectories(template, targetDir) {
        for (const dir of template.directories) {
            const fullPath = path_1.default.join(targetDir, dir);
            await this.fs.ensureDir(fullPath);
        }
    }
    prepareVariables(template, metadata) {
        return {
            projectName: metadata.projectName,
            projectType: metadata.projectType,
            description: metadata.description || `${metadata.projectName} - ${template.name}项目`,
            author: metadata.author || 'AI Developer',
            version: metadata.version || '0.1.0',
            license: metadata.license || 'MIT',
            templateId: template.id,
            templateVersion: template.version,
            createdAt: new Date().toISOString(),
            year: new Date().getFullYear(),
            gitEnabled: metadata.gitEnabled !== false,
            gitRemote: metadata.gitRemote || '',
            installDeps: metadata.installDeps !== false,
            features: metadata.features || [],
            ...metadata.customVariables,
        };
    }
    async generateFiles(template, targetDir, variables) {
        for (const file of template.files) {
            await this.generator.generate(file, targetDir, variables);
        }
    }
    async validateTargetDir(targetDir, force = false) {
        const exists = await this.fs.exists(targetDir);
        if (exists) {
            const files = await this.fs.listFiles(targetDir);
            if (files.length > 0 && !force) {
                throw new Error(`目标目录不为空: ${targetDir}\n提示: 使用 --force 选项强制覆盖`);
            }
        }
    }
    getPreview(template, metadata) {
        const variables = this.prepareVariables(template, metadata);
        return {
            directories: template.directories,
            files: template.files.map((f) => ({
                path: f.targetPath,
                isTemplate: f.isTemplate,
            })),
            variables,
            estimatedFileCount: template.files.length,
            estimatedDirCount: template.directories.length,
        };
    }
}
exports.TemplateApplicator = TemplateApplicator;
//# sourceMappingURL=TemplateApplicator.js.map
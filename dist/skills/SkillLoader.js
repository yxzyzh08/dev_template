"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SkillLoader = void 0;
const path_1 = __importDefault(require("path"));
const infrastructure_1 = require("../infrastructure");
class SkillLoader {
    constructor(fs) {
        this.fs = fs || new infrastructure_1.FileSystemHelper();
    }
    async loadFromDirectory(dirPath) {
        const exists = await this.fs.exists(dirPath);
        if (!exists) {
            return [];
        }
        const files = await this.fs.listFiles(dirPath);
        const skillFiles = files.filter((f) => f.endsWith('.md'));
        const skills = [];
        for (const file of skillFiles) {
            const skill = await this.loadFromFile(file);
            if (skill) {
                skills.push(skill);
            }
        }
        return skills;
    }
    async loadFromFile(filePath) {
        try {
            const content = await this.fs.readFile(filePath);
            const fileName = path_1.default.basename(filePath, '.md');
            const metadata = this.parseMetadata(content);
            return {
                id: metadata.id || fileName,
                name: metadata.name || this.formatSkillName(fileName),
                description: metadata.description || '',
                version: metadata.version || '1.0.0',
                content,
                filePath,
            };
        }
        catch (error) {
            console.error(`加载技能文件失败 ${filePath}:`, error);
            return null;
        }
    }
    parseMetadata(content) {
        const metadata = {};
        const titleMatch = content.match(/^#\s+(.+)$/m);
        if (titleMatch) {
            metadata.name = titleMatch[1].trim();
        }
        const descMatch = content.match(/^>\s*(.+)$/m);
        if (descMatch) {
            metadata.description = descMatch[1].trim();
        }
        const frontMatterMatch = content.match(/^---\n([\s\S]+?)\n---/);
        if (frontMatterMatch) {
            const frontMatter = frontMatterMatch[1];
            const idMatch = frontMatter.match(/id:\s*(.+)/);
            const versionMatch = frontMatter.match(/version:\s*(.+)/);
            if (idMatch)
                metadata.id = idMatch[1].trim();
            if (versionMatch)
                metadata.version = versionMatch[1].trim();
        }
        return metadata;
    }
    formatSkillName(kebabCase) {
        return kebabCase
            .split('-')
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    }
    async validateSkillFile(filePath) {
        try {
            const content = await this.fs.readFile(filePath);
            const hasTitle = /^#\s+.+$/m.test(content);
            const hasContent = content.trim().length > 0;
            return hasTitle && hasContent;
        }
        catch {
            return false;
        }
    }
    async validateDirectory(dirPath) {
        const files = await this.fs.listFiles(dirPath);
        const skillFiles = files.filter((f) => f.endsWith('.md'));
        const results = [];
        for (const file of skillFiles) {
            const valid = await this.validateSkillFile(file);
            const fileName = path_1.default.basename(file);
            results.push({ file: fileName, valid });
        }
        const validCount = results.filter((r) => r.valid).length;
        const invalidFiles = results.filter((r) => !r.valid).map((r) => r.file);
        return {
            totalFiles: skillFiles.length,
            validFiles: validCount,
            invalidFiles,
            allValid: invalidFiles.length === 0,
        };
    }
}
exports.SkillLoader = SkillLoader;
//# sourceMappingURL=SkillLoader.js.map
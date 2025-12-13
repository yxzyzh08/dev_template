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
        await this.createInputsDirectory(targetDir);
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
    async createInputsDirectory(targetDir) {
        const inputsDir = path_1.default.join(targetDir, 'inputs');
        await this.fs.ensureDir(inputsDir);
        const readmePath = path_1.default.join(inputsDir, 'README.md');
        const readmeContent = `# 客户原始资料目录

> **用途**: 存放客户提供的所有原始资料，保持原貌，不加工
> **原则**: 只存不改，作为需求分析的源头参考

---

## 存放内容

可以存放任何客户提供的原始资料：

- **需求文档**: 客户的需求说明、功能描述、业务流程文档
- **沟通记录**: 邮件往来、会议记录、聊天截图
- **参考资料**: 竞品截图、参考案例、手绘原型、灵感图片
- **数据样本**: Excel、CSV、JSON 等数据文件示例
- **合同文档**: 合同、协议、技术规格书
- **其他附件**: 任何客户提供的相关资料

---

## 使用方式

### 新项目启动时
1. 将客户提供的所有原始资料放入此目录
2. 文件可以自由命名，建议包含日期和简短描述
3. 启动需求分析时，requirements-analyzer 会参考这些资料

### 文件命名建议
\`\`\`
2025-12-12-客户需求邮件.pdf
2025-12-10-会议记录-第一次沟通.md
竞品参考-某某系统截图.png
数据样本-用户表.xlsx
\`\`\`

### 注意事项
- ✅ 保持原始文件不修改
- ✅ 可以添加新文件，但不要删除旧文件
- ✅ 加工后的内容应存放在 \`docs/\` 目录下
- ⚠️ 敏感信息注意脱敏处理

---

## 与其他目录的关系

| 目录 | 用途 | 关系 |
|------|------|------|
| \`inputs/\` | 原始资料（未加工） | 输入源头 |
| \`docs/\` | 结构化文档（已加工） | 基于 inputs 分析产出 |
| \`src/\` | 源代码 | 基于 docs 开发产出 |

---

**当前状态**: 目录已创建，等待添加客户资料
`;
        await this.fs.writeFile(readmePath, readmeContent);
    }
}
exports.TemplateApplicator = TemplateApplicator;
//# sourceMappingURL=TemplateApplicator.js.map
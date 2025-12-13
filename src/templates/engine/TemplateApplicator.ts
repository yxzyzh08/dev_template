/**
 * 模板应用器
 *
 * 负责将模板应用到目标项目目录
 */

import path from 'path';
import { Template, TemplateVariables, ProjectMetadata } from '@/types';
import { FileSystemHelper } from '@/infrastructure';
import { TemplateEngine } from './TemplateEngine';
import { FileGenerator } from './FileGenerator';

export class TemplateApplicator {
  private fs: FileSystemHelper;
  private engine: TemplateEngine;
  private generator: FileGenerator;

  constructor(
    fs?: FileSystemHelper,
    engine?: TemplateEngine,
    generator?: FileGenerator
  ) {
    this.fs = fs || new FileSystemHelper();
    this.engine = engine || new TemplateEngine();
    this.generator = generator || new FileGenerator(this.fs, this.engine);
  }

  /**
   * 应用模板到目标目录
   */
  async apply(
    template: Template,
    targetDir: string,
    metadata: ProjectMetadata
  ): Promise<void> {
    // 1. 创建项目根目录
    await this.fs.ensureDir(targetDir);

    // 2. 创建所有子目录
    await this.createDirectories(template, targetDir);

    // 3. 准备模板变量
    const variables = this.prepareVariables(template, metadata);

    // 4. 生成所有文件
    await this.generateFiles(template, targetDir, variables);

    // 5. 创建客户原始资料目录（所有项目类型通用）
    await this.createInputsDirectory(targetDir);
  }

  /**
   * 创建目录结构
   */
  private async createDirectories(template: Template, targetDir: string): Promise<void> {
    for (const dir of template.directories) {
      const fullPath = path.join(targetDir, dir);
      await this.fs.ensureDir(fullPath);
    }
  }

  /**
   * 准备模板变量
   */
  private prepareVariables(
    template: Template,
    metadata: ProjectMetadata
  ): TemplateVariables {
    return {
      // 项目元数据
      projectName: metadata.projectName,
      projectType: metadata.projectType,
      description: metadata.description || `${metadata.projectName} - ${template.name}项目`,
      author: metadata.author || 'AI Developer',
      version: metadata.version || '0.1.0',
      license: metadata.license || 'MIT',

      // 模板信息
      templateId: template.id,
      templateVersion: template.version,

      // 时间信息
      createdAt: new Date().toISOString(),
      year: new Date().getFullYear(),

      // Git信息
      gitEnabled: metadata.gitEnabled !== false,
      gitRemote: metadata.gitRemote || '',

      // 依赖安装
      installDeps: metadata.installDeps !== false,

      // 项目特性
      features: metadata.features || [],

      // 自定义变量
      ...metadata.customVariables,
    };
  }

  /**
   * 生成所有文件
   */
  private async generateFiles(
    template: Template,
    targetDir: string,
    variables: TemplateVariables
  ): Promise<void> {
    for (const file of template.files) {
      await this.generator.generate(file, targetDir, variables);
    }
  }

  /**
   * 验证目标目录
   */
  async validateTargetDir(targetDir: string, force: boolean = false): Promise<void> {
    const exists = await this.fs.exists(targetDir);

    if (exists) {
      const files = await this.fs.listFiles(targetDir);
      if (files.length > 0 && !force) {
        throw new Error(
          `目标目录不为空: ${targetDir}\n提示: 使用 --force 选项强制覆盖`
        );
      }
    }
  }

  /**
   * 获取模板预览信息
   */
  getPreview(template: Template, metadata: ProjectMetadata): TemplatePreview {
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

  /**
   * 创建客户原始资料目录
   */
  private async createInputsDirectory(targetDir: string): Promise<void> {
    // 1. 创建 inputs/ 目录
    const inputsDir = path.join(targetDir, 'inputs');
    await this.fs.ensureDir(inputsDir);

    // 2. 创建 README.md
    const readmePath = path.join(inputsDir, 'README.md');
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

/**
 * 模板预览信息
 */
interface TemplatePreview {
  directories: string[];
  files: Array<{
    path: string;
    isTemplate: boolean;
  }>;
  variables: TemplateVariables;
  estimatedFileCount: number;
  estimatedDirCount: number;
}

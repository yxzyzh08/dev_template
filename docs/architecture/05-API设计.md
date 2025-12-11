# API设计

## 文档信息
- **项目名称**: AI超级个体开发模板系统
- **文档版本**: v1.0
- **创建日期**: 2025-12-10

---

## 1. API设计概览

### 1.1 API分类

本系统作为CLI工具，API分为以下几类：

| API类型 | 说明 | 调用方式 | 示例 |
|--------|------|---------|------|
| **CLI命令API** | 用户通过命令行调用 | Shell命令 | `ai-dev init` |
| **模块API** | 内部模块间调用 | TypeScript导入 | `import { PRDGenerator }` |
| **工具API** | 基础设施层工具 | TypeScript导入 | `FileSystemHelper.copy()` |

### 1.2 API设计原则

- **一致性**：相似功能使用相似的API设计
- **可预测性**：参数顺序、返回值遵循统一模式
- **错误友好**：清晰的错误信息和恢复建议
- **TypeScript优先**：充分利用类型系统

---

## 2. CLI命令API

### 2.1 init命令

**功能**：初始化新项目

**命令格式**：
```bash
ai-dev init [project-name] [options]
```

**参数**：

| 参数/选项 | 类型 | 必需 | 默认值 | 说明 |
|----------|------|------|-------|------|
| `project-name` | string | 否 | 交互式输入 | 项目名称 |
| `-t, --type <type>` | string | 否 | 交互式选择 | 项目类型 |
| `--no-git` | boolean | 否 | false | 跳过Git初始化 |
| `--no-install` | boolean | 否 | false | 跳过依赖安装 |
| `--non-interactive` | boolean | 否 | false | 非交互模式 |

**项目类型（type）**：
- `web-fullstack` - Web全栈应用
- `mobile-app` - 移动应用
- `backend-api` - 后端API
- `cli-tool` - CLI工具

**返回值**：
- 成功：退出码 0
- 失败：退出码 1

**使用示例**：

```bash
# 交互式创建
ai-dev init

# 指定项目名称
ai-dev init my-app

# 指定项目类型
ai-dev init my-app --type web-fullstack

# 跳过Git初始化
ai-dev init my-app --no-git

# 非交互模式
ai-dev init my-app --type backend-api --non-interactive
```

**输出示例**：

```
✨ AI超级个体开发模板 v1.0.0

? 项目名称 › my-app
? 选择项目类型 ›
❯ Web全栈应用 (React/Vue + Node.js)
  移动应用 (React Native / Flutter)
  后端API (Node.js / Python)
  CLI工具 (Node.js / Go)

🔧 正在创建项目...
  ✓ 创建项目目录
  ✓ 应用项目模板
  ✓ 复制Skills文件
  ✓ 复制CLAUDE.md
  ✓ 生成配置文件
  ✓ 初始化Git仓库
✅ 项目创建成功！

📁 项目路径: /Users/you/my-app

📖 下一步:
  cd my-app
  开始使用 Claude Code 进行开发
```

**错误处理**：

| 错误场景 | 错误码 | 错误信息 | 建议 |
|---------|-------|---------|------|
| 目录已存在 | 1 | 目录已存在: /path/to/project | 使用其他项目名或删除现有目录 |
| 无写入权限 | 1 | 无权限创建目录: /path | 检查文件系统权限 |
| Git未安装 | 1 | Git未安装，无法初始化仓库 | 安装Git或使用--no-git |
| 项目名非法 | 1 | 项目名仅支持小写字母、数字、连字符 | 修改项目名 |

---

### 2.2 generate-prd命令

**功能**：生成产品需求文档（PRD）

**命令格式**：
```bash
ai-dev generate-prd [options]
```

**参数**：

| 选项 | 类型 | 必需 | 默认值 | 说明 |
|------|------|------|-------|------|
| `-o, --output <path>` | string | 否 | `docs/PRD` | 输出目录 |
| `-f, --force` | boolean | 否 | false | 强制覆盖已存在的PRD |
| `--skip-render` | boolean | 否 | false | 跳过Mermaid图片渲染 |
| `--no-ai` | boolean | 否 | false | 跳过AI分析（使用模板） |

**前置条件**：
- 必须在项目根目录执行
- 需求文档完整（00/01/02.md + modules/*/03-05.md）

**返回值**：
- 成功：退出码 0
- 失败：退出码 1

**使用示例**：

```bash
# 标准生成
ai-dev generate-prd

# 指定输出目录
ai-dev generate-prd --output ./custom-prd

# 强制覆盖
ai-dev generate-prd --force

# 跳过图片渲染（适合无Puppeteer环境）
ai-dev generate-prd --skip-render
```

**输出示例**：

```
📝 正在生成 PRD...

🔍 正在收集需求文档...
  ✓ 读取 docs/00-项目概览.md
  ✓ 读取 docs/01-模块划分.md
  ✓ 读取 docs/02-用户故事.md
  ✓ 读取 docs/modules/用户模块/03-核心流程.md
  ✓ 读取 docs/modules/用户模块/05-验收标准.md
  ...
✓ 已收集 12 个文档

🤖 AI 正在分析业务实体...
  ✓ 识别到 5 个核心实体
  ✓ 识别到 8 个关系

🎨 正在渲染图表...
  ✓ 业务实体关系图 (1/3)
  ✓ 用户流程图 (2/3)
  ✓ 订单流程图 (3/3)

📝 正在生成 PRD.md...
  ✓ 嵌入 Mermaid 代码
  ✓ 关联图片引用
✅ PRD 生成完成！

📦 生成的文件:
  - PRD.md (完整产品需求文档)
  - assets/images/ (3 张图片)
  - README.md (使用说明)

📁 输出位置: docs/PRD/

📖 下一步:
  1. 查看 PRD: code docs/PRD/PRD.md
  2. 分享团队: zip -r PRD.zip docs/PRD/
  3. 导出 PDF: npx md-to-pdf docs/PRD/PRD.md
```

**错误处理**：

| 错误场景 | 错误码 | 错误信息 | 建议 |
|---------|-------|---------|------|
| 不在项目根目录 | 1 | 未找到.ai-dev.json，请在项目根目录执行 | cd到项目根目录 |
| 需求文档缺失 | 1 | 需求文档不完整，缺失: [列表] | 先完成需求分析 |
| AI调用失败 | 1 | AI分析失败: [错误信息] | 检查网络或使用--no-ai |
| Mermaid渲染失败 | 0 (警告) | ⚠️ 图表渲染失败，保留源码 | 手动渲染或使用--skip-render |

---

### 2.3 validate命令

**功能**：验证项目结构和文档完整性

**命令格式**：
```bash
ai-dev validate [options]
```

**参数**：

| 选项 | 类型 | 必需 | 默认值 | 说明 |
|------|------|------|-------|------|
| `--phase <phase>` | string | 否 | 自动检测 | 验证特定阶段 |
| `--strict` | boolean | 否 | false | 严格模式（警告视为错误） |
| `--fix` | boolean | 否 | false | 自动修复问题 |

**阶段（phase）**：
- `requirements` - 需求分析阶段
- `architecture` - 架构设计阶段
- `implementation` - 代码实现阶段
- `testing` - 测试验证阶段

**使用示例**：

```bash
# 自动检测阶段并验证
ai-dev validate

# 验证特定阶段
ai-dev validate --phase requirements

# 严格模式
ai-dev validate --strict

# 自动修复
ai-dev validate --fix
```

**输出示例**：

```
🔍 正在验证项目结构...

当前阶段: 需求分析

✅ 检查项通过:
  ✓ .ai-dev.json 存在
  ✓ CLAUDE.md 存在
  ✓ .claude/skills/ 包含4个Skills
  ✓ docs/00-项目概览.md 存在
  ✓ docs/01-模块划分.md 存在

⚠️  警告:
  - docs/modules/用户模块/04-原型设计.md 缺失（可选）

❌ 错误:
  - docs/02-用户故事.md 缺失

验证结果: 失败 (1 个错误, 1 个警告)

💡 建议:
  1. 创建缺失的必需文档
  2. 运行 ai-dev validate --fix 自动修复
```

---

## 3. 模块API

### 3.1 TemplateRegistry API

**职责**：管理和提供项目模板

**接口定义**：

```typescript
class TemplateRegistry {
  /**
   * 获取所有模板
   * @returns 模板数组
   */
  getAll(): Template[];

  /**
   * 根据类型获取模板
   * @param type - 项目类型
   * @returns 模板对象或undefined
   */
  getByType(type: ProjectType): Template | undefined;

  /**
   * 注册新模板
   * @param template - 模板对象
   * @throws Error 如果模板ID已存在
   */
  register(template: Template): void;

  /**
   * 检查模板是否存在
   * @param type - 项目类型
   * @returns 是否存在
   */
  has(type: ProjectType): boolean;
}
```

**使用示例**：

```typescript
import { TemplateRegistry } from '@/templates';

const registry = new TemplateRegistry();

// 获取所有模板
const templates = registry.getAll();
console.log(`共 ${templates.length} 个模板`);

// 获取特定模板
const webTemplate = registry.getByType('web-fullstack');
if (webTemplate) {
  console.log(`模板名称: ${webTemplate.name}`);
}

// 注册自定义模板
const customTemplate: Template = {
  id: 'custom-template',
  type: 'cli-tool',
  name: '自定义CLI模板',
  version: '1.0.0',
  description: '我的自定义模板',
  files: [],
  directories: [],
  scripts: {}
};
registry.register(customTemplate);
```

---

### 3.2 TemplateApplicator API

**职责**：应用模板到目标路径

**接口定义**：

```typescript
class TemplateApplicator {
  /**
   * 应用模板到目标路径
   * @param template - 模板对象
   * @param targetPath - 目标路径
   * @param options - 可选配置
   * @throws Error 如果目标路径已存在或无权限
   */
  async apply(
    template: Template,
    targetPath: string,
    options?: ApplyOptions
  ): Promise<void>;

  /**
   * 验证模板
   * @param template - 模板对象
   * @returns 验证结果
   */
  validate(template: Template): ValidationResult;
}

interface ApplyOptions {
  overwrite?: boolean;        // 是否覆盖已存在文件
  skipFiles?: string[];       // 跳过的文件路径
  templateData?: Record<string, any>;  // 模板渲染数据
}

interface ValidationResult {
  valid: boolean;
  errors: string[];
  warnings: string[];
}
```

**使用示例**：

```typescript
import { TemplateApplicator, TemplateRegistry } from '@/templates';

const registry = new TemplateRegistry();
const applicator = new TemplateApplicator();

// 获取模板
const template = registry.getByType('web-fullstack')!;

// 验证模板
const validation = applicator.validate(template);
if (!validation.valid) {
  console.error('模板无效:', validation.errors);
  process.exit(1);
}

// 应用模板
try {
  await applicator.apply(template, '/path/to/project', {
    templateData: {
      projectName: 'my-app',
      author: 'John Doe'
    }
  });
  console.log('✅ 模板应用成功');
} catch (error) {
  console.error('❌ 模板应用失败:', error);
}
```

---

### 3.3 PRDGenerator API

**职责**：生成产品需求文档

**接口定义**：

```typescript
class PRDGenerator {
  /**
   * 生成PRD（完整流程）
   * @param options - 可选配置
   * @returns 生成结果
   */
  async generate(options?: GeneratePRDOptions): Promise<GeneratePRDResult>;

  /**
   * 收集需求数据
   * @returns 文档数据对象
   * @throws Error 如果必需文档缺失
   */
  async collect(): Promise<DocumentData>;

  /**
   * AI分析业务实体
   * @param data - 文档数据
   * @returns 业务实体
   * @throws Error 如果AI调用失败
   */
  async analyze(data: DocumentData): Promise<BusinessEntities>;

  /**
   * 渲染Mermaid图表
   * @param entities - 业务实体
   * @returns 渲染结果
   */
  async renderDiagrams(entities: BusinessEntities): Promise<RenderedDiagrams>;

  /**
   * 组装PRD文档
   * @param data - 文档数据
   * @param diagrams - 渲染的图表
   * @returns PRD文件路径
   */
  async compose(
    data: DocumentData,
    diagrams: RenderedDiagrams
  ): Promise<string>;
}

interface GeneratePRDOptions {
  output?: string;            // 输出目录
  force?: boolean;            // 强制覆盖
  skipRender?: boolean;       // 跳过图片渲染
  skipAI?: boolean;           // 跳过AI分析
}

interface GeneratePRDResult {
  success: boolean;
  prdPath?: string;
  diagrams?: DiagramInfo[];
  duration: number;
  error?: Error;
}

interface DiagramInfo {
  type: string;
  imagePath: string;
  mermaidCode: string;
}
```

**使用示例**：

```typescript
import { PRDGenerator } from '@/generators';

const generator = new PRDGenerator();

try {
  // 生成PRD
  const result = await generator.generate({
    output: 'docs/PRD',
    force: false,
    skipRender: false
  });

  if (result.success) {
    console.log(`✅ PRD生成成功: ${result.prdPath}`);
    console.log(`⏱️  耗时: ${result.duration}ms`);
    console.log(`🖼️  生成图表: ${result.diagrams?.length}张`);
  } else {
    console.error(`❌ PRD生成失败: ${result.error?.message}`);
  }
} catch (error) {
  console.error('发生错误:', error);
}
```

---

### 3.4 DocumentCollector API

**职责**：收集需求文档数据

**接口定义**：

```typescript
class DocumentCollector {
  /**
   * 收集所有需求文档
   * @param basePath - 项目根目录
   * @returns 文档数据
   * @throws Error 如果必需文档缺失
   */
  async collect(basePath?: string): Promise<DocumentData>;

  /**
   * 读取单个文档
   * @param filePath - 文档路径
   * @returns Markdown内容
   */
  async readDocument(filePath: string): Promise<string>;

  /**
   * 提取Mermaid代码块
   * @param markdown - Markdown内容
   * @returns Mermaid代码块数组
   */
  extractMermaidBlocks(markdown: string): MermaidBlock[];

  /**
   * 验证文档完整性
   * @param basePath - 项目根目录
   * @returns 验证结果
   */
  async validateDocuments(basePath?: string): Promise<ValidationResult>;
}

interface MermaidBlock {
  type: string;               // 图表类型（erDiagram/graph/sequence）
  code: string;               // Mermaid代码
  lineNumber: number;         // 行号
}
```

**使用示例**：

```typescript
import { DocumentCollector } from '@/generators';

const collector = new DocumentCollector();

// 验证文档完整性
const validation = await collector.validateDocuments();
if (!validation.valid) {
  console.error('文档缺失:', validation.errors);
  process.exit(1);
}

// 收集数据
const data = await collector.collect();
console.log(`项目名称: ${data.projectOverview.name}`);
console.log(`模块数量: ${data.modules.length}`);

// 提取Mermaid代码块
const markdown = await collector.readDocument('docs/01-模块划分.md');
const mermaidBlocks = collector.extractMermaidBlocks(markdown);
console.log(`找到 ${mermaidBlocks.length} 个Mermaid图表`);
```

---

### 3.5 ConfigManager API

**职责**：管理项目配置

**接口定义**：

```typescript
class ConfigManager {
  /**
   * 加载配置
   * @param projectPath - 项目路径
   * @returns 配置对象
   * @throws Error 如果配置文件不存在或无效
   */
  async load(projectPath: string): Promise<ProjectConfig>;

  /**
   * 保存配置
   * @param config - 配置对象
   * @param projectPath - 项目路径
   * @throws Error 如果配置无效或无权限
   */
  async save(config: ProjectConfig, projectPath: string): Promise<void>;

  /**
   * 验证配置
   * @param config - 配置对象
   * @returns 验证结果
   */
  validate(config: ProjectConfig): ValidationResult;

  /**
   * 获取默认配置
   * @param type - 项目类型
   * @returns 默认配置
   */
  getDefault(type: ProjectType): ProjectConfig;

  /**
   * 更新配置
   * @param projectPath - 项目路径
   * @param updates - 部分更新
   */
  async update(
    projectPath: string,
    updates: Partial<ProjectConfig>
  ): Promise<void>;
}
```

**使用示例**：

```typescript
import { ConfigManager } from '@/config';

const configManager = new ConfigManager();

// 创建默认配置
const defaultConfig = configManager.getDefault('web-fullstack');

// 保存配置
await configManager.save(defaultConfig, '/path/to/project');

// 加载配置
const config = await configManager.load('/path/to/project');
console.log(`项目类型: ${config.projectType}`);

// 更新配置
await configManager.update('/path/to/project', {
  description: '新的项目描述'
});
```

---

## 4. 工具API

### 4.1 FileSystemHelper API

**职责**：文件系统操作工具

**接口定义**：

```typescript
class FileSystemHelper {
  // 目录操作
  async ensureDir(path: string): Promise<void>;
  async listFiles(dirPath: string): Promise<string[]>;

  // 文件操作
  async copy(src: string, dest: string, options?: CopyOptions): Promise<void>;
  async writeFile(path: string, content: string, encoding?: BufferEncoding): Promise<void>;
  async readFile(path: string, encoding?: BufferEncoding): Promise<string>;
  async exists(path: string): Promise<boolean>;
  async remove(path: string): Promise<void>;

  // JSON操作
  async writeJson(path: string, data: any, options?: WriteOptions): Promise<void>;
  async readJson(path: string): Promise<any>;
}
```

### 4.2 GitHelper API

**职责**：Git操作工具

**接口定义**：

```typescript
class GitHelper {
  /**
   * 初始化Git仓库
   * @param path - 项目路径
   */
  async init(path: string): Promise<void>;

  /**
   * 添加文件到暂存区
   * @param path - 项目路径
   * @param files - 文件列表
   */
  async add(path: string, files: string[]): Promise<void>;

  /**
   * 提交
   * @param path - 项目路径
   * @param message - 提交信息
   */
  async commit(path: string, message: string): Promise<void>;

  /**
   * 检查Git状态
   * @param path - 项目路径
   * @returns Git状态
   */
  async status(path: string): Promise<GitStatus>;

  /**
   * 检查是否为Git仓库
   * @param path - 项目路径
   * @returns 是否为Git仓库
   */
  async isRepo(path: string): Promise<boolean>;
}
```

### 4.3 MermaidRenderer API

**职责**：Mermaid图表渲染

**接口定义**：

```typescript
class MermaidRenderer {
  /**
   * 渲染为PNG
   * @param code - Mermaid代码
   * @param outputPath - 输出路径
   * @param options - 渲染选项
   * @throws Error 如果渲染失败
   */
  async renderToPng(
    code: string,
    outputPath: string,
    options?: RenderOptions
  ): Promise<void>;

  /**
   * 批量渲染
   * @param diagrams - 图表数组
   * @returns 渲染结果数组
   */
  async renderBatch(diagrams: MermaidDiagram[]): Promise<RenderResult[]>;

  /**
   * 验证Mermaid语法
   * @param code - Mermaid代码
   * @returns 是否有效
   */
  validate(code: string): boolean;
}

interface RenderOptions {
  width?: number;             // 宽度（默认1200）
  height?: number;            // 高度
  backgroundColor?: string;   // 背景色（默认transparent）
  theme?: 'default' | 'dark' | 'forest';
}

interface MermaidDiagram {
  code: string;
  outputPath: string;
  options?: RenderOptions;
}

interface RenderResult {
  success: boolean;
  outputPath?: string;
  error?: string;
}
```

---

## 5. 错误处理

### 5.1 错误类型定义

```typescript
// 基础错误类
export class AIDevError extends Error {
  constructor(
    message: string,
    public code: string,
    public suggestion?: string
  ) {
    super(message);
    this.name = 'AIDevError';
  }
}

// 文件系统错误
export class FileSystemError extends AIDevError {
  constructor(message: string, suggestion?: string) {
    super(message, 'FS_ERROR', suggestion);
    this.name = 'FileSystemError';
  }
}

// 验证错误
export class ValidationError extends AIDevError {
  constructor(
    message: string,
    public errors: string[]
  ) {
    super(message, 'VALIDATION_ERROR');
    this.name = 'ValidationError';
  }
}

// AI调用错误
export class AIAnalysisError extends AIDevError {
  constructor(message: string) {
    super(message, 'AI_ERROR', '检查网络连接或使用--no-ai选项');
    this.name = 'AIAnalysisError';
  }
}
```

### 5.2 错误处理策略

```typescript
// 统一错误处理器
export class ErrorHandler {
  handle(error: Error): never {
    if (error instanceof AIDevError) {
      console.error(`\n❌ ${error.message}`);
      if (error.suggestion) {
        console.log(`\n💡 建议: ${error.suggestion}`);
      }
      process.exit(1);
    }

    // 未知错误
    console.error('\n❌ 发生未知错误:');
    console.error(error);
    console.log('\n💡 请报告此问题: https://github.com/xxx/issues');
    process.exit(1);
  }
}
```

---

## 6. 性能指标

### 6.1 API性能目标

| API | 操作 | 性能目标 | 测量方法 |
|-----|------|---------|---------|
| CLI | 启动时间 | < 100ms | time命令 |
| init | 项目创建 | < 5s | 端到端 |
| generate-prd | PRD生成 | < 30s | 端到端 |
| TemplateApplicator | 应用模板 | < 2s | 单元测试 |
| MermaidRenderer | 单图渲染 | < 5s | 单元测试 |
| DocumentCollector | 数据收集 | < 1s | 单元测试 |

---

## 7. 版本兼容性

### 7.1 API版本策略

- **Major版本（1.x → 2.x）**：Breaking Changes
- **Minor版本（1.0 → 1.1）**：新增功能，向后兼容
- **Patch版本（1.0.0 → 1.0.1）**：Bug修复

### 7.2 废弃API处理

```typescript
/**
 * @deprecated 使用 generate() 替代
 * 将在 v2.0 移除
 */
async generateLegacy(): Promise<void> {
  console.warn('⚠️  generateLegacy() 已废弃，请使用 generate()');
  return this.generate();
}
```

---

**文档版本**: v1.0
**最后更新**: 2025-12-10
**维护者**: Architecture Designer Skill

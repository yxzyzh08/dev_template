/**
 * Web全栈项目模板
 *
 * 适用于前后端分离的Web应用项目
 */

import path from 'path';
import fs from 'fs-extra';
import { Template, TemplateFile } from '@/types';

export class WebFullstackTemplate {
  getTemplate(): Template {
    return {
      id: 'web-fullstack',
      type: 'web-fullstack',
      name: 'Web全栈项目',
      version: '1.0.0',
      description: '前后端分离的Web应用，包含完整的开发文档和Claude技能',

      directories: [
        // 源代码目录
        'src/frontend',
        'src/backend',
        'src/shared',

        // 文档目录
        'docs/modules',
        'docs/architecture',
        'docs/trackers',
        'docs/PRD',
        'docs/PRD/assets/images',

        // Claude配置
        '.claude/skills',

        // 测试目录
        'tests/frontend',
        'tests/backend',
        'tests/integration',

        // 资源目录
        'public',
      ],

      files: this.getFiles(),

      scripts: {
        'dev:frontend': 'cd src/frontend && npm run dev',
        'dev:backend': 'cd src/backend && npm run dev',
        'dev': 'concurrently "npm run dev:frontend" "npm run dev:backend"',
        'build:frontend': 'cd src/frontend && npm run build',
        'build:backend': 'cd src/backend && npm run build',
        'build': 'npm run build:frontend && npm run build:backend',
        'test': 'jest',
        'test:watch': 'jest --watch',
        'lint': 'eslint . --ext .ts,.tsx',
        'format': 'prettier --write "**/*.{ts,tsx,json,md}"',
      },
    };
  }

  private getFiles(): TemplateFile[] {
    return [
      // README
      {
        targetPath: 'README.md',
        content: this.getReadmeTemplate(),
        isTemplate: true,
      },

      // package.json
      {
        targetPath: 'package.json',
        content: this.getPackageJsonTemplate(),
        isTemplate: true,
      },

      // .gitignore
      {
        targetPath: '.gitignore',
        content: this.getGitignoreTemplate(),
        isTemplate: false,
      },

      // CLAUDE.md
      {
        targetPath: 'CLAUDE.md',
        content: this.getClaudeMdTemplate(),
        isTemplate: true,
      },

      // 项目概览
      {
        targetPath: 'docs/00-项目概览.md',
        content: this.getProjectOverviewTemplate(),
        isTemplate: true,
      },

      // Skills
      {
        targetPath: '.claude/skills/requirements-analyzer.md',
        content: this.getRequirementsAnalyzerSkill(),
        isTemplate: false,
      },
      {
        targetPath: '.claude/skills/architecture-designer.md',
        content: this.getArchitectureDesignerSkill(),
        isTemplate: false,
      },
      {
        targetPath: '.claude/skills/developer-guide.md',
        content: this.getDeveloperGuideSkill(),
        isTemplate: false,
      },
      {
        targetPath: '.claude/skills/test-planner.md',
        content: this.getTestPlannerSkill(),
        isTemplate: false,
      },
    ];
  }

  private getReadmeTemplate(): string {
    return `# {{projectName}}

> {{description}}

## 项目信息

- **项目类型**: Web全栈应用
- **版本**: {{version}}
- **作者**: {{author}}
- **许可证**: {{license}}
- **创建时间**: {{createdAt}}

## 快速开始

\`\`\`bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 运行测试
npm test
\`\`\`

## 项目结构

\`\`\`
{{projectName}}/
├── src/
│   ├── frontend/     # 前端代码
│   ├── backend/      # 后端代码
│   └── shared/       # 共享代码
├── docs/             # 项目文档
│   ├── modules/      # 模块文档
│   ├── architecture/ # 架构文档
│   └── PRD/          # 产品需求文档
├── tests/            # 测试文件
└── .claude/          # Claude技能配置
    └── skills/       # AI辅助开发技能
\`\`\`

## 开发指南

请参考 [CLAUDE.md](./CLAUDE.md) 了解如何使用AI辅助开发流程。

## 文档

- [项目概览](./docs/00-项目概览.md) - 产品定位和开发进度
- [模块划分](./docs/01-模块划分.md) - 功能模块说明
- [用户故事](./docs/02-用户故事.md) - 需求用户故事

## License

{{license}}
`;
  }

  private getPackageJsonTemplate(): string {
    return `{
  "name": "{{kebabCase projectName}}",
  "version": "{{version}}",
  "description": "{{description}}",
  "author": "{{author}}",
  "license": "{{license}}",
  "scripts": {
    "dev:frontend": "cd src/frontend && npm run dev",
    "dev:backend": "cd src/backend && npm run dev",
    "dev": "concurrently \\"npm run dev:frontend\\" \\"npm run dev:backend\\"",
    "build:frontend": "cd src/frontend && npm run build",
    "build:backend": "cd src/backend && npm run build",
    "build": "npm run build:frontend && npm run build:backend",
    "test": "jest",
    "test:watch": "jest --watch",
    "lint": "eslint . --ext .ts,.tsx",
    "format": "prettier --write \\"**/*.{ts,tsx,json,md}\\""
  },
  "devDependencies": {
    "concurrently": "^8.2.2",
    "jest": "^29.7.0",
    "eslint": "^8.55.0",
    "prettier": "^3.1.1",
    "typescript": "^5.3.3"
  }
}
`;
  }

  private getGitignoreTemplate(): string {
    return `# Dependencies
node_modules/
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Build outputs
dist/
build/
.next/
out/

# Environment files
.env
.env.local
.env.*.local

# IDE
.vscode/
.idea/
*.swp
*.swo
*~

# OS
.DS_Store
Thumbs.db

# Testing
coverage/
.nyc_output/

# Temporary
*.tmp
*.log
`;
  }

  private getClaudeMdTemplate(): string {
    return `# AI 超级个体开发助手 v.4.0

> **核心定位**: 为一个人开发软件提供全流程辅助，主动管理进度，调用专业Skill执行任务

---

## 一、角色定义

### 1.1 你是谁

\`\`\`yaml
角色: AI 超级个体开发助手

服务对象: 一个人完成软件开发（超级个体）

核心价值:
  - 记住你脑子里记不住的东西（进度、待办）
  - 提醒你下一步该做什么
  - 帮你调用专业Skill完成具体任务
  - 保持文档最小化，只记录必要信息

主要职责:
  进度管理:
    - 更新 docs/00-项目概览.md 的进度
    - 记录当前阶段和待办事项
    - 提醒下一步做什么
    - High-level任务分解（模块级别，如"用户模块开发"）
    - 维护各阶段的详情跟踪文件（如需求调研计划/进展）

  工作流编排:
    - 根据进度自动触发下一阶段
    - 调用专业Skill执行任务（写代码、设计架构、写测试）
    - 门禁校验和质量把控

不做的事（一个人不需要的团队开销）:
  - ❌ 不写正式的项目章程
  - ❌ 不做过度详细的任务分解（WBS到小时级别，留给各Skill）
  - ❌ 不记录正式的决策日志
  - ❌ 不维护风险登记册

工作方式（通过调用Skill完成专业任务）:
  - ✅ 写代码 → 调用 developer-guide
  - ✅ 设计架构 → 调用 architecture-designer
  - ✅ 需求分析 → 调用 requirements-analyzer
  - ✅ 测试规划 → 调用 test-planner
\`\`\`

---

## 二、快速决策流程

### 2.1 主动模式（新项目启动）

\`\`\`python
if user_input in ["我想做一个...", "帮我开发...", "新项目"]:
    # 步骤1: 调用需求分析
    invoke_skill("requirements-analyzer")
    # requirements-analyzer 会生成 00-项目概览.md

    # 步骤2: 插入开发进度章节到 00-项目概览.md
    update_progress(progress=25%, phase="需求分析完成")

    # 步骤3: 提示用户
    show_message("需求完成！下一步架构设计？")
\`\`\`

### 2.2 被动模式（阶段执行）

\`\`\`python
# 从项目概览读取当前阶段
current_phase = read_from("docs/00-项目概览.md#开发进度")

if current_phase == "需求分析":
    validate_artifacts(REQUIREMENTS_ARTIFACTS)
    invoke_skill("requirements-analyzer")
    update_progress(progress=25%)

elif current_phase == "架构设计":
    validate_artifacts(ARCHITECTURE_ARTIFACTS)
    invoke_skill("architecture-designer")
    update_progress(progress=50%)

elif current_phase == "代码实现":
    validate_artifacts(CODE_PREREQUISITES)
    invoke_skill("developer-guide")
    update_progress(progress=75%)

elif current_phase == "测试验证":
    validate_artifacts(TEST_PREREQUISITES)
    invoke_skill("test-planner")
    update_progress(progress=100%)
\`\`\`

---

## 三、进度管理

**项目级进度文档**: \`docs/00-项目概览.md\`

**阶段详情跟踪**:
- **原则**: 只有 High-level 进度进入概览，具体阶段的调研/实施/测试细节必须独立跟踪
- **执行**: 分阶段维护独立的跟踪文件，文件名固定如下：

| 阶段 | 跟踪文件路径 |
| :--- | :--- |
| 需求分析 | \`docs/trackers/01-requirements.md\` |
| 架构设计 | \`docs/trackers/02-architecture.md\` |
| 代码实现 | \`docs/trackers/03-implementation.md\` |
| 测试验证 | \`docs/trackers/04-testing.md\` |

- **内容**: 详细计划、细粒度TODO，不需要提供日期，是给AI使用，只提供条目和依赖

**进度章节内容**:
- 项目进度表 (阶段状态: ✅完成 / 🔄进行中 / ⏳等待)
- 待办事项 (3-5项，模块级任务)
- 风险提示 (如果有)

**插入位置**: "核心功能模块"与"文档索引"之间

---

## 四、阶段路由表

| 关键词 | 目标Skill | 前置校验 | 更新动作 |
|--------|----------|---------|---------|
| \`需求分析\` \`PRD\` \`我想做\` | requirements-analyzer | 无 | 进度→0% |
| \`架构设计\` \`技术选型\` | architecture-designer | 需求产物 | 进度→25% |
| \`写代码\` \`开始开发\` | developer-guide | 架构产物 | 进度→50% |
| \`写测试\` \`TDD\` | test-planner | 代码+验收标准 | 进度→75% |

### 上下文感知

| 检测条件 | 推荐动作 |
|---------|---------|
| \`docs/00-项目概览.md\` 不存在 | 提示"新项目？先做需求分析" |
| \`docs/architecture/\` 存在 | 提示"架构已完成，开始编码？" |
| \`src/\` 有代码 | 提示"代码已存在，需要审查或测试？" |

---

## 五、契约校验矩阵

\`\`\`yaml
REQUIREMENTS_ARTIFACTS:
  必需文件:
    - docs/00-项目概览.md
    - docs/01-模块划分.md
    - docs/02-用户故事.md
    - docs/modules/*/03-核心流程.md
    - docs/modules/*/05-验收标准.md
  可选文件:
    - docs/modules/*/04-原型设计.md  # 仅前端项目需要（Web/移动/桌面应用）
  缺失时: "提示需要先完成需求分析"

ARCHITECTURE_ARTIFACTS:
  必需文件:
    - docs/architecture/01-架构概览.md
    - docs/architecture/02-技术选型.md
    - docs/architecture/03-模块设计.md
    - docs/architecture/04-数据模型.md
    - docs/architecture/05-API设计.md
  缺失时: "提示需要先完成架构设计"

CODE_PREREQUISITES:
  必需文件:
    - src/modules/*/
  缺失时: "提示需要先写代码"

TEST_PREREQUISITES:
  必需文件:
    - docs/modules/*/05-验收标准.md
    - docs/architecture/05-API设计.md
    - src/modules/*/
  缺失时: "提示需要先完成开发"
\`\`\`

---

## 六、典型工作流

**新项目**:
\`\`\`
"我想做XX" → requirements-analyzer → 插入进度章节 → 提示"需求完成，下一步架构设计？"
\`\`\`

**继续项目**:
\`\`\`
读取00-项目概览.md#开发进度 → 汇报当前状态 → 调用对应Skill
\`\`\`

**需求变更**:
\`\`\`
评估影响阶段 → 提示回退或补充 → 调用对应Skill → 更新待办
\`\`\`

---

## 七、阶段门禁

| 阶段转换 | 检查项 | 更新动作 |
|---------|--------|---------|
| 需求→架构 | 所有模块有03-05文档 + 用户确认 | 进度→25% |
| 架构→开发 | 5个架构文档齐全 | 进度→50% |
| 开发→测试 | 核心功能可运行 | 进度→75% |
| 测试→完成 | 测试覆盖率>80% | 进度→100% |

---

## 八、Skill职责边界

| Skill | 核心职责 | 输入 | 输出 |
|-------|---------|------|------|
| requirements-analyzer | 需求澄清、用户故事、原型 | 用户想法 | docs/需求文档 |
| architecture-designer | 架构设计、技术选型、API | 需求文档 | docs/architecture/ |
| developer-guide | 代码生成、代码审查、重构 | 架构+需求 | src/ |
| test-planner | 测试策略、用例设计、测试 | 代码+验收标准 | test/ |


`;
  }

  private getProjectOverviewTemplate(): string {
    return `# {{projectName}} 项目概览

> **创建时间**: {{createdAt}}
> **项目类型**: {{projectType}}
> **版本**: {{version}}

## 产品愿景

{{#if description}}
{{description}}
{{else}}
[请补充产品愿景和核心价值]
{{/if}}

## 目标用户

[请在需求分析阶段补充目标用户画像]

## 核心功能模块

[请在需求分析阶段补充核心功能]

## 开发进度

| 阶段 | 状态 | 进度 | 开始时间 | 完成时间 |
|------|------|------|---------| ---------|
| 1. 需求分析 | ⏳ 等待 | 0% | - | - |
| 2. 架构设计 | ⏳ 等待 | 0% | - | - |
| 3. 代码实现 | ⏳ 等待 | 0% | - | - |
| 4. 测试验证 | ⏳ 等待 | 0% | - | - |

**总体进度**: 0%

## 待办事项

- [ ] 完成需求分析
- [ ] 设计系统架构
- [ ] 实现核心功能
- [ ] 编写测试用例

---

**文档版本**: v1.0
**最后更新**: {{createdAt}}
**创建者**: {{author}}
`;
  }

  private getRequirementsAnalyzerSkill(): string {
    // 这里应该从实际的skill文件读取，暂时返回占位符
    return `# Requirements Analyzer Skill

产品需求分析师，通过结构化对话澄清需求，输出PRD文档、用户故事、原型图。
`;
  }

  private getArchitectureDesignerSkill(): string {
    return `# Architecture Designer Skill

软件架构师，设计系统架构，包括技术选型、分层设计、模块划分、API设计、数据建模。
`;
  }

  private getDeveloperGuideSkill(): string {
    return `# Developer Guide Skill

开发指导助手，包括代码生成、重构、代码审查、调试辅助。遵循Clean Code原则和项目编码规范。
`;
  }

  private getTestPlannerSkill(): string {
    return `# Test Planner Skill

测试策略设计师，设计和执行测试策略，包括测试计划、测试用例设计、单元测试、集成测试、E2E测试。
`;
  }
}

# AI超级个体开发模板系统

> 为一个人开发软件提供标准化的 AI 辅助开发流程和工具模板

[![npm version](https://badge.fury.io/js/%40ai-dev-template%2Fcli.svg)](https://badge.fury.io/js/%40ai-dev-template%2Fcli)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js Version](https://img.shields.io/node/v/@ai-dev-template/cli.svg)](https://nodejs.org)

## ✨ 特性

- 🚀 **5秒启动项目** - 一条命令快速创建标准化项目结构
- 🤖 **深度集成 Claude Code** - 提供完整的 AI 辅助开发工作流
- 📚 **4个专业 Skills** - 需求分析、架构设计、开发指导、测试规划
- 📝 **自动生成 PRD** - AI分析需求，生成包含业务实体关系图的完整文档
- 🎯 **多项目类型支持** - Web全栈、移动应用、后端API、CLI工具
- 📖 **完整文档体系** - 需求→架构→开发→测试全流程文档模板

## 📦 安装

### 全局安装

```bash
npm install -g @ai-dev-template/cli
```

### npx 直接使用（推荐）

```bash
npx @ai-dev-template/cli init my-app
```

## 🚀 快速开始

### 1. 创建新项目

```bash
# 交互式创建
ai-dev init

# 指定项目名称和类型
ai-dev init my-app --type web-fullstack
```

### 2. 选择项目类型

```
? 选择项目类型 ›
❯ Web全栈应用 (React/Vue + Node.js)
  移动应用 (React Native / Flutter)
  后端API (Node.js / Python)
  CLI工具 (Node.js / Go)
```

### 3. 开始使用 Claude Code 开发

```bash
cd my-app

# 使用 Claude Code 进行需求分析
# 输入: "我想做一个任务管理系统"
# requirements-analyzer Skill 会自动启动

# 生成 PRD
ai-dev generate-prd

# 继续架构设计、开发、测试...
```

## 📖 命令说明

### `ai-dev init` - 初始化项目

创建新项目，包含完整的目录结构、配置文件、Skills和CLAUDE.md工作流。

```bash
ai-dev init [project-name] [options]

选项:
  -t, --type <type>      项目类型 (web-fullstack|mobile-app|backend-api|cli-tool)
  --no-git               跳过 Git 初始化
  --no-install           跳过依赖安装
  --non-interactive      非交互模式
```

### `ai-dev generate-prd` - 生成PRD

分析需求文档，AI生成业务实体关系图，输出完整的产品需求文档。

```bash
ai-dev generate-prd [options]

选项:
  -o, --output <path>    输出目录 (默认: docs/PRD)
  -f, --force            强制覆盖已存在的 PRD
  --skip-render          跳过 Mermaid 图片渲染
```

### `ai-dev validate` - 验证项目结构

检查项目文档完整性，确保满足当前阶段要求。

```bash
ai-dev validate [options]

选项:
  --phase <phase>        验证特定阶段 (requirements|architecture|implementation|testing)
  --strict               严格模式（警告视为错误）
  --fix                  自动修复问题
```

## 📂 项目结构

```
my-app/
├── .ai-dev.json           # 项目配置
├── CLAUDE.md              # Claude工作流配置
├── .claude/
│   └── skills/            # 4个专业Skills
│       ├── requirements-analyzer.md
│       ├── architecture-designer.md
│       ├── developer-guide.md
│       └── test-planner.md
├── docs/
│   ├── 00-项目概览.md
│   ├── 01-模块划分.md
│   ├── 02-用户故事.md
│   ├── modules/           # 模块详细文档
│   ├── architecture/      # 架构文档
│   └── PRD/               # 产品需求文档
├── src/                   # 源代码
└── ...
```

## 🔧 开发流程

AI超级个体开发模板遵循标准的四阶段流程：

```
1. 需求分析 (requirements-analyzer)
   ↓ 输入想法，生成需求文档

2. 架构设计 (architecture-designer)
   ↓ 自动设计架构，生成技术文档

3. 代码实现 (developer-guide)
   ↓ 指导代码编写，保证质量

4. 测试验证 (test-planner)
   ↓ 设计测试策略，确保质量
```

## 📝 PRD生成示例

```bash
ai-dev generate-prd
```

输出：

```
📝 正在生成 PRD...

🔍 正在收集需求文档...
  ✓ 已收集 12 个文档

🤖 AI 正在分析业务实体...
  ✓ 识别到 5 个核心实体

🎨 正在渲染图表...
  ✓ 业务实体关系图 (1/3)
  ✓ 用户流程图 (2/3)
  ✓ 订单流程图 (3/3)

✅ PRD 生成完成！

📁 输出位置: docs/PRD/
📄 主文档: docs/PRD/PRD.md
🖼️  图片资源: docs/PRD/assets/images/ (3张图片)
```

## 🎯 适用场景

- **技术创业者** - 快速启动MVP项目
- **全栈开发者** - 标准化项目结构
- **个人开发者** - 系统化的AI辅助开发
- **学习者** - 了解完整的软件开发流程

## 🌟 核心优势

| 对比维度 | 传统脚手架 | AI超级个体模板 |
|---------|-----------|---------------|
| 项目启动 | 仅生成代码结构 | 完整文档+代码+工作流 |
| AI集成 | ❌ 无 | ✅ 深度集成Claude Code |
| 开发流程 | ❌ 无指导 | ✅ 需求→架构→开发→测试 |
| 文档生成 | ❌ 手动编写 | ✅ AI自动生成PRD |
| 学习成本 | 低 | 中（但提供详细指南） |

## 🔗 相关资源

- [完整文档](https://github.com/yourusername/ai-dev-template/wiki)
- [使用教程](https://github.com/yourusername/ai-dev-template/docs)
- [问题反馈](https://github.com/yourusername/ai-dev-template/issues)
- [Claude Code官网](https://claude.com/claude-code)

## 📄 许可证

MIT © AI Dev Template Team

## 🤝 贡献

欢迎贡献代码、提交问题或改进建议！

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/amazing-feature`)
3. 提交更改 (`git commit -m 'Add amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 提交 Pull Request

## 💬 社区

- [Discord](https://discord.gg/xxx)
- [Twitter](https://twitter.com/xxx)

---

**Made with ❤️ by 超级个体开发者**

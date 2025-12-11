# AI Dev Template - 使用指南

> **版本**: 1.0.0
> **更新日期**: 2025-12-11

---

## 目录

1. [安装方式](#安装方式)
2. [快速开始](#快速开始)
3. [创建新项目](#创建新项目)
4. [命令参考](#命令参考)
5. [项目类型](#项目类型)
6. [生成的项目结构](#生成的项目结构)
7. [常见问题](#常见问题)

---

## 安装方式

### 方式1: npm全局安装（推荐）

```bash
# 安装
npm install -g @ai-dev-template/cli

# 验证安装
ai-dev --version
```

### 方式2: npx临时使用（无需安装）

```bash
# 直接使用，无需安装
npx @ai-dev-template/cli init my-project
```

### 方式3: 快速安装脚本

**Linux / macOS:**
```bash
curl -fsSL https://raw.githubusercontent.com/yourusername/ai-dev-template/main/install.sh | bash
```

**Windows PowerShell:**
```powershell
irm https://raw.githubusercontent.com/yourusername/ai-dev-template/main/install.ps1 | iex
```

### 方式4: 从源码安装（开发者）

```bash
# 克隆仓库
git clone https://github.com/yourusername/ai-dev-template.git
cd ai-dev-template

# 安装依赖
npm install

# 构建项目
npm run build

# 全局链接
npm link

# 现在可以使用 ai-dev 命令
ai-dev --version
```

---

## 快速开始

### 30秒创建项目

```bash
# 1. 安装CLI工具（如果还没安装）
npm install -g @ai-dev-template/cli

# 2. 创建新项目（交互式）
cd /path/to/your/workspace
ai-dev init my-first-project

# 3. 开始开发
cd my-first-project
cat README.md
```

就这么简单！🎉

---

## 创建新项目

### 交互式模式（推荐新手）

```bash
ai-dev init my-project
```

CLI会引导你完成：
1. **选择项目类型** - Web全栈 / 移动应用 / 后端API / CLI工具
2. **输入项目信息** - 描述、作者（可选）
3. **确认配置** - 查看配置摘要
4. **自动生成** - 创建文件、复制AI技能、初始化Git

### 非交互式模式（快速创建）

```bash
# 完整参数示例
ai-dev init my-web-app \
  --type web-fullstack \
  --non-interactive \
  --no-install

# 最简示例
ai-dev init quick-test --type cli-tool --no-git
```

### 命令选项说明

| 选项 | 说明 | 默认值 |
|------|------|--------|
| `[project-name]` | 项目名称（必填） | - |
| `-t, --type <type>` | 项目类型 | 交互式选择 |
| `--no-git` | 跳过Git初始化 | 初始化Git |
| `--no-install` | 跳过依赖安装提示 | 显示提示 |
| `--non-interactive` | 非交互模式 | 交互模式 |
| `-f, --force` | 强制覆盖已存在目录 | 检查冲突 |

---

## 命令参考

### `init` - 初始化新项目

```bash
# 查看帮助
ai-dev init --help

# 交互式创建
ai-dev init my-project

# 创建Web全栈项目
ai-dev init my-web-app --type web-fullstack

# 创建移动应用项目
ai-dev init my-mobile-app --type mobile-app

# 创建后端API项目
ai-dev init my-api --type backend-api

# 创建CLI工具项目
ai-dev init my-cli --type cli-tool

# 不初始化Git
ai-dev init my-project --no-git

# 强制覆盖已存在目录
ai-dev init existing-dir --force
```

### `generate-prd` - 生成PRD文档

```bash
# 在项目目录中运行
cd my-project
ai-dev generate-prd

# 指定输出路径
ai-dev generate-prd --output docs/custom-prd.md

# 交互式问答生成
ai-dev generate-prd --interactive
```

### `validate` - 验证项目结构

```bash
# 自动检测当前阶段并验证
cd my-project
ai-dev validate

# 指定验证阶段
ai-dev validate --phase requirements
ai-dev validate --phase architecture
ai-dev validate --phase implementation
ai-dev validate --phase testing

# 严格模式（所有警告视为错误）
ai-dev validate --strict
```

### 全局选项

```bash
# 查看版本
ai-dev --version
ai-dev -V

# 查看帮助
ai-dev --help
ai-dev -h

# 查看子命令帮助
ai-dev init --help
ai-dev generate-prd --help
ai-dev validate --help
```

---

## 项目类型

### 1. Web全栈应用 (`web-fullstack`)

**适用场景**:
- 需要前后端一体的Web应用
- SaaS产品、内部管理系统、电商平台

**生成内容**:
```
my-web-app/
├── src/
│   ├── frontend/      # React/Vue前端
│   ├── backend/       # Node.js/Express后端
│   └── shared/        # 共享类型和工具
├── docs/              # 完整文档模板
└── .claude/skills/    # 4个AI技能
```

**技术栈建议**:
- 前端: React/Vue/Angular
- 后端: Node.js/Express/Nest.js
- 数据库: PostgreSQL/MongoDB

### 2. 移动应用 (`mobile-app`)

**适用场景**:
- iOS/Android移动应用
- 跨平台应用（React Native/Flutter）

**生成内容**:
```
my-mobile-app/
├── src/
│   ├── screens/       # 页面组件
│   ├── components/    # UI组件
│   ├── services/      # API服务
│   └── navigation/    # 路由导航
├── docs/              # 包含原型设计文档
└── .claude/skills/    # 4个AI技能
```

**技术栈建议**:
- React Native
- Flutter
- 原生开发 (Swift/Kotlin)

### 3. 后端API服务 (`backend-api`)

**适用场景**:
- RESTful API服务
- GraphQL服务
- 微服务架构

**生成内容**:
```
my-api/
├── src/
│   ├── routes/        # API路由
│   ├── controllers/   # 控制器
│   ├── models/        # 数据模型
│   ├── services/      # 业务逻辑
│   └── middleware/    # 中间件
├── docs/              # API设计文档
└── .claude/skills/    # 4个AI技能
```

**技术栈建议**:
- Node.js/Express/Fastify
- NestJS
- GraphQL

### 4. 命令行工具 (`cli-tool`)

**适用场景**:
- 开发者工具
- 自动化脚本
- 构建工具

**生成内容**:
```
my-cli/
├── src/
│   ├── commands/      # CLI命令
│   ├── utils/         # 工具函数
│   └── config/        # 配置处理
├── docs/              # 使用文档
└── .claude/skills/    # 4个AI技能
```

**技术栈建议**:
- Commander.js
- Inquirer/Prompts
- Chalk/Ora

---

## 生成的项目结构

### 标准目录结构

```
my-project/
├── .claude/
│   └── skills/                 # 🤖 AI技能文件（4个）
│       ├── requirements-analyzer.md
│       ├── architecture-designer.md
│       ├── developer-guide.md
│       └── test-planner.md
├── docs/                       # 📚 项目文档目录
│   ├── 00-项目概览.md
│   ├── 01-模块划分.md
│   ├── 02-用户故事.md
│   ├── architecture/           # 架构文档（5个文件）
│   ├── modules/                # 模块详情
│   └── trackers/               # 进度跟踪（4个阶段）
├── src/                        # 💻 源代码目录
├── tests/                      # ✅ 测试目录
├── .gitignore                  # Git忽略文件
├── package.json                # 项目配置
├── README.md                   # 项目说明
├── CLAUDE.md                   # 🎯 AI辅助开发指南
└── .ai-dev.json                # 项目元数据
```

### 核心文件说明

#### `.claude/skills/` - AI技能目录
包含4个专业AI技能，与Claude Code深度集成：

- **requirements-analyzer.md** - 需求分析师
  - 需求澄清、用户故事编写、原型设计

- **architecture-designer.md** - 架构设计师
  - 技术选型、架构设计、API设计、数据建模

- **developer-guide.md** - 开发向导
  - 代码生成、重构、代码审查、调试辅助

- **test-planner.md** - 测试规划师
  - 测试策略、用例设计、单元测试、E2E测试

#### `docs/` - 文档目录

完整的文档体系：

```
docs/
├── 00-项目概览.md           # 项目总览和进度跟踪
├── 01-模块划分.md           # 功能模块划分
├── 02-用户故事.md           # 用户故事集合
├── architecture/            # 架构文档（5个）
│   ├── 01-架构概览.md
│   ├── 02-技术选型.md
│   ├── 03-模块设计.md
│   ├── 04-数据模型.md
│   └── 05-API设计.md
├── modules/                 # 每个模块的详细设计
│   └── [模块名]/
│       ├── 03-核心流程.md
│       ├── 04-原型设计.md   # 仅前端项目
│       └── 05-验收标准.md
└── trackers/                # 各阶段进度跟踪
    ├── 01-requirements.md
    ├── 02-architecture.md
    ├── 03-implementation.md
    └── 04-testing.md
```

#### `CLAUDE.md` - AI辅助开发流程

定义了完整的AI辅助开发工作流：
- AI助手角色定义
- 4个开发阶段（需求→架构→开发→测试）
- 阶段门禁和质量把控
- Skill调用时机

#### `.ai-dev.json` - 项目配置

```json
{
  "projectName": "my-project",
  "projectType": "web-fullstack",
  "version": "0.1.0",
  "createdAt": "2025-12-11T00:00:00.000Z",
  "skills": ["requirements-analyzer", "architecture-designer", ...]
}
```

---

## 常见问题

### Q1: 安装后提示 "ai-dev: command not found"

**答**:
```bash
# 检查npm全局bin路径是否在PATH中
npm config get prefix

# 如果不在PATH中，添加到环境变量
# macOS/Linux (.bashrc 或 .zshrc)
export PATH="$(npm config get prefix)/bin:$PATH"

# Windows
# 将 C:\Users\YourName\AppData\Roaming\npm 添加到系统PATH
```

### Q2: 可以自定义项目模板吗？

**答**: 可以！两种方式：

**方式1: 修改源码**
```bash
git clone https://github.com/yourusername/ai-dev-template.git
cd ai-dev-template/src/templates/registry/templates/
# 编辑模板文件
npm run build
npm link
```

**方式2: Fork仓库**
- Fork仓库到你的GitHub
- 修改模板
- 发布到私有npm

### Q3: 如何在团队中共享这个工具？

**答**: 推荐方式：

**内网npm:**
```bash
# 1. 搭建私有npm（Verdaccio）
npm install -g verdaccio
verdaccio

# 2. 发布到内网npm
npm publish --registry http://your-registry:4873

# 3. 团队成员安装
npm install -g @ai-dev-template/cli --registry http://your-registry:4873
```

**Git + npm link:**
```bash
# 1. 团队克隆内网仓库
git clone http://your-git/ai-dev-template.git
cd ai-dev-template
npm install && npm run build && npm link

# 2. 使用
ai-dev init project-name
```

### Q4: 生成的项目可以修改吗？

**答**: 完全可以！生成的项目只是起点：
- ✅ 修改所有代码和配置
- ✅ 添加或删除文件
- ✅ 自定义文档结构
- ✅ 调整AI技能内容
- ✅ 提交到你自己的Git仓库

### Q5: 如何使用AI技能？

**答**: 在生成的项目中使用Claude Code：

```bash
# 1. 用Claude Code打开项目
cd my-project

# 2. 在Claude对话中调用技能
```

**对话示例**:
```
你: "请使用 requirements-analyzer 帮我分析这个功能的需求"
Claude: [调用 requirements-analyzer skill 进行需求分析]

你: "调用 architecture-designer 设计系统架构"
Claude: [调用 architecture-designer skill 设计架构]

你: "使用 developer-guide 帮我实现登录功能"
Claude: [调用 developer-guide skill 指导编码]
```

### Q6: npm install时报错怎么办？

**答**: 常见解决方案：

```bash
# 1. 清理缓存
npm cache clean --force

# 2. 删除锁文件
rm package-lock.json
rm -rf node_modules

# 3. 重新安装
npm install

# 4. 如果还不行，检查网络
npm config set registry https://registry.npmmirror.com
npm install
```

### Q7: 如何更新CLI工具？

**答**:
```bash
# npm安装的
npm update -g @ai-dev-template/cli

# 源码安装的
cd ai-dev-template
git pull
npm install
npm run build

# npx会自动使用最新版本
npx @ai-dev-template/cli@latest init my-project
```

### Q8: 可以离线使用吗？

**答**: 可以，但需要提前准备：

```bash
# 1. 全局安装CLI工具
npm install -g @ai-dev-template/cli

# 2. 离线后可以创建项目（不要使用 --install 选项）
ai-dev init my-project --no-install

# 3. 手动安装项目依赖（如果有离线npm缓存）
cd my-project
npm install --offline
```

### Q9: 生成的文档太多，可以删除吗？

**答**: 可以选择性保留：

**不建议删除**（AI工作流核心）:
- `CLAUDE.md`
- `.claude/skills/`
- `docs/00-项目概览.md`

**可以删除**（根据需要）:
- `docs/architecture/` - 如果不需要详细架构文档
- `docs/modules/` - 完成开发后可归档
- `docs/trackers/` - 仅开发阶段使用

**建议做法**:
```bash
# 归档而不是删除
mkdir docs/archive
mv docs/modules docs/archive/
```

### Q10: 支持哪些项目类型？

**答**: 当前支持4种类型，计划扩展：

**当前支持**:
- ✅ `web-fullstack` - Web全栈应用
- ✅ `mobile-app` - 移动应用
- ✅ `backend-api` - 后端API服务
- ✅ `cli-tool` - 命令行工具

**计划支持**:
- 🔄 `chrome-extension` - 浏览器扩展
- 🔄 `electron-app` - 桌面应用
- 🔄 `micro-service` - 微服务
- 🔄 `data-pipeline` - 数据管道

---

## 实际使用示例

### 示例1: 创建SaaS产品

```bash
# 1. 安装CLI
npm install -g @ai-dev-template/cli

# 2. 创建项目
ai-dev init my-saas-product --type web-fullstack

# 3. 进入项目
cd my-saas-product

# 4. 查看文档
cat CLAUDE.md

# 5. 在Claude Code中开始开发
# 对话: "请使用 requirements-analyzer 帮我分析SaaS产品的核心功能需求"
```

### 示例2: 创建移动App

```bash
# 使用npx，无需安装
npx @ai-dev-template/cli init fitness-app --type mobile-app

cd fitness-app

# 查看生成的结构
ls -la
cat docs/00-项目概览.md
```

### 示例3: 创建API服务

```bash
ai-dev init user-api \
  --type backend-api \
  --non-interactive \
  --no-git

cd user-api
npm install

# 在Claude Code中开发
# 对话: "调用 architecture-designer 设计RESTful API架构"
```

### 示例4: 团队协作

```bash
# 团队成员A: 创建项目
ai-dev init team-project --type web-fullstack
cd team-project
git remote add origin https://github.com/team/project.git
git push -u origin main

# 团队成员B: 克隆并开始工作
git clone https://github.com/team/project.git
cd project
npm install

# 使用AI辅助开发
# 对话: "使用 developer-guide 帮我实现认证模块"
```

---

## 下一步

### 1. 创建你的第一个项目

```bash
# 安装CLI
npm install -g @ai-dev-template/cli

# 创建项目
ai-dev init my-first-project

# 开始开发
cd my-first-project
cat CLAUDE.md
```

### 2. 学习AI辅助开发流程

1. 阅读生成项目中的 `CLAUDE.md`
2. 了解4个开发阶段
3. 掌握如何调用AI技能
4. 跟随工作流逐步开发

### 3. 探索文档

```bash
cd my-first-project
cat docs/00-项目概览.md        # 项目概览
cat docs/01-模块划分.md        # 模块划分
ls .claude/skills/             # 查看AI技能
```

---

## 技术支持

- **GitHub**: https://github.com/yourusername/ai-dev-template
- **Issues**: https://github.com/yourusername/ai-dev-template/issues
- **文档**: https://ai-dev-template.dev (计划中)
- **Discord**: https://discord.gg/ai-dev-template (计划中)

---

## 贡献指南

欢迎贡献！

```bash
# 1. Fork仓库
# 2. 创建分支
git checkout -b feature/new-template

# 3. 提交更改
git commit -m "Add new template"

# 4. 推送到GitHub
git push origin feature/new-template

# 5. 创建Pull Request
```

---

**创建日期**: 2025-12-11
**作者**: AI Dev Template Team
**版本**: 1.0.0
**许可证**: MIT

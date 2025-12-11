# VSCode Workspace 使用指南

> 如何使用多根工作区同时管理主项目和测试项目

---

## 🚀 快速开始

### 1. 打开 Workspace

```bash
# 方式1: 双击打开
# 直接双击 ai-dev-template.code-workspace 文件

# 方式2: VSCode 命令行
code ai-dev-template.code-workspace

# 方式3: VSCode 内打开
# File → Open Workspace from File → 选择 ai-dev-template.code-workspace
```

### 2. Workspace 结构

打开后你会看到两个项目文件夹：

```
Workspace: ai-dev-template
├── 🔧 AI Dev Template (主项目)  ← 开发 CLI 工具
│   ├── src/                     ← 源代码
│   ├── dist/                    ← 编译输出
│   ├── docs/                    ← 文档
│   └── package.json
│
└── 🧪 Demo Project (测试项目)   ← 测试生成的项目
    ├── .claude/skills/          ← AI 技能
    ├── docs/                    ← 项目文档
    ├── src/                     ← 项目代码
    └── package.json
```

---

## 🛠️ 核心功能

### 1. 快捷任务 (Tasks)

按 `Ctrl+Shift+P` (Windows/Linux) 或 `Cmd+Shift+P` (macOS)，输入 `Tasks: Run Task`:

#### 主项目任务

| 任务名称 | 说明 | 快捷键 |
|---------|------|--------|
| 🔧 Build Main Project | 构建主项目 | `Ctrl+Shift+B` |
| 🔧 Dev: Watch Mode | 开发模式（自动重编译） | - |
| 🔧 Lint & Format | 代码检查和格式化 | - |
| 🔧 Run Tests | 运行测试 | `Ctrl+Shift+T` |

#### 测试项目任务

| 任务名称 | 说明 |
|---------|------|
| 🧪 Create New Test Project | 创建新的测试项目 |
| 🧪 Install Demo Dependencies | 安装测试项目依赖 |

### 2. 调试配置 (Debug)

按 `F5` 或点击左侧调试图标，选择配置：

| 配置名称 | 说明 |
|---------|------|
| 🔧 Dev: Run CLI | 直接运行 CLI（TypeScript 源码） |
| 🔧 Dev: Build & Run | 先构建再运行 CLI |
| 🧪 Test: Run Generated Project | 运行生成的测试项目 |

---

## 📋 常用工作流

### 工作流 1: 开发新功能

```bash
# 1. 打开 Workspace
code ai-dev-template.code-workspace

# 2. 在主项目中修改代码
# 编辑 src/application/workflows/InitWorkflow.ts

# 3. 构建项目（快捷键 Ctrl+Shift+B）
# 或在终端运行：
npm run build

# 4. 测试 CLI
node dist/cli/index.js init test-new-feature --type web-fullstack

# 5. 检查生成的项目
# 在 Workspace 的 Demo Project 文件夹中查看
```

### 工作流 2: 调试 CLI

```bash
# 1. 打开 src/cli/index.ts
# 2. 设置断点（点击行号左侧）
# 3. 按 F5，选择 "🔧 Dev: Run CLI"
# 4. 在 Debug Console 查看变量
```

### 工作流 3: 创建多个测试项目

```bash
# 使用任务创建
# Ctrl+Shift+P → Tasks: Run Task → 🧪 Create New Test Project

# 或手动创建
cd D:\github_projects
node dev_template/dist/cli/index.js init test-backend --type backend-api

# 添加到 Workspace
# File → Add Folder to Workspace → 选择新项目
```

### 工作流 4: 同时编辑主项目和测试项目

```bash
# 1. 左侧 Explorer 切换项目文件夹
# 2. 主项目：修改模板代码
#    src/templates/registry/templates/WebFullstackTemplate.ts
# 3. 重新构建：npm run build
# 4. 重新生成测试项目
# 5. 测试项目：验证生成的文件是否正确
```

---

## 🔧 Workspace 配置说明

### 推荐扩展

Workspace 会自动推荐以下扩展：

- **ESLint** - 代码检查
- **Prettier** - 代码格式化
- **Markdown All in One** - Markdown 编辑
- **GitLens** - Git 增强
- **Path Intellisense** - 路径自动补全
- **Code Spell Checker** - 拼写检查

安装方式：`Ctrl+Shift+P` → `Extensions: Show Recommended Extensions`

### 编辑器设置

自动应用的设置：

- ✅ 保存时自动格式化
- ✅ 保存时自动 ESLint 修复
- ✅ Tab 大小：2 空格
- ✅ 隐藏 node_modules（搜索时）

### 终端配置

打开终端时自动定位到当前文件所在目录。

---

## 💡 高级技巧

### 1. 多终端管理

```bash
# 打开终端（Ctrl+`）
# 点击终端右上角的 + 号，选择：

# 终端1: 主项目开发模式
cd d:/github_projects/dev_template
npm run dev

# 终端2: 主项目构建
cd d:/github_projects/dev_template
npm run build

# 终端3: 测试项目运行
cd d:/github_projects/demo-project
npm install
npm run dev
```

### 2. 文件快速切换

```bash
# Ctrl+P - 快速打开文件
# 输入文件名，例如：
#   - InitWorkflow.ts (主项目)
#   - README.md (测试项目)

# Ctrl+Tab - 切换最近打开的文件
# Ctrl+Shift+E - 切换到资源管理器
```

### 3. 全局搜索

```bash
# Ctrl+Shift+F - 在所有项目中搜索
# 可以选择搜索范围：
#   - 🔧 AI Dev Template (主项目)
#   - 🧪 Demo Project (测试项目)
```

### 4. Git 管理

```bash
# 左侧 Source Control 图标（Ctrl+Shift+G）
# 可以分别管理两个项目的 Git 仓库

# 主项目提交：
git add .
git commit -m "feat: add new template"

# 测试项目提交（如果需要）：
cd ../demo-project
git add .
git commit -m "test: verify new template"
```

---

## 🎯 实际使用示例

### 示例 1: 修改项目模板

```bash
# 1. 打开 Workspace
code ai-dev-template.code-workspace

# 2. 编辑模板
# 主项目 → src/templates/registry/templates/WebFullstackTemplate.ts
# 修改 getFiles() 方法，添加新文件

# 3. 构建
# 按 Ctrl+Shift+B

# 4. 删除旧的测试项目
# 右键 🧪 Demo Project → Remove Folder from Workspace
rm -rf ../demo-project

# 5. 创建新测试项目
node dist/cli/index.js init demo-project --type web-fullstack

# 6. 添加到 Workspace
# File → Add Folder to Workspace → ../demo-project

# 7. 验证新文件是否生成
# 在 Demo Project 文件夹中查看
```

### 示例 2: 调试问题

```bash
# 场景：生成的项目缺少某个文件

# 1. 在主项目中搜索
# Ctrl+Shift+F 搜索 "package.json"
# 找到生成 package.json 的代码

# 2. 设置断点
# 在 WebFullstackTemplate.ts 的 getFiles() 方法设置断点

# 3. 调试运行
# F5 → 选择 "🔧 Dev: Run CLI"

# 4. 单步调试
# F10 - 单步跳过
# F11 - 单步进入
# F5 - 继续

# 5. 查看变量
# 鼠标悬停在变量上
# 或在 Debug Console 输入变量名
```

### 示例 3: 验证 AI 技能

```bash
# 1. 生成测试项目
node dist/cli/index.js init skill-test --type web-fullstack

# 2. 在 Workspace 中打开测试项目的技能文件
# 🧪 Demo Project → .claude/skills/requirements-analyzer.md

# 3. 验证技能内容
# 检查是否包含所有必要的提示词

# 4. 如果有问题，修改源技能文件
# 🔧 AI Dev Template → assets/skills/requirements-analyzer.md

# 5. 重新构建和生成
npm run build
rm -rf ../demo-project
node dist/cli/index.js init demo-project --type web-fullstack
```

---

## 🐛 故障排除

### Q1: Workspace 找不到测试项目

**问题**: `demo-project` 文件夹显示错误

**解决**:
```bash
# 1. 检查测试项目是否存在
ls -la D:/github_projects/demo-project

# 2. 如果不存在，创建一个
cd D:/github_projects
node dev_template/dist/cli/index.js init demo-project --type web-fullstack

# 3. 如果存在但路径不对，编辑 workspace 文件
# ai-dev-template.code-workspace → 修改 path
```

### Q2: TypeScript 报错

**问题**: 两个项目的 TypeScript 配置冲突

**解决**:
```bash
# 确保使用 Workspace 的 TypeScript
# Ctrl+Shift+P → TypeScript: Select TypeScript Version
# 选择 "Use Workspace Version"
```

### Q3: 任务运行失败

**问题**: 点击任务没有反应

**解决**:
```bash
# 1. 检查 package.json 中的脚本是否存在
cat package.json | grep "scripts"

# 2. 手动运行测试
npm run build

# 3. 查看输出面板的错误信息
# View → Output → 选择 "Tasks"
```

---

## 📚 相关文档

- [VSCode Multi-root Workspaces](https://code.visualstudio.com/docs/editor/multi-root-workspaces)
- [VSCode Tasks](https://code.visualstudio.com/docs/editor/tasks)
- [VSCode Debugging](https://code.visualstudio.com/docs/editor/debugging)

---

## 🎉 下一步

### 自定义 Workspace

编辑 `ai-dev-template.code-workspace` 添加：

1. **更多测试项目文件夹**
```json
{
  "folders": [
    { "name": "🔧 主项目", "path": "." },
    { "name": "🧪 Web测试", "path": "../test-web" },
    { "name": "🧪 API测试", "path": "../test-api" },
    { "name": "🧪 CLI测试", "path": "../test-cli" }
  ]
}
```

2. **自定义任务**
```json
{
  "tasks": {
    "tasks": [
      {
        "label": "🚀 快速发布",
        "type": "shell",
        "command": "./scripts/publish.sh"
      }
    ]
  }
}
```

3. **团队共享 Workspace**
```bash
# 提交到 Git
git add ai-dev-template.code-workspace
git commit -m "chore: add workspace config"

# 团队成员克隆后直接打开
code ai-dev-template.code-workspace
```

---

**创建日期**: 2025-12-11
**维护者**: AI Dev Template Team

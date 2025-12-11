# 当前目录初始化模式

> 支持在空目录下直接初始化项目，无需创建子目录

---

## 📖 概述

从 v1.0.0 开始，`ai-dev init` 支持两种模式：

### 模式1: 当前目录模式（无参数）
```bash
mkdir my-project
cd my-project
ai-dev init  # 在当前目录初始化
```

### 模式2: 新目录模式（传统方式）
```bash
ai-dev init my-project  # 创建 my-project 目录
cd my-project
```

---

## 🎯 使用场景

### 场景1: Git仓库已存在

```bash
# 1. 从Git克隆空仓库
git clone https://github.com/you/your-repo.git
cd your-repo

# 2. 直接初始化（使用仓库名作为项目名）
ai-dev init

# 3. 提交
git add .
git commit -m "Initial commit"
git push
```

### 场景2: 目录已创建

```bash
# 1. 创建项目目录
mkdir ~/projects/awesome-app
cd ~/projects/awesome-app

# 2. 初始化（使用目录名 "awesome-app"）
ai-dev init --type web-fullstack --non-interactive

# 3. 开始开发
```

### 场景3: IDE集成

```bash
# VS Code 中的终端
# 1. 打开空文件夹
# 2. 打开终端（Ctrl+`）
# 3. 运行
ai-dev init
```

---

## 💡 工作原理

### 当前目录模式

**何时触发**: 不提供项目名参数时

```bash
ai-dev init  # ← 触发当前目录模式
```

**行为**:
1. 使用当前目录名作为项目名
2. 在当前目录生成所有文件
3. 提示 `📁 在当前目录初始化项目: {目录名}`

### 新目录模式

**何时触发**: 提供项目名参数时

```bash
ai-dev init my-project  # ← 触发新目录模式
```

**行为**:
1. 在当前位置创建 `my-project` 目录
2. 在新目录中生成所有文件
3. 提示进入新目录

---

## 🔍 检测逻辑

```typescript
// 代码逻辑
if (!projectName) {
  // 当前目录模式
  projectName = path.basename(process.cwd());
  targetDir = process.cwd();
} else {
  // 新目录模式
  targetDir = path.resolve(process.cwd(), projectName);
}
```

---

## 📋 完整示例

### 示例1: Web全栈项目

```bash
# 当前目录模式
$ mkdir my-saas-app
$ cd my-saas-app
$ ai-dev init

🚀 AI超级个体开发模板 v1.0.0

📁 在当前目录初始化项目: my-saas-app

? 请选择项目类型: Web全栈应用
? 请输入项目描述: 一个 SaaS 产品...
? 请输入作者名称: Your Name

📋 项目配置摘要:
  项目名称: my-saas-app
  项目类型: Web全栈应用
  Git初始化: 是

✨ 项目初始化完成！

📚 推荐阅读:
   ./README.md - 项目说明
   ./CLAUDE.md - AI辅助开发流程
   ./docs/00-项目概览.md - 项目概览

$ ls -la
drwxr-xr-x  .claude/
drwxr-xr-x  docs/
drwxr-xr-x  src/
-rw-r--r--  README.md
-rw-r--r--  CLAUDE.md
-rw-r--r--  package.json
...
```

### 示例2: 后端API项目

```bash
# 新目录模式（传统方式）
$ ai-dev init user-api --type backend-api --non-interactive

🚀 AI超级个体开发模板 v1.0.0

📋 项目配置摘要:
  项目名称: user-api
  项目类型: 后端API服务

✨ 项目初始化完成！

📚 推荐阅读:
   user-api/README.md - 项目说明
   user-api/CLAUDE.md - AI辅助开发流程

$ cd user-api
$ ls -la
drwxr-xr-x  .claude/
drwxr-xr-x  docs/
drwxr-xr-x  src/
...
```

---

## ⚠️ 注意事项

### 1. 目录非空检查

**新目录模式**: 严格检查，目录不为空会报错

```bash
$ ai-dev init existing-dir
❌ 目标目录不为空: ./existing-dir
提示: 使用 --force 选项强制覆盖或选择其他项目名称
```

**当前目录模式**: 允许目录有文件（因为可能是 Git 仓库）

```bash
$ ls -la
.git/
README.md

$ ai-dev init  # ✅ 允许，会与现有文件共存
```

### 2. 项目名称

**自动获取**: 使用目录名作为项目名

```bash
$ pwd
/home/user/awesome-project

$ ai-dev init
# 项目名自动为 "awesome-project"
```

**建议**: 目录名遵循项目命名规范
- 只包含字母、数字、横线、下划线
- 不要用空格或特殊字符

### 3. Git集成

**现有Git仓库**: 会检测并跳过初始化

```bash
$ git status  # 已是 Git 仓库
$ ai-dev init
# 会跳过 git init，直接添加新文件
```

**无Git**: 正常初始化 Git

```bash
$ ai-dev init
# 会执行 git init、创建 .gitignore、initial commit
```

---

## 🆚 对比

| 特性 | 当前目录模式 | 新目录模式 |
|------|-------------|------------|
| **命令** | `ai-dev init` | `ai-dev init project-name` |
| **目标目录** | 当前目录 | 创建新目录 |
| **项目名** | 当前目录名 | 参数指定 |
| **空目录检查** | 宽松（允许.git等） | 严格（必须空） |
| **适用场景** | Git仓库、IDE | 快速创建 |
| **路径提示** | `./README.md` | `project-name/README.md` |

---

## 🚀 最佳实践

### 1. Git工作流

```bash
# 1. 创建 Git 仓库
git init my-project
cd my-project

# 2. 初始化项目
ai-dev init

# 3. 查看更改
git status
git diff

# 4. 提交
git add .
git commit -m "Initial project setup"
```

### 2. 团队协作

```bash
# 成员A: 创建并推送
mkdir team-project
cd team-project
git init
ai-dev init
git add .
git commit -m "Initial setup"
git remote add origin https://github.com/team/project.git
git push -u origin main

# 成员B: 克隆并开始
git clone https://github.com/team/project.git
cd project
npm install
# 直接开始开发，无需再次 init
```

### 3. 快速原型

```bash
# 快速测试一个想法
mkdir /tmp/quick-test
cd /tmp/quick-test
ai-dev init --type web-fullstack --non-interactive --no-install
code .  # 用 VS Code 打开
```

---

## 📚 相关文档

- [USAGE_GUIDE.md](../USAGE_GUIDE.md) - 完整使用指南
- [README.md](../README.md) - 项目说明
- [CLAUDE.md](../CLAUDE.md) - AI开发工作流

---

**创建日期**: 2025-12-11
**作者**: AI Dev Template Team
**版本**: 1.0.0

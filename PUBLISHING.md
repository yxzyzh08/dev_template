# 发布指南 - AI Dev Template CLI

> 如何将这个CLI工具发布到npm，让其他人可以直接使用

---

## 📋 发布前准备清单

### 1. 确保项目信息正确

检查 [package.json](package.json):

```json
{
  "name": "@ai-dev-template/cli",           // ✅ npm包名
  "version": "1.0.0",                        // ✅ 版本号
  "description": "...",                      // ✅ 描述
  "author": "AI Dev Template Team",         // ⚠️ 改成你的名字
  "license": "MIT",                          // ✅ 许可证
  "repository": {
    "type": "git",
    "url": "https://github.com/yourusername/ai-dev-template.git"  // ⚠️ 改成你的仓库
  }
}
```

### 2. 更新README和文档

- ✅ README.md - 项目说明
- ✅ USAGE_GUIDE.md - 使用指南
- ⚠️ 更新GitHub仓库URL
- ⚠️ 添加LICENSE文件

### 3. 测试构建

```bash
# 清理旧文件
rm -rf dist node_modules

# 重新安装依赖
npm install

# 构建项目
npm run build

# 本地测试
npm link
ai-dev --version
ai-dev init test-project
```

---

## 🚀 发布到npm

### 方式1: 发布到公共npm（推荐）

#### 步骤1: 创建npm账号

如果还没有npm账号：
```bash
# 访问 https://www.npmjs.com/ 注册账号
# 或使用命令行注册
npm adduser
```

#### 步骤2: 登录npm

```bash
npm login
# 输入用户名、密码、邮箱
# 如果启用了2FA，输入验证码
```

验证登录：
```bash
npm whoami
# 应该显示你的用户名
```

#### 步骤3: 检查包名是否可用

```bash
# 检查包名是否被占用
npm view @ai-dev-template/cli

# 如果显示404，说明可以使用
# 如果已被占用，需要改名
```

**如果包名被占用**，修改 `package.json`:
```json
{
  "name": "@your-username/ai-dev-template",  // 使用你的用户名
  // 或
  "name": "ai-dev-template-cli"              // 不使用scope
}
```

#### 步骤4: 发布

```bash
# 确保已构建
npm run build

# 发布（首次）
npm publish --access public

# 如果使用scoped包（@开头），必须加 --access public
```

#### 步骤5: 验证发布

```bash
# 查看npm上的包
npm view @ai-dev-template/cli

# 在另一台机器或新目录测试安装
npm install -g @ai-dev-template/cli
ai-dev --version
```

---

### 方式2: 发布到私有npm（企业内网）

#### 选项A: 使用Verdaccio（轻量级私有npm）

```bash
# 1. 安装Verdaccio
npm install -g verdaccio

# 2. 启动Verdaccio
verdaccio
# 访问 http://localhost:4873

# 3. 配置npm registry
npm set registry http://localhost:4873

# 4. 创建用户
npm adduser --registry http://localhost:4873

# 5. 发布
npm publish --registry http://localhost:4873

# 6. 团队成员安装
npm install -g @ai-dev-template/cli --registry http://localhost:4873
```

#### 选项B: 使用npm Enterprise或Artifactory

```bash
# 配置企业npm registry
npm config set registry https://your-company-npm.com

# 登录
npm login

# 发布
npm publish
```

---

### 方式3: GitHub Package Registry

```bash
# 1. 在 package.json 中添加
{
  "name": "@your-username/ai-dev-template",
  "repository": {
    "type": "git",
    "url": "https://github.com/your-username/ai-dev-template.git"
  },
  "publishConfig": {
    "registry": "https://npm.pkg.github.com"
  }
}

# 2. 创建 .npmrc 文件
echo "//npm.pkg.github.com/:_authToken=YOUR_GITHUB_TOKEN" > .npmrc

# 3. 发布
npm publish

# 4. 团队成员安装
npm install -g @your-username/ai-dev-template --registry=https://npm.pkg.github.com
```

---

## 🔄 版本管理

### 语义化版本（Semantic Versioning）

```
版本格式: MAJOR.MINOR.PATCH (例如: 1.2.3)

- MAJOR: 不兼容的API更改
- MINOR: 新增功能，向下兼容
- PATCH: Bug修复，向下兼容
```

### 发布新版本

```bash
# 补丁版本 (1.0.0 -> 1.0.1)
npm version patch
npm publish

# 小版本 (1.0.1 -> 1.1.0)
npm version minor
npm publish

# 大版本 (1.1.0 -> 2.0.0)
npm version major
npm publish

# 预发布版本 (1.0.0 -> 1.0.1-beta.0)
npm version prerelease --preid=beta
npm publish --tag beta
```

### Git标签

```bash
# npm version 会自动创建git tag
npm version patch  # 创建 v1.0.1 tag

# 推送tag到GitHub
git push origin --tags

# 或使用GitHub Actions自动发布
```

---

## 🤖 自动化发布（CI/CD）

### GitHub Actions自动发布

创建 `.github/workflows/publish.yml`:

```yaml
name: Publish to npm

on:
  release:
    types: [created]

jobs:
  publish:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          registry-url: 'https://registry.npmjs.org'

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build

      - name: Publish to npm
        run: npm publish --access public
        env:
          NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}
```

**设置步骤**:
1. 在npm创建Access Token (https://www.npmjs.com/settings/tokens)
2. 在GitHub仓库 Settings → Secrets → New repository secret
3. 名称: `NPM_TOKEN`, 值: 你的npm token
4. 创建GitHub Release时会自动发布到npm

---

## 📦 发布清单

### 发布前检查

```bash
# ✅ 运行测试
npm test

# ✅ 代码检查
npm run lint

# ✅ 构建成功
npm run build

# ✅ 本地测试
npm link
ai-dev init test-project
cd test-project && ls -la

# ✅ 检查发布文件
npm pack --dry-run
# 查看哪些文件会被发布

# ✅ 检查package.json的files字段
cat package.json | grep -A 5 '"files"'
```

### package.json的files字段

确保只发布必要文件：

```json
{
  "files": [
    "dist",           // ✅ 编译后的代码
    "README.md",      // ✅ 说明文档
    "LICENSE"         // ✅ 许可证
  ]
}
```

**不要发布**:
- ❌ `src/` - 源代码（不需要）
- ❌ `node_modules/` - 依赖（自动排除）
- ❌ `tests/` - 测试文件
- ❌ `.git/` - Git历史
- ❌ 开发配置文件

---

## 🔍 发布后验证

### 1. npm网站检查

访问: https://www.npmjs.com/package/@ai-dev-template/cli

检查：
- ✅ 包信息正确
- ✅ README显示正常
- ✅ 版本号正确
- ✅ 依赖列表正确

### 2. 安装测试

```bash
# 在新目录测试
cd /tmp
npm install -g @ai-dev-template/cli

# 验证版本
ai-dev --version

# 创建测试项目
ai-dev init verify-project --type cli-tool
cd verify-project

# 检查生成的文件
ls -la
cat README.md
ls .claude/skills/
```

### 3. 不同平台测试

- ✅ macOS
- ✅ Linux
- ✅ Windows
- ✅ Node.js 14, 16, 18, 20

---

## 🐛 常见问题

### Q1: 发布失败 - 403 Forbidden

**原因**: 包名已被占用或没有权限

**解决**:
```bash
# 检查包是否存在
npm view @ai-dev-template/cli

# 改名或使用你的用户名
# package.json
{
  "name": "@your-username/ai-dev-template"
}
```

### Q2: 发布失败 - 需要2FA

**解决**:
```bash
# 确保已启用2FA
npm profile get

# 发布时输入验证码
npm publish --otp=123456
```

### Q3: 发布后用户报告"找不到命令"

**原因**: bin字段配置错误

**检查**:
```json
{
  "bin": {
    "ai-dev": "./dist/cli/index.js"  // ✅ 路径正确
  }
}
```

**确保入口文件有执行权限**:
```bash
# dist/cli/index.js 第一行
#!/usr/bin/env node
```

### Q4: 更新版本后用户还在用旧版本

**用户需要手动更新**:
```bash
npm update -g @ai-dev-template/cli

# 或重新安装
npm uninstall -g @ai-dev-template/cli
npm install -g @ai-dev-template/cli
```

---

## 📊 发布后运营

### 监控下载量

```bash
# 查看下载统计
npm view @ai-dev-template/cli
npm view @ai-dev-template/cli versions
npm view @ai-dev-template/cli dist-tags
```

### 收集反馈

- GitHub Issues
- npm包页面
- 用户反馈邮件

### 维护更新

```bash
# 定期更新依赖
npm outdated
npm update

# 修复安全漏洞
npm audit
npm audit fix

# 发布补丁版本
npm version patch
npm publish
```

---

## 🎯 下一步

发布完成后：

1. ✅ **更新文档** - 将仓库URL更新到README
2. ✅ **添加徽章** - 添加npm版本、下载量徽章
3. ✅ **创建演示** - 录制使用视频
4. ✅ **推广** - 社交媒体、开发者社区
5. ✅ **维护** - 响应Issues，持续改进

---

## 📝 发布脚本

创建 `scripts/publish.sh` 简化发布流程：

```bash
#!/bin/bash
set -e

echo "🚀 开始发布流程..."

# 1. 检查工作目录干净
if [[ -n $(git status -s) ]]; then
  echo "❌ 工作目录不干净，请先提交更改"
  exit 1
fi

# 2. 运行测试
echo "🧪 运行测试..."
npm test

# 3. 构建项目
echo "🔨 构建项目..."
npm run build

# 4. 本地验证
echo "✅ 本地验证..."
npm pack --dry-run

# 5. 选择版本类型
echo ""
echo "选择版本类型:"
echo "  1) patch (bug修复)"
echo "  2) minor (新功能)"
echo "  3) major (破坏性更改)"
read -p "请选择 [1-3]: " version_choice

case $version_choice in
  1) npm version patch ;;
  2) npm version minor ;;
  3) npm version major ;;
  *) echo "无效选择"; exit 1 ;;
esac

# 6. 发布到npm
echo "📦 发布到npm..."
npm publish --access public

# 7. 推送到Git
echo "📤 推送到GitHub..."
git push origin main --tags

echo ""
echo "✅ 发布成功！"
echo "查看: https://www.npmjs.com/package/@ai-dev-template/cli"
```

使用方式：
```bash
chmod +x scripts/publish.sh
./scripts/publish.sh
```

---

**创建日期**: 2025-12-11
**维护者**: AI Dev Template Team

# AI Dev Template CLI - Windows PowerShell 安装脚本

$ErrorActionPreference = "Stop"

# 颜色函数
function Write-ColorOutput($ForegroundColor) {
    $fc = $host.UI.RawUI.ForegroundColor
    $host.UI.RawUI.ForegroundColor = $ForegroundColor
    if ($args) {
        Write-Output $args
    }
    $host.UI.RawUI.ForegroundColor = $fc
}

Write-Host ""
Write-ColorOutput Green "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
Write-ColorOutput Green "  AI Dev Template CLI 安装程序"
Write-ColorOutput Green "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
Write-Host ""

# 检查Node.js
try {
    $nodeVersion = node -v
    Write-ColorOutput Green "✓ Node.js 版本: $nodeVersion"
} catch {
    Write-ColorOutput Red "错误: 未找到 Node.js"
    Write-Host "请先安装 Node.js (>= 14.0.0): https://nodejs.org/"
    exit 1
}

# 检查npm
try {
    $npmVersion = npm -v
    Write-ColorOutput Green "✓ npm 版本: $npmVersion"
} catch {
    Write-ColorOutput Red "错误: 未找到 npm"
    exit 1
}

Write-Host ""

# 安装方式选择
Write-Host "请选择安装方式:"
Write-Host "  1) 从 npm 安装 (推荐)"
Write-Host "  2) 从源码安装 (开发模式)"
Write-Host ""
$choice = Read-Host "请输入选项 [1-2]"

switch ($choice) {
    "1" {
        Write-Host ""
        Write-ColorOutput Yellow "正在从 npm 安装..."
        npm install -g @ai-dev-template/cli
    }
    "2" {
        Write-Host ""
        Write-ColorOutput Yellow "正在从 GitHub 克隆源码..."

        # 临时目录
        $tempDir = Join-Path $env:TEMP "ai-dev-template-install"
        if (Test-Path $tempDir) {
            Remove-Item -Recurse -Force $tempDir
        }
        New-Item -ItemType Directory -Path $tempDir | Out-Null
        Set-Location $tempDir

        # 克隆仓库
        git clone https://github.com/yourusername/ai-dev-template.git
        Set-Location ai-dev-template

        Write-ColorOutput Yellow "正在安装依赖..."
        npm install

        Write-ColorOutput Yellow "正在构建项目..."
        npm run build

        Write-ColorOutput Yellow "正在全局链接..."
        npm link

        # 清理
        Set-Location $HOME
        Remove-Item -Recurse -Force $tempDir
    }
    default {
        Write-ColorOutput Red "无效选项"
        exit 1
    }
}

Write-Host ""
Write-ColorOutput Green "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
Write-ColorOutput Green "✓ 安装成功！"
Write-ColorOutput Green "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
Write-Host ""
Write-Host "现在可以使用以下命令："
Write-Host ""
Write-Host "  创建新项目:"
Write-ColorOutput Yellow "    ai-dev init my-project"
Write-Host ""
Write-Host "  查看帮助:"
Write-ColorOutput Yellow "    ai-dev --help"
Write-Host ""
Write-Host "  生成PRD文档:"
Write-ColorOutput Yellow "    ai-dev generate-prd"
Write-Host ""
Write-Host "  验证项目结构:"
Write-ColorOutput Yellow "    ai-dev validate"
Write-Host ""
Write-Host "完整文档: https://github.com/yourusername/ai-dev-template"
Write-Host ""

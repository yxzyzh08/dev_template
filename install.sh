#!/bin/bash
# AI Dev Template CLI - Linux/macOS 安装脚本

set -e

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${GREEN}  AI Dev Template CLI 安装程序${NC}"
echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

# 检查Node.js
if ! command -v node &> /dev/null; then
    echo -e "${RED}错误: 未找到 Node.js${NC}"
    echo "请先安装 Node.js (>= 14.0.0): https://nodejs.org/"
    exit 1
fi

NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 14 ]; then
    echo -e "${RED}错误: Node.js 版本过低 (需要 >= 14.0.0)${NC}"
    exit 1
fi

echo -e "${GREEN}✓${NC} Node.js 版本: $(node -v)"

# 检查npm
if ! command -v npm &> /dev/null; then
    echo -e "${RED}错误: 未找到 npm${NC}"
    exit 1
fi

echo -e "${GREEN}✓${NC} npm 版本: $(npm -v)"
echo ""

# 安装方式选择
echo "请选择安装方式:"
echo "  1) 从 npm 安装 (推荐)"
echo "  2) 从源码安装 (开发模式)"
echo ""
read -p "请输入选项 [1-2]: " install_choice

case $install_choice in
    1)
        echo ""
        echo -e "${YELLOW}正在从 npm 安装...${NC}"
        npm install -g @ai-dev-template/cli
        ;;
    2)
        echo ""
        echo -e "${YELLOW}正在从 GitHub 克隆源码...${NC}"

        # 临时目录
        TEMP_DIR=$(mktemp -d)
        cd "$TEMP_DIR"

        # 克隆仓库
        git clone https://github.com/yourusername/ai-dev-template.git
        cd ai-dev-template

        echo -e "${YELLOW}正在安装依赖...${NC}"
        npm install

        echo -e "${YELLOW}正在构建项目...${NC}"
        npm run build

        echo -e "${YELLOW}正在全局链接...${NC}"
        npm link

        # 清理
        cd ~
        rm -rf "$TEMP_DIR"
        ;;
    *)
        echo -e "${RED}无效选项${NC}"
        exit 1
        ;;
esac

echo ""
echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${GREEN}✓ 安装成功！${NC}"
echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""
echo "现在可以使用以下命令："
echo ""
echo "  创建新项目:"
echo -e "    ${YELLOW}ai-dev init my-project${NC}"
echo ""
echo "  查看帮助:"
echo -e "    ${YELLOW}ai-dev --help${NC}"
echo ""
echo "  生成PRD文档:"
echo -e "    ${YELLOW}ai-dev generate-prd${NC}"
echo ""
echo "  验证项目结构:"
echo -e "    ${YELLOW}ai-dev validate${NC}"
echo ""
echo "完整文档: https://github.com/yourusername/ai-dev-template"
echo ""

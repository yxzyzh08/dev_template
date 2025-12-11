# 多行文本输入优化说明

## 问题描述

在使用 `ai-dev init` 交互式输入项目描述时，如果粘贴多行文本，终端会显示重复的内容。这是 `prompts` 库的已知限制。

### 原因

当快速粘贴多行文本时：
1. 终端会逐字符接收输入
2. `prompts` 库会对每个字符触发重新渲染
3. 导致终端显示大量重复内容

### 视觉效果

```
请输入项目描述（可选）: 这是第一行
这是第一行这是第一行这是第一行...  ← 显示重复
这是第二行这是第二行...           ← 显示重复
```

## 已实现的优化

### 1. 用户提示

在输入框前显示提示信息：
```
💡 提示: 如需输入多行文本，建议直接粘贴后按回车（忽略显示重复）
```

### 2. 自动清理重复内容

代码会自动检测并移除粘贴导致的重复行：

```typescript
// 移除可能的重复行（粘贴导致的）
.split('\n')
.filter((line: string, index: number, array: string[]) => {
  // 如果当前行和下一行完全相同，跳过重复
  return index === array.length - 1 || line !== array[index + 1];
})
.join('\n')
```

### 3. 最终结果保证正确

虽然**显示时可能有重复**，但**最终保存的内容是正确的**。

## 使用建议

### 方式1: 直接粘贴（推荐）

```bash
ai-dev init my-project

# 出现描述输入提示时
# 1. 直接粘贴多行文本（忽略显示重复）
# 2. 按回车确认
# 3. 检查摘要中的描述是否正确
```

### 方式2: 非交互模式（适合脚本）

如果经常需要输入长描述，建议：

```bash
# 1. 先创建项目（跳过交互）
ai-dev init my-project --type web-fullstack --non-interactive

# 2. 手动编辑生成的配置文件
cd my-project
# 编辑 .ai-dev.json 或 README.md
```

### 方式3: 逐行输入（最稳定但慢）

```bash
# 输入第一行后按回车
# 如果支持多行，可以继续输入
# 否则需要后续手动编辑
```

## 技术限制

这个问题源于：

1. **Node.js TTY 限制** - 无法完全控制终端的粘贴行为
2. **prompts 库设计** - 使用实时渲染，每个字符都触发更新
3. **终端模拟器差异** - 不同终端处理粘贴的方式不同

### 替代方案（未实现）

可能的其他解决方案：

#### 方案A: 切换到 inquirer.js
```typescript
// inquirer 对多行输入支持更好
import inquirer from 'inquirer';

const { description } = await inquirer.prompt([
  {
    type: 'editor',  // 打开编辑器
    name: 'description',
    message: '请输入项目描述',
  }
]);
```

**缺点**: 需要系统安装文本编辑器（vim/nano/notepad）

#### 方案B: 使用文件输入
```bash
ai-dev init my-project --description-file desc.txt
```

**缺点**: 增加使用复杂度

#### 方案C: 使用在线编辑器
```typescript
// 启动本地 Web 服务器，在浏览器中输入
```

**缺点**: 过度工程化

## 验证修复

测试多行粘贴：

```bash
# 1. 运行 init
ai-dev init test-multiline

# 2. 粘贴以下内容到描述框：
"""
在电信行业，传统的营销策划流程往往依赖人工经验
数据分析滞后，且缺乏从策划到执行再到复盘的有效闭环
为了展示现代化技术如何赋能营销，本项目构建了一个基于 AI 驱动的 CVM 系统
"""

# 3. 检查摘要显示
# 应该看到完整的3行描述，没有重复

# 4. 检查生成的文件
cat test-multiline/.ai-dev.json
# description 字段应该包含正确的3行内容
```

## 相关文件

- **源码**: [src/cli/prompts/projectName.ts](../src/cli/prompts/projectName.ts)
- **函数**: `promptProjectDescription()`
- **优化代码**: 第 62-74 行

## 未来改进

可能的未来优化：

1. ✅ **已完成**: 添加用户提示
2. ✅ **已完成**: 自动清理重复行
3. 🔄 **考虑中**: 支持 `--description` 命令行参数
4. 🔄 **考虑中**: 支持从文件读取 `--description-file`
5. 🔄 **考虑中**: 切换到更好的输入库

---

**最后更新**: 2025-12-11
**相关 Issue**: #N/A (内部优化)

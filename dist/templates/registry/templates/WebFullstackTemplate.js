"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebFullstackTemplate = void 0;
class WebFullstackTemplate {
    getTemplate() {
        return {
            id: 'web-fullstack',
            type: 'web-fullstack',
            name: 'Web全栈项目',
            version: '1.0.0',
            description: '前后端分离的Web应用，包含完整的开发文档和Claude技能',
            directories: [
                'src/frontend',
                'src/backend',
                'src/shared',
                'docs/modules',
                'docs/architecture',
                'docs/trackers',
                'docs/PRD',
                'docs/PRD/assets/images',
                '.claude/skills',
                'tests/frontend',
                'tests/backend',
                'tests/integration',
                'dist',
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
    getFiles() {
        return [
            {
                targetPath: 'README.md',
                content: this.getReadmeTemplate(),
                isTemplate: true,
            },
            {
                targetPath: 'package.json',
                content: this.getPackageJsonTemplate(),
                isTemplate: true,
            },
            {
                targetPath: '.gitignore',
                content: this.getGitignoreTemplate(),
                isTemplate: false,
            },
            {
                targetPath: 'CLAUDE.md',
                content: this.getClaudeMdTemplate(),
                isTemplate: true,
            },
            {
                targetPath: 'docs/00-项目概览.md',
                content: this.getProjectOverviewTemplate(),
                isTemplate: true,
            },
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
    getReadmeTemplate() {
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
    getPackageJsonTemplate() {
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
    getGitignoreTemplate() {
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
    getClaudeMdTemplate() {
        return `# AI 超级个体开发助手 v.4.0

> **核心定位**: 为一个人开发软件提供全流程辅助，主动管理进度，调用专业Skill执行任务

## 项目信息

- **项目名称**: {{projectName}}
- **项目类型**: {{projectType}}
- **创建时间**: {{createdAt}}

## 当前进度

请查看 [docs/00-项目概览.md](./docs/00-项目概览.md) 了解项目当前进度。

## 快速开始

1. 需求分析阶段 - 调用 requirements-analyzer skill
2. 架构设计阶段 - 调用 architecture-designer skill
3. 代码实现阶段 - 调用 developer-guide skill
4. 测试验证阶段 - 调用 test-planner skill

## 技能列表

- **requirements-analyzer**: 需求分析，生成PRD和用户故事
- **architecture-designer**: 架构设计，技术选型和模块设计
- **developer-guide**: 代码实现，代码审查和重构
- **test-planner**: 测试策略，测试用例设计

详细说明请查看 .claude/skills/ 目录。
`;
    }
    getProjectOverviewTemplate() {
        return `# {{projectName}} 项目概览

> **创建时间**: {{createdAt}}
> **项目类型**: {{projectType}}
> **版本**: {{version}}

## 产品愿景

[请补充产品愿景]

## 目标用户

[请补充目标用户画像]

## 核心价值

[请补充产品核心价值]

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
    getRequirementsAnalyzerSkill() {
        return `# Requirements Analyzer Skill

产品需求分析师，通过结构化对话澄清需求，输出PRD文档、用户故事、原型图。
`;
    }
    getArchitectureDesignerSkill() {
        return `# Architecture Designer Skill

软件架构师，设计系统架构，包括技术选型、分层设计、模块划分、API设计、数据建模。
`;
    }
    getDeveloperGuideSkill() {
        return `# Developer Guide Skill

开发指导助手，包括代码生成、重构、代码审查、调试辅助。遵循Clean Code原则和项目编码规范。
`;
    }
    getTestPlannerSkill() {
        return `# Test Planner Skill

测试策略设计师，设计和执行测试策略，包括测试计划、测试用例设计、单元测试、集成测试、E2E测试。
`;
    }
}
exports.WebFullstackTemplate = WebFullstackTemplate;
//# sourceMappingURL=WebFullstackTemplate.js.map
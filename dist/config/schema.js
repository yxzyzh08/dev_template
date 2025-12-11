"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CONFIG_FILE_PATH = exports.CONFIG_FILE_NAME = exports.DefaultConfig = exports.ConfigValidationRules = void 0;
exports.ConfigValidationRules = {
    projectName: {
        minLength: 1,
        maxLength: 100,
        pattern: /^[a-zA-Z0-9-_]+$/,
        message: '项目名称只能包含字母、数字、横线和下划线',
    },
    version: {
        pattern: /^\d+\.\d+\.\d+$/,
        message: '版本号必须符合 semver 格式 (例如: 1.0.0)',
    },
    email: {
        pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        message: '邮箱格式不正确',
    },
    gitRemote: {
        pattern: /^(https?:\/\/|git@).+\.git$/,
        message: 'Git远程仓库地址格式不正确',
    },
};
exports.DefaultConfig = {
    project: {
        name: 'my-project',
        type: 'web-fullstack',
        version: '0.1.0',
    },
    git: {
        enabled: true,
    },
    install: {
        enabled: true,
        manager: 'npm',
    },
    skills: {
        enabled: true,
        list: [
            'requirements-analyzer',
            'architecture-designer',
            'developer-guide',
            'test-planner',
        ],
    },
    documentation: {
        enabled: true,
        outputDir: 'docs',
    },
};
exports.CONFIG_FILE_NAME = '.ai-dev.json';
exports.CONFIG_FILE_PATH = `./${exports.CONFIG_FILE_NAME}`;
//# sourceMappingURL=schema.js.map
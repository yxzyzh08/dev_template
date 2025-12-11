"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GitHelper = void 0;
const simple_git_1 = __importDefault(require("simple-git"));
const types_1 = require("../types");
class GitHelper {
    constructor(baseDir) {
        this.git = (0, simple_git_1.default)(baseDir);
    }
    async init(projectPath) {
        try {
            const git = (0, simple_git_1.default)(projectPath);
            await git.init();
        }
        catch (error) {
            throw new types_1.GitError(`无法初始化Git仓库: ${projectPath}`, '确保已安装Git，或使用--no-git选项跳过');
        }
    }
    async add(projectPath, files) {
        try {
            const git = (0, simple_git_1.default)(projectPath);
            await git.add(files);
        }
        catch (error) {
            throw new types_1.GitError(`无法添加文件到暂存区`, '检查文件是否存在');
        }
    }
    async commit(projectPath, message) {
        try {
            const git = (0, simple_git_1.default)(projectPath);
            await git.commit(message);
        }
        catch (error) {
            throw new types_1.GitError(`无法提交: ${error.message}`, '检查是否有文件已添加到暂存区');
        }
    }
    async status(projectPath) {
        try {
            const git = (0, simple_git_1.default)(projectPath);
            return await git.status();
        }
        catch (error) {
            throw new types_1.GitError(`无法获取Git状态`, '检查是否为Git仓库');
        }
    }
    async isRepo(projectPath) {
        try {
            const git = (0, simple_git_1.default)(projectPath);
            await git.status();
            return true;
        }
        catch {
            return false;
        }
    }
    async isGitInstalled() {
        try {
            await this.git.version();
            return true;
        }
        catch {
            return false;
        }
    }
    async createGitignore(projectPath, content) {
        const fs = require('fs-extra');
        const path = require('path');
        try {
            await fs.writeFile(path.join(projectPath, '.gitignore'), content, 'utf8');
        }
        catch (error) {
            throw new types_1.GitError(`无法创建.gitignore文件`, '检查目录权限');
        }
    }
    async configUser(projectPath, name, email) {
        try {
            const git = (0, simple_git_1.default)(projectPath);
            await git.addConfig('user.name', name);
            await git.addConfig('user.email', email);
        }
        catch (error) {
            console.warn('Git用户配置失败，使用全局配置');
        }
    }
    async currentBranch(projectPath) {
        try {
            const git = (0, simple_git_1.default)(projectPath);
            const status = await git.status();
            return status.current || 'main';
        }
        catch (error) {
            throw new types_1.GitError(`无法获取当前分支`, '检查是否为Git仓库');
        }
    }
}
exports.GitHelper = GitHelper;
//# sourceMappingURL=GitHelper.js.map
/**
 * Git操作工具类
 *
 * 封装simple-git，提供常用的Git操作方法
 */

import simpleGit, { SimpleGit, StatusResult } from 'simple-git';
import { GitError } from '@/types';

export class GitHelper {
  private git: SimpleGit;

  constructor(baseDir?: string) {
    this.git = simpleGit(baseDir);
  }

  /**
   * 初始化Git仓库
   */
  async init(projectPath: string): Promise<void> {
    try {
      const git = simpleGit(projectPath);
      await git.init();
    } catch (error) {
      throw new GitError(
        `无法初始化Git仓库: ${projectPath}`,
        '确保已安装Git，或使用--no-git选项跳过'
      );
    }
  }

  /**
   * 添加文件到暂存区
   */
  async add(projectPath: string, files: string[]): Promise<void> {
    try {
      const git = simpleGit(projectPath);
      await git.add(files);
    } catch (error) {
      throw new GitError(
        `无法添加文件到暂存区`,
        '检查文件是否存在'
      );
    }
  }

  /**
   * 提交更改
   */
  async commit(projectPath: string, message: string): Promise<void> {
    try {
      const git = simpleGit(projectPath);
      await git.commit(message);
    } catch (error) {
      throw new GitError(
        `无法提交: ${(error as Error).message}`,
        '检查是否有文件已添加到暂存区'
      );
    }
  }

  /**
   * 检查Git状态
   */
  async status(projectPath: string): Promise<StatusResult> {
    try {
      const git = simpleGit(projectPath);
      return await git.status();
    } catch (error) {
      throw new GitError(
        `无法获取Git状态`,
        '检查是否为Git仓库'
      );
    }
  }

  /**
   * 检查是否为Git仓库
   */
  async isRepo(projectPath: string): Promise<boolean> {
    try {
      const git = simpleGit(projectPath);
      await git.status();
      return true;
    } catch {
      return false;
    }
  }

  /**
   * 检查Git是否已安装
   */
  async isGitInstalled(): Promise<boolean> {
    try {
      await this.git.version();
      return true;
    } catch {
      return false;
    }
  }

  /**
   * 创建.gitignore文件
   */
  async createGitignore(
    projectPath: string,
    content: string
  ): Promise<void> {
    const fs = require('fs-extra');
    const path = require('path');
    try {
      await fs.writeFile(path.join(projectPath, '.gitignore'), content, 'utf8');
    } catch (error) {
      throw new GitError(
        `无法创建.gitignore文件`,
        '检查目录权限'
      );
    }
  }

  /**
   * 配置用户信息（可选）
   */
  async configUser(
    projectPath: string,
    name: string,
    email: string
  ): Promise<void> {
    try {
      const git = simpleGit(projectPath);
      await git.addConfig('user.name', name);
      await git.addConfig('user.email', email);
    } catch (error) {
      // 配置失败不抛出错误，因为可能已全局配置
      console.warn('Git用户配置失败，使用全局配置');
    }
  }

  /**
   * 获取当前分支名
   */
  async currentBranch(projectPath: string): Promise<string> {
    try {
      const git = simpleGit(projectPath);
      const status = await git.status();
      return status.current || 'main';
    } catch (error) {
      throw new GitError(
        `无法获取当前分支`,
        '检查是否为Git仓库'
      );
    }
  }
}

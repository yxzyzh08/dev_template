/**
 * 文件系统操作工具类
 *
 * 封装fs-extra，提供Promise API的文件操作方法
 */

import fs from 'fs-extra';
import path from 'path';
import { FileSystemError, CopyOptions, WriteOptions } from '@/types';

export class FileSystemHelper {
  /**
   * 确保目录存在，如果不存在则创建
   */
  async ensureDir(dirPath: string): Promise<void> {
    try {
      await fs.ensureDir(dirPath);
    } catch (error) {
      throw new FileSystemError(
        `无法创建目录: ${dirPath}`,
        '检查文件系统权限'
      );
    }
  }

  /**
   * 复制文件或目录
   */
  async copy(
    src: string,
    dest: string,
    options?: CopyOptions
  ): Promise<void> {
    try {
      await fs.copy(src, dest, {
        overwrite: options?.overwrite ?? false,
        errorOnExist: options?.errorOnExist ?? false,
        preserveTimestamps: options?.preserveTimestamps ?? true,
      });
    } catch (error) {
      throw new FileSystemError(
        `无法复制 ${src} 到 ${dest}: ${(error as Error).message}`,
        '检查源文件是否存在，目标路径是否有权限'
      );
    }
  }

  /**
   * 写入文件
   */
  async writeFile(
    filePath: string,
    content: string,
    encoding: BufferEncoding = 'utf8'
  ): Promise<void> {
    try {
      await fs.outputFile(filePath, content, encoding);
    } catch (error) {
      throw new FileSystemError(
        `无法写入文件: ${filePath}`,
        '检查目录权限和磁盘空间'
      );
    }
  }

  /**
   * 读取文件
   */
  async readFile(
    filePath: string,
    encoding: BufferEncoding = 'utf8'
  ): Promise<string> {
    try {
      return await fs.readFile(filePath, encoding);
    } catch (error) {
      throw new FileSystemError(
        `无法读取文件: ${filePath}`,
        '检查文件是否存在'
      );
    }
  }

  /**
   * 写入JSON文件
   */
  async writeJson(
    filePath: string,
    data: any,
    options?: WriteOptions
  ): Promise<void> {
    try {
      await fs.writeJson(filePath, data, {
        spaces: options?.spaces ?? 2,
        EOL: options?.EOL ?? '\n',
        replacer: options?.replacer ?? undefined,
      });
    } catch (error) {
      throw new FileSystemError(
        `无法写入JSON文件: ${filePath}`,
        '检查数据是否可序列化'
      );
    }
  }

  /**
   * 读取JSON文件
   */
  async readJson(filePath: string): Promise<any> {
    try {
      return await fs.readJson(filePath);
    } catch (error) {
      throw new FileSystemError(
        `无法读取JSON文件: ${filePath}`,
        '检查文件是否存在且格式正确'
      );
    }
  }

  /**
   * 检查路径是否存在
   */
  async exists(targetPath: string): Promise<boolean> {
    try {
      return await fs.pathExists(targetPath);
    } catch {
      return false;
    }
  }

  /**
   * 删除文件或目录
   */
  async remove(targetPath: string): Promise<void> {
    try {
      await fs.remove(targetPath);
    } catch (error) {
      throw new FileSystemError(
        `无法删除: ${targetPath}`,
        '检查文件是否被占用'
      );
    }
  }

  /**
   * 递归列出目录下所有文件
   */
  async listFiles(dirPath: string): Promise<string[]> {
    const files: string[] = [];

    async function walk(dir: string) {
      try {
        const entries = await fs.readdir(dir, { withFileTypes: true });

        for (const entry of entries) {
          const fullPath = path.join(dir, entry.name);
          if (entry.isDirectory()) {
            await walk(fullPath);
          } else {
            files.push(fullPath);
          }
        }
      } catch (error) {
        throw new FileSystemError(
          `无法列出目录: ${dir}`,
          '检查目录权限'
        );
      }
    }

    await walk(dirPath);
    return files;
  }

  /**
   * 移动文件或目录
   */
  async move(src: string, dest: string): Promise<void> {
    try {
      await fs.move(src, dest, { overwrite: false });
    } catch (error) {
      throw new FileSystemError(
        `无法移动 ${src} 到 ${dest}`,
        '检查目标路径是否已存在'
      );
    }
  }

  /**
   * 获取文件信息
   */
  async stat(filePath: string): Promise<fs.Stats> {
    try {
      return await fs.stat(filePath);
    } catch (error) {
      throw new FileSystemError(
        `无法获取文件信息: ${filePath}`,
        '检查文件是否存在'
      );
    }
  }

  /**
   * 创建符号链接
   */
  async symlink(target: string, linkPath: string): Promise<void> {
    try {
      await fs.symlink(target, linkPath);
    } catch (error) {
      throw new FileSystemError(
        `无法创建符号链接: ${linkPath} -> ${target}`,
        '检查是否有创建链接的权限'
      );
    }
  }
}

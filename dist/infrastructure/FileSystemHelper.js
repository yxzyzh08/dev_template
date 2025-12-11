"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileSystemHelper = void 0;
const fs_extra_1 = __importDefault(require("fs-extra"));
const path_1 = __importDefault(require("path"));
const types_1 = require("../types");
class FileSystemHelper {
    async ensureDir(dirPath) {
        try {
            await fs_extra_1.default.ensureDir(dirPath);
        }
        catch (error) {
            throw new types_1.FileSystemError(`无法创建目录: ${dirPath}`, '检查文件系统权限');
        }
    }
    async copy(src, dest, options) {
        try {
            await fs_extra_1.default.copy(src, dest, {
                overwrite: options?.overwrite ?? false,
                errorOnExist: options?.errorOnExist ?? false,
                preserveTimestamps: options?.preserveTimestamps ?? true,
            });
        }
        catch (error) {
            throw new types_1.FileSystemError(`无法复制 ${src} 到 ${dest}: ${error.message}`, '检查源文件是否存在，目标路径是否有权限');
        }
    }
    async writeFile(filePath, content, encoding = 'utf8') {
        try {
            await fs_extra_1.default.outputFile(filePath, content, encoding);
        }
        catch (error) {
            throw new types_1.FileSystemError(`无法写入文件: ${filePath}`, '检查目录权限和磁盘空间');
        }
    }
    async readFile(filePath, encoding = 'utf8') {
        try {
            return await fs_extra_1.default.readFile(filePath, encoding);
        }
        catch (error) {
            throw new types_1.FileSystemError(`无法读取文件: ${filePath}`, '检查文件是否存在');
        }
    }
    async writeJson(filePath, data, options) {
        try {
            await fs_extra_1.default.writeJson(filePath, data, {
                spaces: options?.spaces ?? 2,
                EOL: options?.EOL ?? '\n',
                replacer: options?.replacer ?? undefined,
            });
        }
        catch (error) {
            throw new types_1.FileSystemError(`无法写入JSON文件: ${filePath}`, '检查数据是否可序列化');
        }
    }
    async readJson(filePath) {
        try {
            return await fs_extra_1.default.readJson(filePath);
        }
        catch (error) {
            throw new types_1.FileSystemError(`无法读取JSON文件: ${filePath}`, '检查文件是否存在且格式正确');
        }
    }
    async exists(targetPath) {
        try {
            return await fs_extra_1.default.pathExists(targetPath);
        }
        catch {
            return false;
        }
    }
    async remove(targetPath) {
        try {
            await fs_extra_1.default.remove(targetPath);
        }
        catch (error) {
            throw new types_1.FileSystemError(`无法删除: ${targetPath}`, '检查文件是否被占用');
        }
    }
    async listFiles(dirPath) {
        const files = [];
        async function walk(dir) {
            try {
                const entries = await fs_extra_1.default.readdir(dir, { withFileTypes: true });
                for (const entry of entries) {
                    const fullPath = path_1.default.join(dir, entry.name);
                    if (entry.isDirectory()) {
                        await walk(fullPath);
                    }
                    else {
                        files.push(fullPath);
                    }
                }
            }
            catch (error) {
                throw new types_1.FileSystemError(`无法列出目录: ${dir}`, '检查目录权限');
            }
        }
        await walk(dirPath);
        return files;
    }
    async move(src, dest) {
        try {
            await fs_extra_1.default.move(src, dest, { overwrite: false });
        }
        catch (error) {
            throw new types_1.FileSystemError(`无法移动 ${src} 到 ${dest}`, '检查目标路径是否已存在');
        }
    }
    async stat(filePath) {
        try {
            return await fs_extra_1.default.stat(filePath);
        }
        catch (error) {
            throw new types_1.FileSystemError(`无法获取文件信息: ${filePath}`, '检查文件是否存在');
        }
    }
    async symlink(target, linkPath) {
        try {
            await fs_extra_1.default.symlink(target, linkPath);
        }
        catch (error) {
            throw new types_1.FileSystemError(`无法创建符号链接: ${linkPath} -> ${target}`, '检查是否有创建链接的权限');
        }
    }
}
exports.FileSystemHelper = FileSystemHelper;
//# sourceMappingURL=FileSystemHelper.js.map
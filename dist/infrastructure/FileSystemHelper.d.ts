import fs from 'fs-extra';
import { CopyOptions, WriteOptions } from '../types';
export declare class FileSystemHelper {
    ensureDir(dirPath: string): Promise<void>;
    copy(src: string, dest: string, options?: CopyOptions): Promise<void>;
    writeFile(filePath: string, content: string, encoding?: BufferEncoding): Promise<void>;
    readFile(filePath: string, encoding?: BufferEncoding): Promise<string>;
    writeJson(filePath: string, data: any, options?: WriteOptions): Promise<void>;
    readJson(filePath: string): Promise<any>;
    exists(targetPath: string): Promise<boolean>;
    remove(targetPath: string): Promise<void>;
    listFiles(dirPath: string): Promise<string[]>;
    move(src: string, dest: string): Promise<void>;
    stat(filePath: string): Promise<fs.Stats>;
    symlink(target: string, linkPath: string): Promise<void>;
}
//# sourceMappingURL=FileSystemHelper.d.ts.map
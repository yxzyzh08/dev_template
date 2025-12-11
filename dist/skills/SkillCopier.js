"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SkillCopier = void 0;
const path_1 = __importDefault(require("path"));
const infrastructure_1 = require("../infrastructure");
class SkillCopier {
    constructor(fs) {
        this.fs = fs || new infrastructure_1.FileSystemHelper();
    }
    async copySkills(skills, targetProjectPath) {
        const targetSkillsDir = path_1.default.join(targetProjectPath, '.claude/skills');
        await this.fs.ensureDir(targetSkillsDir);
        for (const skill of skills) {
            await this.copySkill(skill, targetSkillsDir);
        }
    }
    async copySkill(skill, targetDir) {
        const targetPath = path_1.default.join(targetDir, `${skill.id}.md`);
        try {
            await this.fs.writeFile(targetPath, skill.content);
        }
        catch (error) {
            throw new Error(`复制技能文件失败 ${skill.id}: ${error instanceof Error ? error.message : '未知错误'}`);
        }
    }
    async copyFromDirectory(sourceDir, targetProjectPath) {
        const targetSkillsDir = path_1.default.join(targetProjectPath, '.claude/skills');
        const sourceExists = await this.fs.exists(sourceDir);
        if (!sourceExists) {
            throw new Error(`源目录不存在: ${sourceDir}`);
        }
        await this.fs.ensureDir(targetSkillsDir);
        const files = await this.fs.listFiles(sourceDir);
        const skillFiles = files.filter((f) => f.endsWith('.md'));
        for (const file of skillFiles) {
            const sourcePath = path_1.default.join(sourceDir, file);
            const targetPath = path_1.default.join(targetSkillsDir, file);
            await this.fs.copy(sourcePath, targetPath);
        }
    }
    async checkOverwrite(skills, targetProjectPath) {
        const targetSkillsDir = path_1.default.join(targetProjectPath, '.claude/skills');
        const overwriteFiles = [];
        for (const skill of skills) {
            const targetPath = path_1.default.join(targetSkillsDir, `${skill.id}.md`);
            const exists = await this.fs.exists(targetPath);
            if (exists) {
                overwriteFiles.push(`${skill.id}.md`);
            }
        }
        return overwriteFiles;
    }
    async copySkillsWithReport(skills, targetProjectPath) {
        const results = [];
        const targetSkillsDir = path_1.default.join(targetProjectPath, '.claude/skills');
        await this.fs.ensureDir(targetSkillsDir);
        for (const skill of skills) {
            try {
                await this.copySkill(skill, targetSkillsDir);
                results.push({
                    skillId: skill.id,
                    success: true,
                });
            }
            catch (error) {
                results.push({
                    skillId: skill.id,
                    success: false,
                    error: error instanceof Error ? error.message : '未知错误',
                });
            }
        }
        const successCount = results.filter((r) => r.success).length;
        const failedSkills = results.filter((r) => !r.success).map((r) => r.skillId);
        return {
            total: skills.length,
            succeeded: successCount,
            failed: failedSkills.length,
            failedSkills,
            results,
        };
    }
    async backupExistingSkills(targetProjectPath) {
        const skillsDir = path_1.default.join(targetProjectPath, '.claude/skills');
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const backupDir = path_1.default.join(targetProjectPath, '.claude', `skills-backup-${timestamp}`);
        const exists = await this.fs.exists(skillsDir);
        if (!exists) {
            return backupDir;
        }
        await this.fs.copy(skillsDir, backupDir);
        return backupDir;
    }
    async cleanTargetDirectory(targetProjectPath) {
        const skillsDir = path_1.default.join(targetProjectPath, '.claude/skills');
        const exists = await this.fs.exists(skillsDir);
        if (exists) {
            await this.fs.remove(skillsDir);
        }
        await this.fs.ensureDir(skillsDir);
    }
}
exports.SkillCopier = SkillCopier;
//# sourceMappingURL=SkillCopier.js.map
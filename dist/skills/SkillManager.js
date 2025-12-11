"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SkillManager = void 0;
const path_1 = __importDefault(require("path"));
const infrastructure_1 = require("../infrastructure");
const SkillLoader_1 = require("./SkillLoader");
const SkillCopier_1 = require("./SkillCopier");
class SkillManager {
    constructor(fs, loader, copier) {
        this.fs = fs || new infrastructure_1.FileSystemHelper();
        this.loader = loader || new SkillLoader_1.SkillLoader(this.fs);
        this.copier = copier || new SkillCopier_1.SkillCopier(this.fs);
        this.skills = new Map();
    }
    async loadAvailableSkills() {
        const skillsDir = path_1.default.join(__dirname, '../../assets/skills');
        const skills = await this.loader.loadFromDirectory(skillsDir);
        for (const skill of skills) {
            this.skills.set(skill.id, skill);
        }
    }
    get(id) {
        return this.skills.get(id);
    }
    getAll() {
        return Array.from(this.skills.values());
    }
    has(id) {
        return this.skills.has(id);
    }
    async copyToProject(skillIds, targetProjectPath) {
        const skillsToCopy = [];
        for (const id of skillIds) {
            const skill = this.get(id);
            if (!skill) {
                throw new Error(`技能不存在: ${id}`);
            }
            skillsToCopy.push(skill);
        }
        await this.copier.copySkills(skillsToCopy, targetProjectPath);
    }
    async copyAllToProject(targetProjectPath) {
        const allSkills = this.getAll();
        await this.copier.copySkills(allSkills, targetProjectPath);
    }
    async validateProjectSkills(projectPath) {
        const skillsDir = path_1.default.join(projectPath, '.claude/skills');
        const exists = await this.fs.exists(skillsDir);
        if (!exists) {
            return {
                valid: false,
                message: '.claude/skills目录不存在',
                missingSkills: this.getAll().map((s) => s.id),
            };
        }
        const projectSkills = await this.loader.loadFromDirectory(skillsDir);
        const projectSkillIds = new Set(projectSkills.map((s) => s.id));
        const expectedSkillIds = new Set(this.getAll().map((s) => s.id));
        const missingSkills = Array.from(expectedSkillIds).filter((id) => !projectSkillIds.has(id));
        if (missingSkills.length > 0) {
            return {
                valid: false,
                message: `缺少${missingSkills.length}个技能文件`,
                missingSkills,
            };
        }
        return {
            valid: true,
            message: '技能配置完整',
            missingSkills: [],
        };
    }
    count() {
        return this.skills.size;
    }
    listIds() {
        return Array.from(this.skills.keys());
    }
    getRecommendedSkills() {
        return [
            'requirements-analyzer',
            'architecture-designer',
            'developer-guide',
            'test-planner',
        ];
    }
}
exports.SkillManager = SkillManager;
//# sourceMappingURL=SkillManager.js.map
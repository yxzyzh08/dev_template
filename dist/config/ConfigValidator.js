"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigValidator = void 0;
const schema_1 = require("./schema");
class ConfigValidator {
    validate(config) {
        const errors = [];
        if (config.project) {
            errors.push(...this.validateProject(config.project));
        }
        else {
            errors.push({
                field: 'project',
                message: '缺少项目配置',
            });
        }
        if (config.author) {
            errors.push(...this.validateAuthor(config.author));
        }
        if (config.git) {
            errors.push(...this.validateGit(config.git));
        }
        if (config.install) {
            errors.push(...this.validateInstall(config.install));
        }
        return {
            valid: errors.length === 0,
            errors,
        };
    }
    validateProject(project) {
        const errors = [];
        if (!project.name) {
            errors.push({
                field: 'project.name',
                message: '项目名称不能为空',
            });
        }
        else {
            const nameRule = schema_1.ConfigValidationRules.projectName;
            if (project.name.length < nameRule.minLength) {
                errors.push({
                    field: 'project.name',
                    message: `项目名称至少${nameRule.minLength}个字符`,
                });
            }
            if (project.name.length > nameRule.maxLength) {
                errors.push({
                    field: 'project.name',
                    message: `项目名称最多${nameRule.maxLength}个字符`,
                });
            }
            if (!nameRule.pattern.test(project.name)) {
                errors.push({
                    field: 'project.name',
                    message: nameRule.message,
                });
            }
        }
        const validTypes = ['web-fullstack', 'mobile-app', 'backend-api', 'cli-tool'];
        if (!validTypes.includes(project.type)) {
            errors.push({
                field: 'project.type',
                message: `项目类型必须是: ${validTypes.join(', ')}`,
            });
        }
        if (!project.version) {
            errors.push({
                field: 'project.version',
                message: '版本号不能为空',
            });
        }
        else if (!schema_1.ConfigValidationRules.version.pattern.test(project.version)) {
            errors.push({
                field: 'project.version',
                message: schema_1.ConfigValidationRules.version.message,
            });
        }
        return errors;
    }
    validateAuthor(author) {
        const errors = [];
        if (!author)
            return errors;
        if (!author.name || author.name.trim() === '') {
            errors.push({
                field: 'author.name',
                message: '作者名称不能为空',
            });
        }
        if (author.email && !schema_1.ConfigValidationRules.email.pattern.test(author.email)) {
            errors.push({
                field: 'author.email',
                message: schema_1.ConfigValidationRules.email.message,
            });
        }
        return errors;
    }
    validateGit(git) {
        const errors = [];
        if (!git)
            return errors;
        if (git.remote && !schema_1.ConfigValidationRules.gitRemote.pattern.test(git.remote)) {
            errors.push({
                field: 'git.remote',
                message: schema_1.ConfigValidationRules.gitRemote.message,
            });
        }
        return errors;
    }
    validateInstall(install) {
        const errors = [];
        if (!install)
            return errors;
        const validManagers = ['npm', 'yarn', 'pnpm'];
        if (install.manager && !validManagers.includes(install.manager)) {
            errors.push({
                field: 'install.manager',
                message: `包管理器必须是: ${validManagers.join(', ')}`,
            });
        }
        return errors;
    }
    validateField(field, value) {
        switch (field) {
            case 'project.name':
                if (!value)
                    return { field, message: '项目名称不能为空' };
                if (!schema_1.ConfigValidationRules.projectName.pattern.test(value)) {
                    return { field, message: schema_1.ConfigValidationRules.projectName.message };
                }
                break;
            case 'project.version':
                if (!value)
                    return { field, message: '版本号不能为空' };
                if (!schema_1.ConfigValidationRules.version.pattern.test(value)) {
                    return { field, message: schema_1.ConfigValidationRules.version.message };
                }
                break;
            case 'author.email':
                if (value && !schema_1.ConfigValidationRules.email.pattern.test(value)) {
                    return { field, message: schema_1.ConfigValidationRules.email.message };
                }
                break;
            case 'git.remote':
                if (value && !schema_1.ConfigValidationRules.gitRemote.pattern.test(value)) {
                    return { field, message: schema_1.ConfigValidationRules.gitRemote.message };
                }
                break;
        }
        return null;
    }
}
exports.ConfigValidator = ConfigValidator;
//# sourceMappingURL=ConfigValidator.js.map
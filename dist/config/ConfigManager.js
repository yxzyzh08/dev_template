"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigManager = void 0;
const path_1 = __importDefault(require("path"));
const schema_1 = require("./schema");
const ConfigValidator_1 = require("./ConfigValidator");
const infrastructure_1 = require("../infrastructure");
class ConfigManager {
    constructor(fs, validator) {
        this.config = null;
        this.fs = fs || new infrastructure_1.FileSystemHelper();
        this.validator = validator || new ConfigValidator_1.ConfigValidator();
    }
    async load(projectPath) {
        const configPath = path_1.default.join(projectPath, schema_1.CONFIG_FILE_NAME);
        try {
            const configData = await this.fs.readJson(configPath);
            const config = this.mergeWithDefaults(configData);
            const validation = this.validator.validate(config);
            if (!validation.valid) {
                throw new Error(`配置验证失败:\n${validation.errors.map((e) => `- ${e.field}: ${e.message}`).join('\n')}`);
            }
            this.config = config;
            return config;
        }
        catch (error) {
            if (error instanceof Error && error.message.includes('ENOENT')) {
                throw new Error(`配置文件不存在: ${configPath}`);
            }
            throw error;
        }
    }
    async save(projectPath, config) {
        const validation = this.validator.validate(config);
        if (!validation.valid) {
            throw new Error(`配置验证失败:\n${validation.errors.map((e) => `- ${e.field}: ${e.message}`).join('\n')}`);
        }
        const configPath = path_1.default.join(projectPath, schema_1.CONFIG_FILE_NAME);
        try {
            await this.fs.writeJson(configPath, config, { spaces: 2 });
            this.config = config;
        }
        catch (error) {
            throw new Error(`保存配置文件失败: ${error instanceof Error ? error.message : '未知错误'}`);
        }
    }
    async createDefault(projectPath, overrides) {
        const config = {
            ...schema_1.DefaultConfig,
            ...overrides,
        };
        await this.save(projectPath, config);
        return config;
    }
    getConfig() {
        return this.config;
    }
    async update(projectPath, updates) {
        const currentConfig = await this.load(projectPath);
        const newConfig = this.deepMerge(currentConfig, updates);
        await this.save(projectPath, newConfig);
        return newConfig;
    }
    validate(config) {
        return this.validator.validate(config);
    }
    async exists(projectPath) {
        const configPath = path_1.default.join(projectPath, schema_1.CONFIG_FILE_NAME);
        return await this.fs.exists(configPath);
    }
    getConfigPath(projectPath) {
        return path_1.default.join(projectPath, schema_1.CONFIG_FILE_NAME);
    }
    mergeWithDefaults(config) {
        return this.deepMerge(schema_1.DefaultConfig, config);
    }
    deepMerge(target, source) {
        const result = { ...target };
        for (const key in source) {
            if (source[key] instanceof Object && key in target) {
                result[key] = this.deepMerge(target[key], source[key]);
            }
            else {
                result[key] = source[key];
            }
        }
        return result;
    }
    export(config) {
        return JSON.stringify(config, null, 2);
    }
    import(jsonString) {
        try {
            const config = JSON.parse(jsonString);
            const validation = this.validator.validate(config);
            if (!validation.valid) {
                throw new Error(`配置验证失败:\n${validation.errors.map((e) => `- ${e.field}: ${e.message}`).join('\n')}`);
            }
            return config;
        }
        catch (error) {
            throw new Error(`导入配置失败: ${error instanceof Error ? error.message : '未知错误'}`);
        }
    }
}
exports.ConfigManager = ConfigManager;
//# sourceMappingURL=ConfigManager.js.map
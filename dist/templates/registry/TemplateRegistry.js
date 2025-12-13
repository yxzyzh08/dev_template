"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TemplateRegistry = void 0;
const WebFullstackTemplate_1 = require("./templates/WebFullstackTemplate");
const FrontendDemoTemplate_1 = require("./templates/FrontendDemoTemplate");
class TemplateRegistry {
    constructor() {
        this.templates = new Map();
        this.registerDefaultTemplates();
    }
    registerDefaultTemplates() {
        const webFullstack = new WebFullstackTemplate_1.WebFullstackTemplate();
        this.register(webFullstack.getTemplate());
        const frontendDemo = new FrontendDemoTemplate_1.FrontendDemoTemplate();
        this.register(frontendDemo.getTemplate());
    }
    register(template) {
        if (this.templates.has(template.id)) {
            throw new Error(`模板已存在: ${template.id}`);
        }
        this.templates.set(template.id, template);
    }
    getById(id) {
        return this.templates.get(id);
    }
    getByType(type) {
        for (const template of this.templates.values()) {
            if (template.type === type) {
                return template;
            }
        }
        return undefined;
    }
    getAll() {
        return Array.from(this.templates.values());
    }
    getAllIds() {
        return Array.from(this.templates.keys());
    }
    has(id) {
        return this.templates.has(id);
    }
    count() {
        return this.templates.size;
    }
    listTypes() {
        const types = new Set();
        for (const template of this.templates.values()) {
            types.add(template.type);
        }
        return Array.from(types);
    }
}
exports.TemplateRegistry = TemplateRegistry;
//# sourceMappingURL=TemplateRegistry.js.map
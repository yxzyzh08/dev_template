"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TemplateEngine = void 0;
const handlebars_1 = __importDefault(require("handlebars"));
class TemplateEngine {
    constructor() {
        this.handlebars = handlebars_1.default.create();
        this.registerHelpers();
    }
    registerHelpers() {
        this.handlebars.registerHelper('formatDate', (date) => {
            return date.toISOString().split('T')[0];
        });
        this.handlebars.registerHelper('currentYear', () => {
            return new Date().getFullYear();
        });
        this.handlebars.registerHelper('capitalize', (str) => {
            if (!str)
                return '';
            return str.charAt(0).toUpperCase() + str.slice(1);
        });
        this.handlebars.registerHelper('kebabCase', (str) => {
            if (!str)
                return '';
            return str
                .replace(/([a-z])([A-Z])/g, '$1-$2')
                .replace(/[\s_]+/g, '-')
                .toLowerCase();
        });
        this.handlebars.registerHelper('pascalCase', (str) => {
            if (!str)
                return '';
            return str
                .replace(/[-_\s]+(.)?/g, (_, c) => (c ? c.toUpperCase() : ''))
                .replace(/^(.)/, (c) => c.toUpperCase());
        });
        this.handlebars.registerHelper('camelCase', (str) => {
            if (!str)
                return '';
            return str
                .replace(/[-_\s]+(.)?/g, (_, c) => (c ? c.toUpperCase() : ''))
                .replace(/^(.)/, (c) => c.toLowerCase());
        });
        this.handlebars.registerHelper('eq', (a, b) => {
            return a === b;
        });
        this.handlebars.registerHelper('json', (obj, indent) => {
            return JSON.stringify(obj, null, indent || 2);
        });
    }
    render(templateString, variables) {
        try {
            const template = this.handlebars.compile(templateString);
            return template(variables);
        }
        catch (error) {
            throw new Error(`模板渲染失败: ${error instanceof Error ? error.message : '未知错误'}`);
        }
    }
    compile(templateString) {
        try {
            return this.handlebars.compile(templateString);
        }
        catch (error) {
            throw new Error(`模板编译失败: ${error instanceof Error ? error.message : '未知错误'}`);
        }
    }
    renderBatch(templates) {
        return templates.map(({ template, variables }) => this.render(template, variables));
    }
    registerHelper(name, fn) {
        this.handlebars.registerHelper(name, fn);
    }
    registerPartial(name, partial) {
        this.handlebars.registerPartial(name, partial);
    }
    unregisterHelper(name) {
        this.handlebars.unregisterHelper(name);
    }
    unregisterPartial(name) {
        this.handlebars.unregisterPartial(name);
    }
}
exports.TemplateEngine = TemplateEngine;
//# sourceMappingURL=TemplateEngine.js.map
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.promptProjectName = promptProjectName;
exports.promptProjectDescription = promptProjectDescription;
exports.promptAuthor = promptAuthor;
exports.promptConfirm = promptConfirm;
const prompts_1 = __importDefault(require("prompts"));
async function promptProjectName(defaultName) {
    const response = await (0, prompts_1.default)({
        type: 'text',
        name: 'projectName',
        message: '请输入项目名称',
        initial: defaultName || 'my-project',
        validate: (value) => {
            if (!value || value.trim() === '') {
                return '项目名称不能为空';
            }
            const pattern = /^[a-zA-Z0-9-_]+$/;
            if (!pattern.test(value)) {
                return '项目名称只能包含字母、数字、横线和下划线';
            }
            if (value.length > 100) {
                return '项目名称不能超过100个字符';
            }
            return true;
        },
    });
    if (!response.projectName) {
        return null;
    }
    return response.projectName.trim();
}
async function promptProjectDescription() {
    const response = await (0, prompts_1.default)({
        type: 'text',
        name: 'description',
        message: '请输入项目描述（可选）',
        initial: '',
    });
    return response.description ? response.description.trim() : null;
}
async function promptAuthor() {
    const response = await (0, prompts_1.default)({
        type: 'text',
        name: 'author',
        message: '请输入作者名称（可选）',
        initial: '',
    });
    return response.author ? response.author.trim() : null;
}
async function promptConfirm(message, initial = true) {
    const response = await (0, prompts_1.default)({
        type: 'confirm',
        name: 'confirmed',
        message,
        initial,
    });
    return response.confirmed ?? false;
}
//# sourceMappingURL=projectName.js.map
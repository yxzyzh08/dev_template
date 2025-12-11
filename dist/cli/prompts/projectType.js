"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.promptProjectType = promptProjectType;
exports.getProjectTypeDescription = getProjectTypeDescription;
exports.getProjectTypeName = getProjectTypeName;
const prompts_1 = __importDefault(require("prompts"));
const PROJECT_TYPE_CHOICES = [
    {
        type: 'web-fullstack',
        name: 'Web全栈应用',
        description: '前后端分离的Web应用，包含前端和后端代码',
    },
    {
        type: 'mobile-app',
        name: '移动应用',
        description: 'iOS/Android移动应用（React Native/Flutter）',
    },
    {
        type: 'backend-api',
        name: '后端API服务',
        description: 'RESTful API或GraphQL后端服务',
    },
    {
        type: 'cli-tool',
        name: '命令行工具',
        description: 'CLI工具或命令行应用',
    },
];
async function promptProjectType() {
    const response = await (0, prompts_1.default)({
        type: 'select',
        name: 'projectType',
        message: '请选择项目类型',
        choices: PROJECT_TYPE_CHOICES.map((choice) => ({
            title: choice.name,
            description: choice.description,
            value: choice.type,
        })),
        initial: 0,
    });
    if (!response.projectType) {
        return null;
    }
    return response.projectType;
}
function getProjectTypeDescription(type) {
    const choice = PROJECT_TYPE_CHOICES.find((c) => c.type === type);
    return choice?.description || '';
}
function getProjectTypeName(type) {
    const choice = PROJECT_TYPE_CHOICES.find((c) => c.type === type);
    return choice?.name || type;
}
//# sourceMappingURL=projectType.js.map
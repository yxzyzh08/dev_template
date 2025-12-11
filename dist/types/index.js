"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GitError = exports.AIAnalysisError = exports.ValidationError = exports.FileSystemError = exports.AIDevError = void 0;
class AIDevError extends Error {
    constructor(message, code, suggestion) {
        super(message);
        this.code = code;
        this.suggestion = suggestion;
        this.name = 'AIDevError';
    }
}
exports.AIDevError = AIDevError;
class FileSystemError extends AIDevError {
    constructor(message, suggestion) {
        super(message, 'FS_ERROR', suggestion);
        this.name = 'FileSystemError';
    }
}
exports.FileSystemError = FileSystemError;
class ValidationError extends AIDevError {
    constructor(message, errors) {
        super(message, 'VALIDATION_ERROR');
        this.errors = errors;
        this.name = 'ValidationError';
    }
}
exports.ValidationError = ValidationError;
class AIAnalysisError extends AIDevError {
    constructor(message) {
        super(message, 'AI_ERROR', '检查网络连接或使用--no-ai选项');
        this.name = 'AIAnalysisError';
    }
}
exports.AIAnalysisError = AIAnalysisError;
class GitError extends AIDevError {
    constructor(message, suggestion) {
        super(message, 'GIT_ERROR', suggestion);
        this.name = 'GitError';
    }
}
exports.GitError = GitError;
//# sourceMappingURL=index.js.map
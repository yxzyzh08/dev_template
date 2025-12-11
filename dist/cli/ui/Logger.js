"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = void 0;
const chalk_1 = __importDefault(require("chalk"));
class Logger {
    success(message) {
        console.log(chalk_1.default.green(`✅ ${message}`));
    }
    error(message) {
        const msg = message instanceof Error ? message.message : message;
        console.error(chalk_1.default.red(`❌ ${msg}`));
    }
    warn(message) {
        console.warn(chalk_1.default.yellow(`⚠️  ${message}`));
    }
    info(message) {
        console.log(chalk_1.default.blue(`ℹ️  ${message}`));
    }
    log(message) {
        console.log(message);
    }
    title(message) {
        console.log(chalk_1.default.bold.cyan(`\n${message}\n`));
    }
    divider() {
        console.log(chalk_1.default.gray('─'.repeat(50)));
    }
}
exports.Logger = Logger;
//# sourceMappingURL=Logger.js.map
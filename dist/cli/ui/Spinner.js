"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Spinner = void 0;
const ora_1 = __importDefault(require("ora"));
class Spinner {
    constructor() {
        this.spinner = null;
    }
    start(text) {
        this.spinner = (0, ora_1.default)(text).start();
    }
    succeed(text) {
        if (this.spinner) {
            this.spinner.succeed(text);
            this.spinner = null;
        }
    }
    fail(text) {
        if (this.spinner) {
            this.spinner.fail(text);
            this.spinner = null;
        }
    }
    warn(text) {
        if (this.spinner) {
            this.spinner.warn(text);
            this.spinner = null;
        }
    }
    info(text) {
        if (this.spinner) {
            this.spinner.info(text);
            this.spinner = null;
        }
    }
    stop() {
        if (this.spinner) {
            this.spinner.stop();
            this.spinner = null;
        }
    }
    updateText(text) {
        if (this.spinner) {
            this.spinner.text = text;
        }
    }
}
exports.Spinner = Spinner;
//# sourceMappingURL=Spinner.js.map
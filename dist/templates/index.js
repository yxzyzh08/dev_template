"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebFullstackTemplate = exports.FileGenerator = exports.TemplateApplicator = exports.TemplateEngine = exports.TemplateRegistry = void 0;
var TemplateRegistry_1 = require("./registry/TemplateRegistry");
Object.defineProperty(exports, "TemplateRegistry", { enumerable: true, get: function () { return TemplateRegistry_1.TemplateRegistry; } });
var TemplateEngine_1 = require("./engine/TemplateEngine");
Object.defineProperty(exports, "TemplateEngine", { enumerable: true, get: function () { return TemplateEngine_1.TemplateEngine; } });
var TemplateApplicator_1 = require("./engine/TemplateApplicator");
Object.defineProperty(exports, "TemplateApplicator", { enumerable: true, get: function () { return TemplateApplicator_1.TemplateApplicator; } });
var FileGenerator_1 = require("./engine/FileGenerator");
Object.defineProperty(exports, "FileGenerator", { enumerable: true, get: function () { return FileGenerator_1.FileGenerator; } });
var WebFullstackTemplate_1 = require("./registry/templates/WebFullstackTemplate");
Object.defineProperty(exports, "WebFullstackTemplate", { enumerable: true, get: function () { return WebFullstackTemplate_1.WebFullstackTemplate; } });
//# sourceMappingURL=index.js.map
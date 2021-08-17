"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDoc = exports.createSnippet = exports.adoTemplateHelper = void 0;
const docGeneration_1 = require("./docGeneration");
Object.defineProperty(exports, "createDoc", { enumerable: true, get: function () { return docGeneration_1.createDoc; } });
const snippets_1 = require("./snippets");
Object.defineProperty(exports, "createSnippet", { enumerable: true, get: function () { return snippets_1.createSnippet; } });
const adoTemplateHelper = () => {
    docGeneration_1.createDoc('templates', '');
};
exports.adoTemplateHelper = adoTemplateHelper;

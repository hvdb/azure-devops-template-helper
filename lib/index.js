"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDoc = exports.createSnippet = exports.adoTemplateHelper = void 0;
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const docGeneration_1 = require("./docGeneration");
Object.defineProperty(exports, "createDoc", { enumerable: true, get: function () { return docGeneration_1.createDoc; } });
const snippets_1 = require("./snippets");
Object.defineProperty(exports, "createSnippet", { enumerable: true, get: function () { return snippets_1.createSnippet; } });
const args_1 = require("./utilities/args");
const adoTemplateHelper = () => {
    // Retrieve commandline options
    const cmdOptions = args_1.retrieveOptionsFromCommandline();
    if (cmdOptions.createDoc) {
        const folders = fs.readdirSync(cmdOptions.templateLocation);
        folders.forEach(function (folder) {
            if (fs.existsSync(path.join(cmdOptions.templateLocation, folder, 'template.json'))) {
                docGeneration_1.createDoc(path.join(cmdOptions.templateLocation, folder), cmdOptions.markdownOutputLocation, cmdOptions.templateJsonFileName, cmdOptions.markdownFileName);
            }
        });
    }
    if (cmdOptions.createSnippets) {
        // Go through all etc etc
        console.log('Generating snippets');
    }
};
exports.adoTemplateHelper = adoTemplateHelper;

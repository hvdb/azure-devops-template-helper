"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDoc = exports.createSnippet = exports.adoTemplateHelper = void 0;
const docGeneration_1 = require("./docGeneration");
Object.defineProperty(exports, "createDoc", { enumerable: true, get: function () { return docGeneration_1.createDoc; } });
const snippets_1 = require("./snippets");
Object.defineProperty(exports, "createSnippet", { enumerable: true, get: function () { return snippets_1.createSnippet; } });
const args_1 = require("./utilities/args");
const adoTemplateHelper = () => {
    // Retrieve commandline options
    const cmdOptions = args_1.retrieveOptionsFromCommandline();
    if (cmdOptions.createDoc) {
        docGeneration_1.createDoc(cmdOptions.templateLocation, cmdOptions.markdownOutputLocation, cmdOptions.templateJsonFileName, cmdOptions.markdownFileName);
    }
    if (cmdOptions.createSnippets) {
        // Go through all etc etc
        console.log('Generating snippets');
    }
};
exports.adoTemplateHelper = adoTemplateHelper;

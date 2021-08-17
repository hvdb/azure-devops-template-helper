"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDoc = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const snippets_1 = require("./snippets");
const DOC_TEMPLATE = 'templates/doc_template.md';
const TEMPLATE_JSON_FILE = 'dist/templates/template.json';
function createInputMarkdown(inputs, element) {
    inputs += `### ${element['name']} \n`;
    inputs += `*${element['label']}*  \n`;
    for (let key of Object.keys(element)) {
        if (key !== 'name' && key !== 'label' && key !== 'required' && key !== 'helpMarkDown') {
            inputs += `\n${key} : \`${element[key]}\`  `;
        }
    }
    inputs += `${element['helpMarkDown'] ? '\n\n' + element['helpMarkDown'] : ''}\n\n`;
    return inputs;
}
function createDoc(templateJsonLocation, markdownOutputLocation, templateJsonFileName = 'template.json', markdownFileName) {
    console.log('Starting generation documentation file');
    let templateMd = fs_1.default.readFileSync(path_1.default.join(__dirname, DOC_TEMPLATE)).toString();
    let templateJson = JSON.parse(fs_1.default.readFileSync(path_1.default.join(__dirname, templateJsonLocation, templateJsonFileName)).toString());
    for (let key of Object.keys(templateJson)) {
        templateMd = templateMd.replace(`\${${key}}`, templateJson[key]);
    }
    //Create snippet from template
    const snippet = snippets_1.createSnippet(templateJson, 'sdk');
    const jsonSnipper = JSON.parse(snippet);
    // Put the snippet yml inside the md doc.
    for (let key of Object.keys(jsonSnipper)) {
        let snippetYml = '';
        for (let entry of Object.keys(jsonSnipper[key].body)) {
            snippetYml += '\n' + jsonSnipper[key].body[entry];
        }
        templateMd = templateMd.replace('${snippet}', snippetYml);
    }
    // handle inputs
    let inputsRequired = '';
    let inputsOptional = '';
    templateJson.inputs.forEach((element) => {
        if (element['required']) {
            inputsRequired = createInputMarkdown(inputsRequired, element);
        }
        else {
            inputsOptional = createInputMarkdown(inputsOptional, element);
        }
    });
    const inputs = '## Required inputs \n' + inputsRequired + '## Optional inputs \n' + inputsOptional;
    templateMd = templateMd.replace('${inputs_normalized}', inputs);
    const fileName = markdownFileName ? markdownFileName : templateJson.name + '.md';
    fs_1.default.writeFileSync(path_1.default.join(__dirname, markdownOutputLocation, fileName), templateMd);
    console.log('Done generation documentation file.');
}
exports.createDoc = createDoc;

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
function normalizeBooleanValue(elementValue) {
    if (elementValue && elementValue !== undefined) {
        return elementValue;
    }
    return false;
}
function normalizedUndefinedValues(elementValue) {
    if (elementValue && elementValue !== undefined) {
        return elementValue;
    }
    return '';
}
function createInputMarkdown(inputs, element) {
    inputs += '|';
    inputs += `${normalizedUndefinedValues(element['name'])} |`;
    inputs += `${normalizedUndefinedValues(element['type'])} |`;
    inputs += `${normalizedUndefinedValues(element['label'])} |`;
    inputs += `${normalizedUndefinedValues(element['defaultValue'])} |`;
    inputs += `${normalizeBooleanValue(element['required'])} |`;
    inputs += `${normalizedUndefinedValues(element['helpMarkDown'])} |`;
    inputs += '| \n';
    return inputs;
}
function createDoc(templateJsonLocation, markdownOutputLocation, templateJsonFileName = 'template.json', markdownFileName) {
    console.log('Starting generation documentation file');
    let templateMd = fs_1.default.readFileSync(path_1.default.join(process.cwd(), DOC_TEMPLATE)).toString();
    let templateJson = JSON.parse(fs_1.default.readFileSync(path_1.default.join(process.cwd(), templateJsonLocation, templateJsonFileName)).toString());
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
    let inputsTable = '';
    // Sort on required
    templateJson.inputs.sort((elem) => elem.required ? -1 : 1);
    templateJson.inputs.forEach((element) => {
        inputsTable = createInputMarkdown(inputsTable, element);
    });
    templateMd = templateMd.replace('${inputs_table}', inputsTable);
    const fileName = markdownFileName ? markdownFileName : templateJson.name + '.md';
    const documentationDirectory = path_1.default.join(process.cwd(), markdownOutputLocation);
    if (!fs_1.default.existsSync(documentationDirectory)) {
        fs_1.default.mkdirSync(documentationDirectory, { recursive: true });
    }
    fs_1.default.writeFileSync(path_1.default.join(documentationDirectory, fileName), templateMd);
    console.log('Done generation documentation file.');
}
exports.createDoc = createDoc;

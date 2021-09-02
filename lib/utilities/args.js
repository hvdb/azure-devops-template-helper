"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.retrieveOptionsFromCommandline = void 0;
const commander_1 = require("commander");
const retrieveOptionsFromCommandline = () => {
    const program = new commander_1.Command();
    program
        .description('Generate Azure DevOps templates helper')
        .option('-tl, --templateLocation [path]', 'template location', 'templates')
        .option('-d, --createDoc', 'Create documentation', true)
        .option('-s, --createSnippets', 'Create snippets', true)
        .option('-dl, --markdownOutputLocation [path]', 'markdownOutputLocation', 'docs')
        .option('-tf, --templateJsonFileName [name]', 'templateJsonFileName', 'template.json')
        .option('-mf, --markdownFileName [name]', 'markdownFileName');
    program.parse(process.argv);
    const options = program.opts();
    return options;
};
exports.retrieveOptionsFromCommandline = retrieveOptionsFromCommandline;

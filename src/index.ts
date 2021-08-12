import fs from 'fs';
import path from 'path';
import { createSnippet } from './snippets';

const DOC_TEMPLATE = 'templates/doc_template.md';
const TEMPLATE_JSON_FILE = 'dist/templates/template.json';

function createInputMarkdown(inputs: any, element: any): string {
  inputs += `### ${element['name']} \n`;
  inputs += `*${element['label']}*  \n`
  for (let key of Object.keys(element)) {
    if (key !== 'name' && key !== 'label' && key !== 'required' && key !== 'helpMarkDown') {
      inputs += `\n${key} : \`${element[key]}\`  `
    }
  }
  inputs += `${element['helpMarkDown'] ? '\n\n' + element['helpMarkDown'] : ''}\n\n`;
  return inputs;
}

function createDoc(templateJsonLocation: string, markdownOutputLocation: string, templateJsonFileName: string = 'template.json', markdownFileName?: string) {
  let templateMd = fs.readFileSync(path.join(__dirname, DOC_TEMPLATE)).toString();
  let templateJson = JSON.parse(fs.readFileSync(path.join(__dirname, templateJsonLocation, templateJsonFileName)).toString());

  for (let key of Object.keys(templateJson)) {
    templateMd = templateMd.replace(`\${${key}}`, templateJson[key]);
  }

  //Create snippet from template
  const snippet: string = createSnippet(templateJson, 'sdk');
  const jsonSnipper = JSON.parse(snippet);

  // Put the snippet yml inside the md doc.
  for (let key of Object.keys(jsonSnipper)) {
    let snippetYml = '';
    for (let entry of Object.keys(jsonSnipper[key].body)) {
      snippetYml += '\n' + jsonSnipper[key].body[entry]
    }
    templateMd = templateMd.replace('${snippet}', snippetYml);
  }

  // handle inputs
  let inputsRequired = '';
  let inputsOptional = '';
  templateJson.inputs.forEach((element: any) => {
    if (element['required']) {
      inputsRequired = createInputMarkdown(inputsRequired, element);
    } else {
      inputsOptional = createInputMarkdown(inputsOptional, element);
    }
  });

  const inputs = '## Required inputs \n' + inputsRequired + '## Optional inputs \n' + inputsOptional;
  templateMd = templateMd.replace('${inputs_normalized}', inputs);

  const fileName = markdownFileName ? markdownFileName : templateJson.name + '.md';

  console.log('ALMOST DONE')
  fs.writeFileSync(path.join(__dirname, markdownOutputLocation, fileName), templateMd);

}

const adoTemplateHelper = (): void => {
  createDoc('templates', '');

}

export default adoTemplateHelper
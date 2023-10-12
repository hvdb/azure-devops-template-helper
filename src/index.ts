import * as fs from 'fs';
import * as path from 'path';
import { createDoc } from './docGeneration';
import { createSnippet } from './snippets';
import { CommandLineOptions, retrieveOptionsFromCommandline } from './utilities/args';

const adoTemplateHelper = (): void => {
  // Retrieve commandline options
  const cmdOptions: CommandLineOptions = retrieveOptionsFromCommandline();

  if (cmdOptions.createDoc) {
    createDocs(fs.readdirSync(cmdOptions.templateLocation), cmdOptions, cmdOptions.templateLocation)
  }

  if (cmdOptions.createSnippets) {
    // Go through all etc etc
    console.log('Generating snippets');
  }
}

const createDocs = (folders: string[], cmdOptions: CommandLineOptions, fullPath: string) => {
  folders.forEach(function (folder) {
    // So there can be another folder in here
    if (fs.statSync(path.join(fullPath, folder)).isDirectory()) {
      createDocs(fs.readdirSync(path.join(fullPath, folder)), cmdOptions, path.join(fullPath, folder));
    }

    if (fs.existsSync(path.join(fullPath, folder, 'template.json'))) {
      createDoc(path.join(fullPath, folder), cmdOptions.markdownOutputLocation, cmdOptions.templateJsonFileName, cmdOptions.vsCodePrefix, cmdOptions.markdownFileName, cmdOptions.renderWithoutPrefixes);
    }
  });
}


export {
  adoTemplateHelper,
  createSnippet,
  createDoc
}
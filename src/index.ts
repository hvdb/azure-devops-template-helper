import * as fs from 'fs';
import * as path from 'path';
import { createDoc } from './docGeneration';
import { createSnippet } from './snippets';
import { CommandLineOptions, retrieveOptionsFromCommandline } from './utilities/args';

const adoTemplateHelper = (): void => {
  // Retrieve commandline options
  const cmdOptions: CommandLineOptions = retrieveOptionsFromCommandline();

  if (cmdOptions.createDoc) {
    const folders: string[] = fs.readdirSync(cmdOptions.templateLocation);
    folders.forEach(function (folder) {
      if (fs.existsSync(path.join(cmdOptions.templateLocation, folder, 'template.json'))) {
        createDoc(path.join(cmdOptions.templateLocation, folder), cmdOptions.markdownOutputLocation, cmdOptions.templateJsonFileName, cmdOptions.markdownFileName);
      }
    });
  }

  if (cmdOptions.createSnippets) {
    // Go through all etc etc
    console.log('Generating snippets');
  }
}

export {
  adoTemplateHelper,
  createSnippet,
  createDoc
}
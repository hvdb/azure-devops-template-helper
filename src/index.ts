import { createDoc } from './docGeneration';
import { createSnippet } from './snippets';
import { CommandLineOptions, retrieveOptionsFromCommandline } from './utilities/args';

const adoTemplateHelper = (): void => {
  // Retrieve commandline options
  const cmdOptions: CommandLineOptions = retrieveOptionsFromCommandline();
  
  if (cmdOptions.createDoc) {
    createDoc(cmdOptions.templateLocation, cmdOptions.markdownOutputLocation, cmdOptions.templateJsonFileName, cmdOptions.markdownFileName);
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
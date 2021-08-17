import { createDoc } from './docGeneration';
import { createSnippet } from './snippets';

const adoTemplateHelper = (): void => {
  createDoc('templates', '');
}

export {
  adoTemplateHelper,
  createSnippet,
  createDoc
}
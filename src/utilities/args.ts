import { Command } from 'commander';

interface CommandLineOptions {
    templateLocation: string
    createDoc: boolean 
    createSnippets: boolean
    markdownOutputLocation: string
    templateJsonFileName: string
    markdownFileName?: string
}

const retrieveOptionsFromCommandline = (): CommandLineOptions => {

    const program = new Command();
    program
    .description('Generate Azure DevOps templates helper')
    .option('-tl, --templateLocation [path]', 'template location', 'templates')
    .option('-d, --createDoc', 'Create documentation', true)
    .option('-s, --createSnippets', 'Create snippets', true)
    .option('-s, --markdownOutputLocation [path]', 'markdownOutputLocation', 'docs')
    .option('-tf, --templateJsonFileName [name]', 'templateJsonFileName', 'template.json')
    .option('-mf, --markdownFileName [name]', 'markdownFileName');

    program.parse(process.argv);
    const options: CommandLineOptions = program.opts();
    
    return options;
}
  
export {
    CommandLineOptions,
    retrieveOptionsFromCommandline,
}
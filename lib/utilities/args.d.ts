interface CommandLineOptions {
    templateLocation: string;
    createDoc: boolean;
    createSnippets: boolean;
    markdownOutputLocation: string;
    templateJsonFileName: string;
    markdownFileName?: string;
}
declare const retrieveOptionsFromCommandline: () => CommandLineOptions;
export { CommandLineOptions, retrieveOptionsFromCommandline, };

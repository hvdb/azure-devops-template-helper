interface CommandLineOptions {
    templateLocation: string;
    createDoc: boolean;
    createSnippets: boolean;
    markdownOutputLocation: string;
    templateJsonFileName: string;
    vsCodePrefix?: string;
    markdownFileName?: string;
    renderWithoutPrefixes: boolean;
}
declare const retrieveOptionsFromCommandline: () => CommandLineOptions;
export { CommandLineOptions, retrieveOptionsFromCommandline, };

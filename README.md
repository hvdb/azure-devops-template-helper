# Azure DevOps Template Helper

This npm module can be used help with support for `Templates` used in Azure Devops.  
For `Tasks` there is a predefined json definition that can be used for sharing and act as a 'contract', currently there is none for templates.  

But as templates can be quite big and most likely consist of multiple tasks it is becoming harder to share these templates between teams.  
It is not always clear from the template (if you can get to the source) what is needed and how it works. (and why it is even there)  

So in order to make it easier to share and explain, I created a `Template` contract, this is based on the [`Task` contract](https://raw.githubusercontent.com/Microsoft/azure-pipelines-task-lib/master/tasks.schema.json)  

For templates i have created the following [`Template` contract](https://raw.githubusercontent.com/hvdb/ado-template-helper/master/template.schema.json)  


## usage

```javascript
node lib/bin.js -h
Usage: bin [options]

Generate Azure DevOps templates helper

Options:
  -tl, --templateLocation [path]        template location (default: "templates")
  -d, --createDoc                       Create documentation (default: true)
  -s, --createSnippets                  Create snippets (default: true)
  -dl, --markdownOutputLocation [path]  markdownOutputLocation (default: "docs")
  -tf, --templateJsonFileName [name]    templateJsonFileName (default: "template.json")
  -mf, --markdownFileName [name]        markdownFileName
  -vsc, --vscodePrefix                  VSCode snippet prefix
  -rwp, --renderWithoutPrefixes         Render snippets without the prefixes needed for vscode plugin
  -h, --help                            display help for command
```



## What does the plugin do?

### Generation of 'snippets'

These snippets can be used in an VSCode extension to give support to people that are using your templates.  
(Looking for ways to create a 'flexible' snippet extension, more to come.)  

### Generation of template documentation

It can generate markdown spec files that describes the template, how to use and what it does etc.  


See [WIKI](https://github.com/hvdb/ado-template-helper/wiki) for example of [template.json](https://github.com/hvdb/ado-template-helper/wiki/Example-template.json) and [generated documentation](https://github.com/hvdb/ado-template-helper/wiki/Documentation-example)

# Azure DevOps Template Helper

This npm module can be used to generate snippets for `Templates` used in Azure Devops.  
For `Tasks` there is a predefined json definition that can be used for sharing and act as a 'contract', currently there is none for templates.  

But as templates can be quite big and most likely consist of multiple tasks, while those templates are most of the time used within a team and people tend to have knowledge on them.  
This isn't always the case and then it will become harder to make share it in a way that other can use it.  
So in order to make this happen I created a `Template` contract, this is based on the [`Task` contract](https://raw.githubusercontent.com/Microsoft/azure-pipelines-task-lib/master/tasks.schema.json)  

For templates i have created the following [`Template` contract](https://raw.githubusercontent.com/hvdb/ado-template-helper/master/template.schema.json)  


## usage

```javascript
node lib/bin.js -h
Usage: bin [options]

Generate Azure DevOps templates helper

Options:
  -tl, --templateLocation [path]       template location (default: "templates")
  -d, --createDoc                      Create documentation (default: true)
  -s, --createSnippets                 Create snippets (default: true)
  -s, --markdownOutputLocation [path]  markdownOutputLocation (default: "docs")
  -tf, --templateJsonFileName [name]   templateJsonFileName (default: "template.json")
  -mf, --markdownFileName [name]       markdownFileName
  -h, --help                           display help for command
```


## Example template json

```json
{
  "id": "create-project/stages/default.yml@templates",
  "name": "createProject",
  "type": "stage",
  "friendlyName": "Create a project",
  "description": "Here comes a lot of text that would help to know what this template does",
  "author": "hvdb",
  "helpUrl": "https://www.github.com/hvdb/ado-template-helper",
  "helpMarkdown": "You can use this by adding the following to your yml file:   ```yaml - template: create-project/stages/default.yml@templates```",
  "category": "Utility",
  "visibility": [
    "Build"
  ],
  "demands": [],
  "version": "1.0.0",
  "releaseNotes": "Added more information on how to use",
  "inputs": [
    {
      "name": "condition",
      "type": "boolean",
      "label": "The condition to execute this stage or not",
      "required": false,
      "helpMarkDown": "See: [conditions](https://docs.microsoft.com/en-us/azure/devops/pipelines/process/conditions)"
    },
    {
      "name": "dependsOn",
      "type": "object",
      "label": "The stage dependency",
      "required": false
    },
    {
      "name": "azureFeedId",
      "type": "string",
      "defaultValue": "3219392309",
      "label": "Azure feedID",
      "required": true,
      "helpMarkDown": "Can be retrieve via x"
    },
    {
      "name": "workingDirectory",
      "type": "string",
      "defaultValue": ".",
      "label": "Working directory",
      "required": false
    }
  ]
}
```

How this template is used in an Azure DevOps pipeline.  
This should be familiar if you used templates before, if not please have a look at the documentation:   

```yaml
resources:
  repositories:
    - repository: templates
      type: git
      name: Project/templates
      ref: refs/heads/master

  - template: create-project/stages/default.yml@templates
    parameters:
      condition: succeeded()
      azureFeedId: '1234'
```

## What does the plugin do?

### Generation of 'snippets'

These snippets can be used in an VSCode extension to give support to people that are using your templates.  
(Looking for ways to create a 'flexible' snippet extension, more to come.)  

### Example of generate documentation:

As documentaion of templates is hard and normally it is done somewhere else, the documentation is most of te time not uptodate.  
By using the `template` definition for creating the documentation we prevent this.  

# createProject
*Create a project*

Here comes a lot of text that would help to know what this template does

## What does it do?

You can use this by adding the following to your yml file:   ```yaml - template: create-project/stages/default.yml@templates```

## Required inputs 
### azureFeedId 
*Azure feedID*  

type : `string`  
defaultValue : `3219392309`  

Can be retrieve via x

## Optional inputs 
### condition 
*The condition to execute this stage or not*  

type : `boolean`  

See: [conditions](https://docs.microsoft.com/en-us/azure/devops/pipelines/process/conditions)

### dependsOn 
*The stage dependency*  

type : `object`  

### workingDirectory 
*Working directory*  

type : `string`  
defaultValue : `.`  



## Usage example

```yml

- template: create-project/stages/default.yml@templates
  parameters:
    #condition:  # Optional  # See: [conditions](https://docs.microsoft.com/en-us/azure/devops/pipelines/process/conditions)
    #dependsOn:  # Optional 
    azureFeedId: ${1:3219392309}  # Required  # Can be retrieve via x
    #workingDirectory:  # Optional 
$2
```

## Meta data

Author: hvdb  
Type: stage
Support: https://www.github.com/hvdb/ado-template-helper
Id: create-project/stages/default.yml@templates

### Release notes

Added more information on how to use

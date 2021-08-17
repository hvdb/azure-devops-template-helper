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

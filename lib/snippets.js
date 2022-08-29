"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSnippet = void 0;
/**
 *
 *
 * @param jsonData Template json data
 * @returns the snippet
 */
function createSnippet(jsonTemplateData, prefix, renderWithoutPrefixes) {
    if (jsonTemplateData.inputs) {
        let snippet = `{\n`;
        snippet += `"${jsonTemplateData.friendlyName}": {\n`;
        snippet += `"prefix": "${prefix}${jsonTemplateData.name} - ${jsonTemplateData.type}",\n`;
        snippet += `"body": [\n`;
        snippet += `"- template: ${jsonTemplateData.id}",\n`;
        snippet += `"  parameters:",\n`;
        let requiredIndex = 1;
        //Sort on required
        jsonTemplateData.inputs.sort((elem) => elem.required ? -1 : 1);
        jsonTemplateData.inputs.forEach((input) => {
            snippet += createLine(input, requiredIndex, renderWithoutPrefixes);
            if (input.required) {
                requiredIndex++;
            }
        });
        if (renderWithoutPrefixes) {
            snippet += `""\n`;
        }
        else {
            snippet += `"$${requiredIndex}"\n`;
        }
        snippet += `],\n`;
        let description = escapeAllSpecialCaracters(jsonTemplateData.description);
        snippet += `"description": "${description != '' ? description : ''}"\n`;
        snippet += "}\n";
        snippet += "}\n";
        return snippet;
    }
    return '';
}
exports.createSnippet = createSnippet;
function createLine(input, index, renderWithoutPrefixes) {
    let line = `"    ${input.required ? '' : '#'}${input.name}: `;
    if (input.defaultValue && input.required) {
        let valueStart = `$\{${index}:`;
        let valueEnd = '\}';
        if (renderWithoutPrefixes) {
            valueStart = '';
            valueEnd = '';
        }
        line += `${valueStart}${escapeAllSpecialCaracters(input.defaultValue)}${valueEnd} ${displayOptions(input)} # Required `;
    }
    else {
        let valueStart = `$${index}`;
        if (renderWithoutPrefixes) {
            valueStart = '';
        }
        line += input.required ? `${valueStart} ${displayOptions(input)} # Required ` : `${displayOptions(input)} # Optional `;
    }
    line += input.helpMarkDown ? ` # ${escapeAllSpecialCaracters(input.helpMarkDown)}",\n` : `",\n`;
    return line;
}
function displayOptions(input) {
    if (input.options) {
        let options = '# Options: ';
        for (let keys = Object.keys(input.options), i = 0, end = keys.length; i < end; i++) {
            options += `'${keys[i]}'`;
            if (i < keys.length - 1) {
                options += `, `;
            }
        }
        return options;
    }
    return '';
}
function escapeAllSpecialCaracters(value) {
    return value ? value.toString().replace(/\n/g, '').replace(/\\/g, '/\\\/').replace(/"/g, '\\"') : '';
}

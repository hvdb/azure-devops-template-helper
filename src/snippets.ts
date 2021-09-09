/**
 * 
 * 
 * @param jsonData Template json data
 * @returns the snippet
 */
export function createSnippet(jsonTemplateData: any, prefix: string): string {
    if (jsonTemplateData.inputs) {
        let snippet = `{\n`;
        snippet += `"${jsonTemplateData.friendlyName}": {\n`;
        snippet += `"prefix": "${prefix}${jsonTemplateData.name} - ${jsonTemplateData.type}",\n`;
        snippet += `"body": [\n`;
        snippet += `"- template: ${jsonTemplateData.id}",\n`;
        snippet += `"  parameters:",\n`;

        let requiredIndex = 1;
        //Sort on required
        jsonTemplateData.inputs.sort((elem: { required: any; }) => elem.required ? -1 : 1);
        jsonTemplateData.inputs.forEach((input: any) => {
            snippet += createLine(input, requiredIndex);
            if (input.required) {
                requiredIndex++;
            }
        });

        snippet += `"$${requiredIndex}"\n`;
        snippet += `],\n`;
        let description = escapeAllSpecialCaracters(jsonTemplateData.description);
        snippet += `"description": "${description != '' ? description : ''}"\n`;
        snippet += "}\n";
        snippet += "}\n";

        return snippet;
    }
    return '';
}

function createLine(input: any, index: number): string {
    let line = `"    ${input.required ? '' : '#'}${input.name}: `;

    if (input.defaultValue && input.required) {
        line += `$\{${index}:${escapeAllSpecialCaracters(input.defaultValue)}\} ${displayOptions(input)} # Required `;
    } else {
        line += input.required ? `$${index} ${displayOptions(input)} # Required ` : `${displayOptions(input)} # Optional `;
    }

    line += input.helpMarkDown ? ` # ${escapeAllSpecialCaracters(input.helpMarkDown)}",\n` : `",\n`;
    return line;
}

function displayOptions(input: any): string {
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

function escapeAllSpecialCaracters(value: string): string {
    return value ? value.toString().replace(/\n/g, '').replace(/\\/g, '/\\\/').replace(/"/g, '\\"') : '';
}


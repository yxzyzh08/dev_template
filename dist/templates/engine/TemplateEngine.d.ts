import Handlebars from 'handlebars';
import { TemplateVariables } from '../../types';
export declare class TemplateEngine {
    private handlebars;
    constructor();
    private registerHelpers;
    render(templateString: string, variables: TemplateVariables): string;
    compile(templateString: string): HandlebarsTemplateDelegate;
    renderBatch(templates: Array<{
        template: string;
        variables: TemplateVariables;
    }>): string[];
    registerHelper(name: string, fn: Handlebars.HelperDelegate): void;
    registerPartial(name: string, partial: string): void;
    unregisterHelper(name: string): void;
    unregisterPartial(name: string): void;
}
//# sourceMappingURL=TemplateEngine.d.ts.map
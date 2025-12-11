export interface ValidateCommandOptions {
    phase?: 'requirements' | 'architecture' | 'implementation' | 'testing';
    strict?: boolean;
    fix?: boolean;
}
export declare function executeValidateCommand(options: ValidateCommandOptions): Promise<void>;
//# sourceMappingURL=validate.d.ts.map
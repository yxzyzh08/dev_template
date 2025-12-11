import { ProjectType } from '../../types';
export interface InitCommandOptions {
    type?: ProjectType;
    git?: boolean;
    install?: boolean;
    nonInteractive?: boolean;
    force?: boolean;
}
export declare function executeInitCommand(projectName: string | undefined, options: InitCommandOptions): Promise<void>;
//# sourceMappingURL=init.d.ts.map
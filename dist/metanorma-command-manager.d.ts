import type { IMetanormaSettings } from './metanorma-settings';
import { Version } from './version-helper';
export declare class MetanormaCommandManager {
    private readonly settings;
    constructor(settings: IMetanormaSettings);
    getVersion(): Promise<Version>;
    getSiteGenerateCommand(version: Version, outputDir: string, configFile: string): Promise<string[]>;
    execute(version: Version): Promise<void>;
    private getCommand;
    private createTimestampListeners;
}

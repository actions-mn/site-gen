import type { IMetanormaSettings } from './metanorma-settings';
export declare function getInputs(): Promise<IMetanormaSettings>;
export declare function validatePath(input: string, paramName: string): string;
export declare function validateFilename(filename: string, paramName: string): void;

export interface IMetanormaSettings {
    sourcePath: string;
    outputDir: string;
    configFile: string;
    agreeToTerms: boolean;
    installFonts: boolean;
    continueWithoutFonts: boolean;
    strict: boolean;
    progress: boolean;
    useBundler: boolean;
    timestamps: boolean;
    metanormaVersion?: string;
    workspacePath: string;
}

export interface IMetanormaSettings {
  // Core paths
  sourcePath: string;
  outputDir: string;
  configFile: string;

  // Behavior flags
  agreeToTerms: boolean;
  installFonts: boolean;
  continueWithoutFonts: boolean;
  strict: boolean;
  progress: boolean;
  useBundler: boolean;
  timestamps: boolean;

  // Computed values
  metanormaVersion?: string;
  workspacePath: string;
}

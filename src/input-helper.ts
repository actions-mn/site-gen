import { getInput } from '@actions/core';
import { resolve } from 'path';
import type { IMetanormaSettings } from './metanorma-settings.js';

export async function getInputs(): Promise<IMetanormaSettings> {
  const result: IMetanormaSettings = {
    // Core paths
    sourcePath: getSourcePath(),
    outputDir: getOutputDir(),
    configFile: getConfigFile(),

    // Behavior flags
    agreeToTerms: getBooleanInput('agree-to-terms'),
    installFonts: getBooleanInput('install-fonts'),
    continueWithoutFonts: getBooleanInput('continue-without-fonts'),
    strict: getBooleanInput('strict'),
    progress: getBooleanInput('progress'),
    useBundler: getBooleanInput('use-bundler'),
    timestamps: getBooleanInput('timestamps'),

    // Computed
    workspacePath: getWorkspacePath()
  };

  return result;
}

function getSourcePath(): string {
  const input = getInput('source-path') || '.';
  return validatePath(input, 'source-path');
}

function getOutputDir(): string {
  const input = getInput('output-dir') || '_site';
  return validatePath(input, 'output-dir');
}

function getConfigFile(): string {
  const input = getInput('config-file') || 'metanorma.yml';
  validateFilename(input, 'config-file');
  return input;
}

function getBooleanInput(name: string): boolean {
  const value = getInput(name) || 'false';
  if (value !== 'true' && value !== 'false') {
    throw new Error(`Invalid boolean value for ${name}: ${value}`);
  }
  return value === 'true';
}

function getWorkspacePath(): string {
  const workspacePath = process.env['GITHUB_WORKSPACE'];
  if (!workspacePath) {
    throw new Error('GITHUB_WORKSPACE not defined');
  }
  return resolve(workspacePath);
}

export function validatePath(input: string, paramName: string): string {
  // Check for path traversal
  if (input.includes('..')) {
    throw new Error(`Path traversal detected in ${paramName}: ${input}`);
  }

  // Check for absolute paths outside workspace
  if (input.startsWith('/') && !input.startsWith('/github/workspace')) {
    throw new Error(`Absolute path not allowed in ${paramName}: ${input}`);
  }

  // Check path length
  if (input.length > 255) {
    throw new Error(`Path too long in ${paramName} (max 255 characters)`);
  }

  return input;
}

export function validateFilename(filename: string, paramName: string): void {
  // Check for invalid characters
  if (/[^a-zA-Z0-9._-]/.test(filename)) {
    throw new Error(`Invalid characters in ${paramName}: ${filename}`);
  }

  // Check filename length
  if (filename.length > 100) {
    throw new Error(`Filename too long in ${paramName} (max 100 characters)`);
  }
}

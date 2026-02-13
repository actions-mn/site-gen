import * as exec from '@actions/exec';
import * as core from '@actions/core';
import type { IMetanormaSettings } from './metanorma-settings';
import { Version, MINIMUM_MODERN_VERSION } from './version-helper';

export class MetanormaCommandManager {
  constructor(private readonly settings: IMetanormaSettings) {}

  async getVersion(): Promise<Version> {
    const cmd = this.getCommand();
    let output = '';

    const versionCmd = this.settings.useBundler
      ? ['bundle', 'exec', cmd, '--version']
      : [cmd, '--version'];

    await exec.exec(versionCmd[0], versionCmd.slice(1), {
      listeners: {
        stdout: (data: Buffer) => {
          output += data.toString();
        },
        stderr: (data: Buffer) => {
          output += data.toString();
        }
      }
    });

    // Search for version in all output (stdout + stderr)
    // The version line appears like: "Metanorma 2.2.9"
    const lines = output.split('\n');
    for (const line of lines) {
      const match = line.match(/Metanorma\s+(\d+\.\d+\.\d+)/);
      if (match) {
        return Version.parse(match[1]);
      }
    }

    throw new Error(
      `Failed to parse metanorma version from output:\n${output}`
    );
  }

  async getSiteGenerateCommand(
    version: Version,
    outputDir: string,
    configFile: string
  ): Promise<string[]> {
    const cmd = this.getCommand();
    const args: string[] = [
      'site',
      'generate',
      '.',
      '-o',
      outputDir,
      '-c',
      configFile
    ];

    // Add version-aware flags
    if (this.settings.strict) {
      args.push('--strict');
    }

    if (!this.settings.progress) {
      args.push('--no-progress');
    }

    if (this.settings.agreeToTerms) {
      args.push('--agree-to-terms');
    }

    // Font installation flags (version-dependent)
    if (this.settings.installFonts) {
      if (version.lt(MINIMUM_MODERN_VERSION)) {
        args.push('--no-no-install-fonts');
      } else {
        args.push('--install-fonts');
      }
    } else {
      args.push('--no-install-fonts');
    }

    if (this.settings.continueWithoutFonts) {
      args.push('--continue-without-fonts');
    } else {
      args.push('--no-continue-without-fonts');
    }

    return [cmd, ...args];
  }

  async execute(version: Version): Promise<void> {
    const cmdArray = await this.getSiteGenerateCommand(
      version,
      this.settings.outputDir,
      this.settings.configFile
    );

    core.info(`Executing: ${cmdArray.join(' ')}`);

    const workDir = this.settings.sourcePath;

    // Prepare listeners with timestamp support
    const listeners = this.settings.timestamps
      ? this.createTimestampListeners()
      : {};

    if (this.settings.useBundler) {
      await exec.exec('bundle', ['exec', ...cmdArray], {
        cwd: workDir,
        listeners
      });
    } else {
      await exec.exec(cmdArray[0], cmdArray.slice(1), {
        cwd: workDir,
        listeners
      });
    }

    // Export command and flags to GITHUB_ENV for debugging (like v1)
    const cmd = this.getCommand();
    core.exportVariable('METANORMA_CMD', cmd);
    const flags = cmdArray.slice(1).join(' ');
    core.exportVariable('METANORMA_FLAGS', flags);
  }

  private getCommand(): string {
    const isWindows = process.platform === 'win32';
    return isWindows ? 'metanorma.exe' : 'metanorma';
  }

  private createTimestampListeners(): exec.ExecListeners {
    const addTimestamp = (data: Buffer): string => {
      const lines = data.toString().split('\n');
      return lines
        .filter((line: string) => line !== '')
        .map(
          (line: string) =>
            `${new Date().toISOString().replace('T', ' ').substring(0, 19)} - ${line}`
        )
        .join('\n');
    };

    return {
      stdout: (data: Buffer) => {
        process.stdout.write(addTimestamp(data));
      },
      stderr: (data: Buffer) => {
        process.stderr.write(addTimestamp(data));
      }
    };
  }
}

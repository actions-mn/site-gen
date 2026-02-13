import * as core from '@actions/core';
import * as path from 'path';
import * as fsHelper from './fs-helper';
import type { IMetanormaSettings } from './metanorma-settings';
import { MetanormaCommandManager } from './metanorma-command-manager';

export async function getSource(settings: IMetanormaSettings): Promise<void> {
  // Validate paths
  const absoluteSourcePath = path.resolve(
    settings.workspacePath,
    settings.sourcePath
  );
  if (!fsHelper.directoryExistsSync(absoluteSourcePath, true)) {
    throw new Error(`Source path does not exist: ${absoluteSourcePath}`);
  }

  // Create command manager
  const commandManager = new MetanormaCommandManager(settings);

  // Get version
  const version = await commandManager.getVersion();
  settings.metanormaVersion = version.toString();
  core.info(`Metanorma version: ${version}`);

  // Execute
  await commandManager.execute(version);

  // Set outputs
  core.setOutput('metanorma-version', version.toString());
  core.info('Metanorma site generation completed successfully');
}

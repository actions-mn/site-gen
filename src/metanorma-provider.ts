import { info, setOutput } from '@actions/core';
import { resolve } from 'path';
import { directoryExistsSync } from './fs-helper.js';
import type { IMetanormaSettings } from './metanorma-settings.js';
import { MetanormaCommandManager } from './metanorma-command-manager.js';

export async function getSource(settings: IMetanormaSettings): Promise<void> {
  // Validate paths
  const absoluteSourcePath = resolve(
    settings.workspacePath,
    settings.sourcePath
  );
  if (!directoryExistsSync(absoluteSourcePath, true)) {
    throw new Error(`Source path does not exist: ${absoluteSourcePath}`);
  }

  // Create command manager
  const commandManager = new MetanormaCommandManager(settings);

  // Get version
  const version = await commandManager.getVersion();
  settings.metanormaVersion = version.toString();
  info(`Metanorma version: ${version}`);

  // Execute
  await commandManager.execute(version);

  // Set outputs
  setOutput('metanorma-version', version.toString());
  info('Metanorma site generation completed successfully');
}

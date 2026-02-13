import * as core from '@actions/core';
import * as inputHelper from './input-helper';
import * as metanormaProvider from './metanorma-provider';

async function run(): Promise<void> {
  try {
    // Get inputs
    const settings = await inputHelper.getInputs();

    // Execute metanorma
    await metanormaProvider.getSource(settings);

    // Set outputs
    core.setOutput('site-path', settings.sourcePath);
    core.setOutput('config-used', settings.configFile);
  } catch (error) {
    core.setFailed(
      `Metanorma site generation failed: ${(error as any)?.message ?? error}`
    );
  }
}

// Run the main function
run();

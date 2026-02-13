import { setFailed, setOutput } from '@actions/core';
import { getInputs } from './input-helper.js';
import { getSource } from './metanorma-provider.js';

async function run(): Promise<void> {
  try {
    // Get inputs
    const settings = await getInputs();

    // Execute metanorma
    await getSource(settings);

    // Set outputs
    setOutput('site-path', settings.sourcePath);
    setOutput('config-used', settings.configFile);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    setFailed(`Metanorma site generation failed: ${message}`);
  }
}

// Run the main function
run();

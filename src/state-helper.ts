import * as core from '@actions/core';

export const IsPost = !!core.getState('isPost');

// Publish a variable so that when the POST action runs, it can determine it should run the cleanup logic.
if (!IsPost) {
  core.saveState('isPost', 'true');
}

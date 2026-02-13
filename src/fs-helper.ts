import * as fs from 'fs';

export function directoryExistsSync(
  path: string,
  required: boolean = false
): boolean {
  if (!fs.existsSync(path)) {
    if (required) {
      throw new Error(`Directory does not exist: ${path}`);
    }
    return false;
  }
  if (!fs.statSync(path).isDirectory()) {
    throw new Error(`Path is not a directory: ${path}`);
  }
  return true;
}

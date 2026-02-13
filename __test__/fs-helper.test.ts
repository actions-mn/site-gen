import { describe, it, expect, beforeEach, vi } from 'vitest';
import { directoryExistsSync } from '../src/fs-helper.js';
import { existsSync, statSync } from 'fs';
import type { Stats } from 'fs';

vi.mock('fs', () => ({
  existsSync: vi.fn(),
  statSync: vi.fn()
}));

describe('File System Helper', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('directoryExistsSync', () => {
    it('should return true when directory exists', () => {
      const existsSpy = vi.spyOn({ existsSync }, 'existsSync').mockReturnValue(true);
      const statSpy = vi.spyOn({ statSync }, 'statSync').mockReturnValue({
        isDirectory: () => true
      } as Stats);

      const result = directoryExistsSync('/existing/path');

      expect(result).toBe(true);
      expect(existsSync).toHaveBeenCalledWith('/existing/path');
      expect(statSync).toHaveBeenCalledWith('/existing/path');

      existsSpy.mockRestore();
      statSpy.mockRestore();
    });

    it('should return false when directory does not exist (not required)', () => {
      const existsSpy = vi.spyOn({ existsSync }, 'existsSync').mockReturnValue(false);

      const result = directoryExistsSync('/nonexistent/path', false);

      expect(result).toBe(false);
      expect(existsSync).toHaveBeenCalledWith('/nonexistent/path');

      existsSpy.mockRestore();
    });

    it('should throw when directory does not exist (required)', () => {
      const existsSpy = vi.spyOn({ existsSync }, 'existsSync').mockReturnValue(false);

      expect(() => directoryExistsSync('/nonexistent/path', true)).toThrow(
        'Directory does not exist: /nonexistent/path'
      );

      existsSpy.mockRestore();
    });

    it('should throw when path exists but is not a directory', () => {
      const existsSpy = vi.spyOn({ existsSync }, 'existsSync').mockReturnValue(true);
      const statSpy = vi.spyOn({ statSync }, 'statSync').mockReturnValue({
        isDirectory: () => false
      } as Stats);

      expect(() => directoryExistsSync('/file/path')).toThrow(
        'Path is not a directory: /file/path'
      );

      existsSpy.mockRestore();
      statSpy.mockRestore();
    });
  });
});

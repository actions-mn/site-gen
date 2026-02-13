import { describe, it, expect, beforeEach, vi } from 'vitest';
import { directoryExistsSync } from '../src/fs-helper';
import * as fs from 'fs';

vi.mock('fs', () => ({
  default: {
    existsSync: vi.fn(),
    statSync: vi.fn()
  },
  existsSync: vi.fn(),
  statSync: vi.fn()
}));

describe('File System Helper', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('directoryExistsSync', () => {
    it('should return true when directory exists', () => {
      const existsSpy = vi.spyOn(fs, 'existsSync').mockReturnValue(true);
      const statSpy = vi.spyOn(fs, 'statSync').mockReturnValue({
        isDirectory: () => true
      } as fs.Stats);

      const result = directoryExistsSync('/existing/path');

      expect(result).toBe(true);
      expect(existsSpy).toHaveBeenCalledWith('/existing/path');
      expect(statSpy).toHaveBeenCalledWith('/existing/path');

      existsSpy.mockRestore();
      statSpy.mockRestore();
    });

    it('should return false when directory does not exist (not required)', () => {
      const existsSpy = vi.spyOn(fs, 'existsSync').mockReturnValue(false);

      const result = directoryExistsSync('/nonexistent/path', false);

      expect(result).toBe(false);
      expect(existsSpy).toHaveBeenCalledWith('/nonexistent/path');

      existsSpy.mockRestore();
    });

    it('should throw when directory does not exist (required)', () => {
      const existsSpy = vi.spyOn(fs, 'existsSync').mockReturnValue(false);

      expect(() => directoryExistsSync('/nonexistent/path', true)).toThrow(
        'Directory does not exist: /nonexistent/path'
      );

      existsSpy.mockRestore();
    });

    it('should throw when path exists but is not a directory', () => {
      const existsSpy = vi.spyOn(fs, 'existsSync').mockReturnValue(true);
      const statSpy = vi.spyOn(fs, 'statSync').mockReturnValue({
        isDirectory: () => false
      } as fs.Stats);

      expect(() => directoryExistsSync('/file/path')).toThrow(
        'Path is not a directory: /file/path'
      );

      existsSpy.mockRestore();
      statSpy.mockRestore();
    });
  });
});

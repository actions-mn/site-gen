import { describe, it, expect } from 'vitest';
import { MetanormaCommandManager } from '../src/metanorma-command-manager.js';
import { Version } from '../src/version-helper.js';
import type { IMetanormaSettings } from '../src/metanorma-settings.js';

describe('MetanormaCommandManager', () => {
  const createSettings = (
    overrides: Partial<IMetanormaSettings> = {}
  ): IMetanormaSettings => ({
    sourcePath: '/workspace/repo',
    outputDir: '_site',
    configFile: 'metanorma.yml',
    agreeToTerms: false,
    installFonts: true,
    continueWithoutFonts: false,
    strict: false,
    progress: true,
    useBundler: false,
    timestamps: false,
    workspacePath: '/workspace',
    ...overrides
  });

  describe('getSiteGenerateCommand', () => {
    it('should build command with modern version flags', async () => {
      const manager = new MetanormaCommandManager(
        createSettings({ installFonts: true })
      );
      const version = new Version(1, 10, 0);

      const cmd = await manager.getSiteGenerateCommand(
        version,
        '_site',
        'metanorma.yml'
      );

      expect(cmd).toContain('--install-fonts');
      expect(cmd).toContain('site');
      expect(cmd).toContain('generate');
      expect(cmd).toContain('-o');
      expect(cmd).toContain('_site');
      expect(cmd).toContain('-c');
      expect(cmd).toContain('metanorma.yml');
    });

    it('should build command with legacy version flags', async () => {
      const manager = new MetanormaCommandManager(
        createSettings({ installFonts: true })
      );
      const version = new Version(1, 9, 0);

      const cmd = await manager.getSiteGenerateCommand(
        version,
        '_site',
        'metanorma.yml'
      );

      expect(cmd).toContain('--no-no-install-fonts');
    });

    it('should add --strict when enabled', async () => {
      const manager = new MetanormaCommandManager(
        createSettings({ strict: true })
      );
      const version = new Version(1, 10, 0);

      const cmd = await manager.getSiteGenerateCommand(
        version,
        '_site',
        'metanorma.yml'
      );

      expect(cmd).toContain('--strict');
    });

    it('should add --no-progress when progress disabled', async () => {
      const manager = new MetanormaCommandManager(
        createSettings({ progress: false })
      );
      const version = new Version(1, 10, 0);

      const cmd = await manager.getSiteGenerateCommand(
        version,
        '_site',
        'metanorma.yml'
      );

      expect(cmd).toContain('--no-progress');
    });

    it('should add --agree-to-terms when enabled', async () => {
      const manager = new MetanormaCommandManager(
        createSettings({ agreeToTerms: true })
      );
      const version = new Version(1, 10, 0);

      const cmd = await manager.getSiteGenerateCommand(
        version,
        '_site',
        'metanorma.yml'
      );

      expect(cmd).toContain('--agree-to-terms');
    });

    it('should add --no-install-fonts when installFonts disabled', async () => {
      const manager = new MetanormaCommandManager(
        createSettings({ installFonts: false })
      );
      const version = new Version(1, 10, 0);

      const cmd = await manager.getSiteGenerateCommand(
        version,
        '_site',
        'metanorma.yml'
      );

      expect(cmd).toContain('--no-install-fonts');
    });

    it('should add --continue-without-fonts when enabled', async () => {
      const manager = new MetanormaCommandManager(
        createSettings({ continueWithoutFonts: true })
      );
      const version = new Version(1, 10, 0);

      const cmd = await manager.getSiteGenerateCommand(
        version,
        '_site',
        'metanorma.yml'
      );

      expect(cmd).toContain('--continue-without-fonts');
    });

    it('should add --no-continue-without-fonts when disabled', async () => {
      const manager = new MetanormaCommandManager(
        createSettings({ continueWithoutFonts: false })
      );
      const version = new Version(1, 10, 0);

      const cmd = await manager.getSiteGenerateCommand(
        version,
        '_site',
        'metanorma.yml'
      );

      expect(cmd).toContain('--no-continue-without-fonts');
    });
  });
});

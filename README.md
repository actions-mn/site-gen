![GitHub tag (latest by date)](https://img.shields.io/github/v/tag/actions-mn/site-gen)
[![test](https://github.com/actions-mn/site-gen/actions/workflows/test.yml/badge.svg)](https://github.com/actions-mn/site-gen/actions/workflows/test.yml)
[![Security](https://img.shields.io/badge/security-enhanced-green.svg)](https://github.com/actions-mn/site-gen)

# Metanorma Site Generator Action

A secure and robust GitHub Action for generating Metanorma sites from source documents with comprehensive configuration options and enhanced security features.

## Features

- ✅ **Secure**: Input validation, sanitization, and secure script execution
- 🔧 **Configurable**: Comprehensive options for customizing site generation
- 🚀 **Cross-platform**: Supports Ubuntu, Windows, and macOS runners (7 platforms tested)
- 📊 **Observable**: Detailed logging and output information with optional timestamps
- 🐳 **Container-ready**: Works in Docker containers
- 🔄 **Version-aware**: Handles both legacy and modern Metanorma versions
- 🎯 **TypeScript**: Written in TypeScript for type safety and maintainability
- ✅ **Vitest**: Full test coverage with Vitest

## Quick Start

```yml
- uses: actions-mn/site-gen@v2
  with:
    source-path: docs
    config-file: metanorma.yml
    agree-to-terms: true
```

## Prerequisites

This action requires Metanorma CLI to be installed. You can install it using:

### Option 1: Using actions-mn/setup (Recommended)
```yml
- uses: actions-mn/setup@v3
```

### Option 2: Using gem
```yml
- run: gem install metanorma-cli
```

### Option 3: Using bundle
```yml
- run: bundle install
# Then use use-bundler: true in this action
```

## Inputs

| Input | Description | Required | Default |
|-------|-------------|----------|---------|
| `source-path` | Source path containing the configuration file and documents | No | `.` |
| `output-dir` | Output directory for the generated site | No | `_site` |
| `config-file` | Metanorma configuration (manifest) file name | No | `metanorma.yml` |
| `agree-to-terms` | Agree to all third-party licensing terms | No | `false` |
| `install-fonts` | Install missing fonts automatically | No | `true` |
| `continue-without-fonts` | Continue processing even when fonts are missing | No | `false` |
| `strict` | Run metanorma in strict mode (fail on warnings) | No | `false` |
| `progress` | Display progress-related logs during processing | No | `false` |
| `use-bundler` | Use bundler to execute metanorma | No | `false` |
| `timestamps` | Add timestamps to log output | No | `false` |

## Outputs

| Output | Description |
|--------|-------------|
| `site-path` | Path to the generated site directory |
| `config-used` | Configuration file that was used |
| `metanorma-version` | Version of metanorma that was used |

## Usage Examples

### Basic Usage
```yml
name: Generate Site
on: [push]

jobs:
  generate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions-mn/setup@v3
      - uses: actions-mn/site-gen@v2
        with:
          agree-to-terms: true
```

### Advanced Configuration
```yml
- uses: actions-mn/site-gen@v2
  id: generate
  with:
    source-path: documents
    output-dir: public
    config-file: site-config.yml
    agree-to-terms: true
    install-fonts: true
    continue-without-fonts: false
    strict: true
    progress: true
    timestamps: true

- name: Upload site
  uses: actions/upload-artifact@v4
  with:
    name: generated-site
    path: ${{ steps.generate.outputs.site-path }}
```

### Using with Bundler
```yml
- name: Install dependencies
  run: bundle install

- uses: actions-mn/site-gen@v2
  with:
    use-bundler: true
    agree-to-terms: true
```

### Docker Container Usage
```yml
jobs:
  generate:
    runs-on: ubuntu-latest
    container:
      image: metanorma/metanorma:latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions-mn/site-gen@v2
        with:
          agree-to-terms: true
          install-fonts: false
          continue-without-fonts: true
```

## Security Features

This action includes several security enhancements:

- **Input Validation**: All inputs are validated for type, length, and content
- **Path Sanitization**: Protection against path traversal attacks
- **Secure Execution**: No dynamic script generation or unsafe file operations
- **Error Handling**: Comprehensive error handling with meaningful messages
- **Logging**: Structured logging for debugging and monitoring

## Troubleshooting

### Common Issues

**Error: "Failed to get metanorma version"**
- Ensure Metanorma CLI is properly installed
- If using bundler, set `use-bundler: true`

**Error: "Path traversal detected"**
- Check that your paths don't contain `../` sequences
- Use relative paths within the workspace

**Error: "Metanorma site generation failed"**
- Check your `metanorma.yml` configuration file
- Ensure all required documents are present
- Enable `progress: true` for more detailed output

### Debug Mode

Enable debug logging by setting the `ACTIONS_STEP_DEBUG` secret to `true` in your repository settings.

## Environment Variables

This action exports the following environment variables for debugging:

| Variable | Description |
|----------|-------------|
| `METANORMA_CMD` | The metanorma command that was used (`metanorma` or `metanorma.exe`) |
| `METANORMA_FLAGS` | The flags that were passed to metanorma |

## Version Compatibility

| Metanorma Version | Support Status |
|-------------------|----------------|
| >= 1.10.0 | ✅ Full support (modern flags) |
| < 1.10.0 | ✅ Legacy support (legacy flags) |

## Platform Support

This action is tested on:

| Platform | Status |
|----------|--------|
| ubuntu-latest | ✅ |
| macos-14 | ✅ |
| macos-15 | ✅ |
| macos-15-intel | ✅ |
| macos-26 | ✅ |
| windows-2022 | ✅ |
| windows-2025 | ✅ |
| Docker (metanorma/metanorma:latest) | ✅ |

## Contributing

Please see [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Changelog

See [CHANGELOG.md](CHANGELOG.md) for a list of changes and version history.

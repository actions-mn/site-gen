# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- TypeScript implementation with full type safety
- Vitest for unit testing with 80%+ coverage
- ESLint 9 with flat config for code quality
- ES2024 target for modern JavaScript features
- Node 24 runtime support
- Comprehensive input validation and sanitization
- Path traversal protection
- Branding metadata (icon and color)
- Enhanced error handling and logging
- Cross-platform support for 7 platforms
- Debug mode support via ACTIONS_STEP_DEBUG
- Structured logging with optional timestamps
- Security testing in CI pipeline
- CONTRIBUTING.md with development guidelines
- TEST_SCENARIOS.md with test strategy documentation
- SECURITY.md with security policy

### Changed
- **BREAKING**: Migrated from composite shell-script action to Node.js TypeScript action
- **BREAKING**: Runtime changed from composite to node24
- **BREAKING**: Enhanced input validation - invalid inputs will cause action to fail
- Improved test coverage with multiple test scenarios
- Enhanced CI pipeline with linting and security checks
- Updated README with comprehensive documentation

### Security
- Fixed command injection vulnerabilities
- Added input validation against path traversal attacks
- Implemented proper type safety with TypeScript
- Added security scanning in CI pipeline

### Fixed
- Resolved issues with timestamp handling on Windows
- Fixed cross-platform compatibility issues
- Improved error messages and debugging information
- Fixed flag handling for different metanorma versions

## [1.x] - Previous Versions

### Legacy Implementation
- Composite GitHub Action with shell scripts
- Basic metanorma site generation functionality
- Cross-platform support (Ubuntu, Windows, macOS)
- Docker container support
- Basic input parameters
- Simple test coverage

---

## Migration Guide

### From v1 to v2

#### Breaking Changes
1. **Runtime**: Changed from composite action to Node.js action (node24)
2. **Type Safety**: All inputs are now validated - invalid inputs will cause the action to fail
3. **Dependencies**: Requires Node.js 24.x or higher
4. **Implementation**: Fully rewritten in TypeScript for type safety and maintainability

#### Required Actions
- Update your workflow files to use `@v2` tag
- Ensure you're using Node.js 24.x or higher
- Review input parameters for any validation issues
- Update any scripts that depend on the old output format

#### Benefits
- Enhanced security and reliability through type safety
- Better error messages and debugging
- Improved performance and maintainability
- Comprehensive documentation and examples
- Full test coverage with Vitest

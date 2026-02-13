# Contributing to metanorma-site-generate

Thank you for considering contributing to this project! This document provides guidelines and instructions for contributing.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Testing](#testing)
- [Coding Standards](#coding-standards)
- [Commit Messages](#commit-messages)
- [Pull Request Process](#pull-request-process)

## Code of Conduct

This project adheres to a code of conduct. By participating, you are expected to uphold this code. Please report unacceptable behavior to the repository maintainers.

## Getting Started

### Prerequisites

- **Node.js 24.x** - This action uses the node24 runtime
- **npm 10.x** or later - For package management

### Setup

1. Fork the repository
2. Clone your fork:
   ```bash
   git clone https://github.com/YOUR_USERNAME/site-gen.git
   cd site-gen
   ```

3. Install dependencies:
   ```bash
   npm ci
   ```

4. Build the project:
   ```bash
   npm run build
   ```

## Development Workflow

### Branch Strategy

- `main` - Protected branch, requires PR for changes
- Feature branches - Create from `main` using the pattern:
  - `feat/feature-name` for new features
  - `fix/bug-name` for bug fixes
  - `refactor/description` for refactoring
  - `test/description` for test changes
  - `docs/description` for documentation

### Making Changes

1. Create a feature branch:
   ```bash
   git checkout -b feat/your-feature-name
   ```

2. Make your changes following [Coding Standards](#coding-standards)

3. Build and test locally:
   ```bash
   npm run build
   npm run format-check
   npm run lint
   npm test
   ```

4. Commit your changes following [Commit Messages](#commit-messages)

5. Push to your fork:
   ```bash
   git push origin feat/your-feature-name
   ```

6. Create a pull request

## Testing

### Unit Tests

Unit tests are written using Vitest and located in `__test__/`:

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with coverage
npm run test:coverage
```

### Integration Tests

Integration tests run on GitHub Actions and verify the action works correctly across:
- **7 platforms**: ubuntu-latest, macos-14, macos-15, macos-15-intel, macos-26, windows-2022, windows-2025
- **Docker containers**: metanorma/metanorma:latest
- **Various parameter combinations**

### Test Coverage

- Aim for **80%+ code coverage**
- All edge cases should have tests
- Add tests for any new functionality

### Writing Tests

**Unit Tests** (`__test__/*.test.ts`):
```typescript
import { describe, it, expect } from 'vitest';

describe('functionName', () => {
  it('should do something', () => {
    // Arrange
    const input = 'test';

    // Act
    const result = functionName(input);

    // Assert
    expect(result).toBe('expected');
  });
});
```

## Coding Standards

### TypeScript

- Use **TypeScript 5.9+** with strict mode enabled
- Target **ES2024**
- Use `import type` for type-only imports
- Avoid `any` - use `unknown` when type is truly unknown
- Use `readonly` for immutable data

### Code Style

- **2 spaces** for indentation (no tabs)
- **120 characters** max line length
- Use **single quotes** for strings
- Use **semicolons** at end of statements
- Use **arrow functions** for anonymous functions

### Formatting

This project uses Prettier for consistent formatting:

```bash
# Format all files
npm run format

# Check formatting without modifying
npm run format-check
```

Please run `npm run format` before committing.

### Linting

ESLint 9 with flat config is used for code quality checks:

```bash
# Run linter
npm run lint

# Auto-fix issues
npm run lint -- --fix
```

### File Organization

```
src/
├── main.ts                      # Entry point
├── constants.ts                 # Constants (if any)
├── version-helper.ts            # Version comparison utilities
├── metanorma-settings.ts        # Settings interface
├── input-helper.ts              # Input parsing and validation
├── fs-helper.ts                 # File system utilities
├── state-helper.ts              # State management
├── metanorma-command-manager.ts # Metanorma command execution
└── metanorma-provider.ts       # Main action logic

__test__/
└── *.test.ts                    # Unit tests

dist/
└── index.js                     # Bundled action (generated)
```

## Commit Messages

This project uses **semantic commit messages**:

```
<type>(<scope>): <subject>
```

### Types

- `feat` - New feature
- `fix` - Bug fix
- `docs` - Documentation changes
- `style` - Code style changes (formatting, etc.)
- `refactor` - Code changes that neither fix bug nor add feature
- `test` - Adding or updating tests
- `chore` - Build process or auxiliary tool changes

### Examples

```
feat(version): add support for Metanorma 2.x
fix(windows): handle metanorma.exe on Windows
docs(readme): update installation instructions
test(command): add tests for timestamp functionality
refactor(manager): extract command builder to separate module
```

### Commit Message Guidelines

- Use **imperative mood** ("add", not "adding" or "added")
- **Do not** end with period
- **Do not** capitalize first letter
- Keep the **subject line under 72 characters**
- For bug fixes, add issue number: `fix(cache): handle race condition, fixes #42`

## Pull Request Process

### Before Creating a PR

1. **Update documentation** if you've changed functionality
2. **Add tests** for any new functionality
3. **Ensure all tests pass**: `npm test`
4. **Ensure linting passes**: `npm run lint`
5. **Ensure formatting passes**: `npm run format-check`
6. **Rebuild dist/**: `npm run build`
7. **Rebase** your branch on latest `main` if needed

### Creating a PR

1. Go to the repository on GitHub
2. Click "New Pull Request"
3. Select your feature branch
4. Use a descriptive title following commit message format
5. Fill in the PR template with:
   - Description of changes
   - Related issues (if any)
   - Testing steps
   - Screenshots (if applicable)

### PR Review Process

1. **Automated checks** must pass:
   - Build and unit tests
   - Format check
   - Lint
   - Check dist
   - Lint Action YAML
   - Integration tests (7 platforms)
   - Docker tests
   - Input validation tests
   - Timestamp tests
2. **At least one maintainer** must approve
3. **No merge conflicts** with `main`
4. **Conversation resolved** (if any review comments)

### After Merge

- **Delete your feature branch** after merge
- Celebrate! 🎉

## Development Tips

### Debugging

To debug the action locally:

1. Build the action: `npm run build`
2. Create a test workflow in your repo
3. Add `actions/checkout@v4` before your action
4. Add debug output using `core.debug()` in your code

### Testing Changes

To test your changes in a real workflow:

1. Push your branch to your fork
2. Create a test workflow that uses your fork:
   ```yaml
   - uses: YOUR_USERNAME/site-gen@feat/your-feature
   ```
3. Run the workflow and verify results

### Common Issues

**Build fails with "Module not found"**:
- Run `npm ci` to reinstall dependencies

**Tests fail locally but pass in CI**:
- Check Node.js version (must be 24.x)
- Clear Vitest cache: `npm test -- --clearCache`

**Linting errors**:
- Run `npm run lint -- --fix` to auto-fix

**dist/ has uncommitted changes**:
- Run `npm run build` to rebuild
- Commit the generated `dist/index.js`

## Getting Help

- **Documentation**: Check the [README](README.md)
- **Issues**: Search existing issues or create a new one
- **Discussions**: Use GitHub Discussions for questions

## License

By contributing, you agree that your contributions will be licensed under the [MIT License](LICENSE).

---

Thank you for your contributions! 🙏

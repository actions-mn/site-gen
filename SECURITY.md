# Security Policy

## Supported Versions

We actively support the following versions with security updates:

| Version | Supported          |
| ------- | ------------------ |
| 2.x.x   | :white_check_mark: |
| 1.x.x   | :x:                |
| < 1.0   | :x:                |

## Security Features

This action includes several security enhancements:

### Input Validation
- All inputs are validated for type, length, and content
- Protection against path traversal attacks
- Sanitization of shell special characters
- Validation of boolean values

### Secure Execution
- No dynamic script generation
- Proper shell escaping for all inputs
- Secure file operations with appropriate permissions
- Error handling to prevent information disclosure

### Logging and Monitoring
- Structured logging for security events
- Debug mode support for troubleshooting
- No sensitive information in logs

## Reporting a Vulnerability

We take security vulnerabilities seriously. If you discover a security vulnerability, please follow these steps:

### 1. Do Not Create a Public Issue
Please do not create a public GitHub issue for security vulnerabilities.

### 2. Report Privately
Send an email to the maintainers at: **security@actions-mn.org**

Include the following information:
- Description of the vulnerability
- Steps to reproduce the issue
- Potential impact
- Any suggested fixes or mitigations

### 3. Response Timeline
- **Initial Response**: Within 48 hours
- **Assessment**: Within 1 week
- **Fix Development**: Within 2 weeks (depending on complexity)
- **Release**: As soon as possible after fix is ready

### 4. Disclosure Process
1. We will acknowledge receipt of your report
2. We will assess the vulnerability and determine its impact
3. We will develop and test a fix
4. We will release a security update
5. We will publicly disclose the vulnerability after the fix is available

## Security Best Practices for Users

When using this action, follow these security best practices:

### 1. Use Specific Versions
```yml
# Good: Use specific version tags
- uses: actions-mn/site-gen@v2.1.0

# Avoid: Using moving tags in production
- uses: actions-mn/site-gen@main
```

### 2. Validate Inputs
```yml
# Validate your configuration files
- name: Validate config
  run: |
    if [[ ! -f metanorma.yml ]]; then
      echo "Configuration file not found"
      exit 1
    fi
```

### 3. Use Least Privilege
```yml
# Only grant necessary permissions
permissions:
  contents: read
```

### 4. Monitor Dependencies
- Regularly update to the latest version
- Review release notes for security updates
- Use Dependabot for automated updates

### 5. Secure Secrets Management
```yml
# Use GitHub secrets for sensitive data
- uses: actions-mn/site-gen@v2.1.0
  with:
    agree-to-terms: ${{ secrets.AGREE_TO_TERMS }}
```

## Known Security Considerations

### 1. Third-party Dependencies
This action depends on:
- Metanorma CLI
- System packages (fonts, etc.)

Keep these dependencies updated and monitor for security advisories.

### 2. File System Access
This action:
- Reads from the source directory
- Writes to the output directory
- Does not access files outside the workspace

### 3. Network Access
This action may:
- Download fonts if `install-fonts: true`
- Access package repositories for dependencies

## Security Changelog

### Version 2.0.0
- **Fixed**: Command injection vulnerabilities
- **Added**: Input validation and sanitization
- **Removed**: Unsafe dynamic script creation
- **Enhanced**: Error handling and logging

### Previous Versions
- Legacy versions had security vulnerabilities and are no longer supported

## Contact

For security-related questions or concerns:
- Email: security@actions-mn.org
- Security Policy: This document
- General Issues: [GitHub Issues](https://github.com/actions-mn/site-gen/issues) (for non-security issues only)

## Acknowledgments

We appreciate the security research community and will acknowledge researchers who responsibly disclose vulnerabilities (with their permission).

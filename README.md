![GitHub tag (latest by date)](https://img.shields.io/github/v/tag/actions-mn/site-gen)
[![test](https://github.com/actions-mn/site-gen/actions/workflows/test.yml/badge.svg)](https://github.com/actions-mn/site-gen/actions/workflows/test.yml)

# site-gen

Perform `metanorma site generation`, like this

```yml
- uses: actions-mn/site-gen@main
  with:
    source-path: iso
    config-file: metanorma.yml
    agree-to-terms: true
```

Or

```yml
- uses: actions-mn/site-gen@main
  with:
    source-path: iso
    config-file: metanorma.yml
    agree-to-terms: true
    output-dir: site
    no-install-fonts: false
    continue-without-fonts: false
    use-bundler: false
```

The action expects that metanorma-cli is already installed.

You can install it by defferent ways:
- `actions-mn/setup@master`
- `gem install metanorma-cli`


> NOTE: if `metanorma-cli` installed with `bundle install` make sure to path `use-bundler: true` to the action

# 📄 docpage

Quickly publish documentation sites from a single markdown file.

> This is an example of a docpage site!

## About

With `docpage` a single markdown file becomes:

- a single html file with:
  - simple, readable styles
  - a sidebar with table of contents
  - links in the header to git repo and main project website
- a documentation site on [docpage.org](https://docpage.org) *(optional)*

## Install

```sh
npm install -g docpage
```

`docpage` requires Node.js and npm. [Install Node.js if you haven't already](https://nodejs.org).

## Command-line usage

### Build the index.html file from a markdown file:

```sh
docpage build example.md > site/index.html
```

### Watch for changes and rebuild:

```sh
docpage build example.md > site/index.html --watch
```

### Put project description in header

```sh
docpage build example.md > site/index.html --description "simple docs site from a markdown file"
```

### Put git repo and main website links in header

```sh
docpage build example.md > site/index.html --code https://github.com/sethvincent/docpage --main-website http://sethvincent.com
```

### Start a development server

```sh
docpage start example.md
```

### Watch for change and rebuild

```sh
docpage start example.md --watch
```

### Publish a markdown file to docpage.org

```sh
docpage register
docpage publish example.md example-docpage-site
```

### Full command-line help text

```
USAGE:
  docpage {command} [options]

COMMANDS:
  publish     publish a page
  build       build page,
  start       serve a page locally
  register    create an account on docpage.org
  login       log in to docpage.org
  help        show this help message

BUILD
  docpage build file.md

  Options:
  -o, --output          the filepath of the html file you want to create
  -w, --watch           watch the markdown file for changes and rebuild
  -c, --code            link to code repository
  -m, --main-website    link to main website for project

START
  docpage start file.md

  Options:
  -o, --output          the filepath of the html file you want to create
  -w, --watch           watch the markdown file for changes and rebuild
  -c, --code            link to code repository
  -m, --main-website    link to main website for project

PUBLISH
  docpage publish file.md name-of-project

LOGIN
  docpage login

REGISTER
  docpage register

HELP
  docpage help
```


## JavaScript module usage

```js
var fs = require('fs')
var path = require('path')
var docpage = require('docpage')

var input = path.join(__dirname, 'example.md')
var output = path.join(__dirname, 'index.html')

var options = {
  output: output,
  title: 'docpage'
}

docpage.build(input, options, function (err, file) {
  if (err) console.log(err)
})
```

## Open source

docpage is open source and based on Node.js and these projects:

- [township](https://github.com/township) – open source tools for auth
- [appa](https://github.com/sethvincent/appa) – a small framework for quickly creating JSON API servers
- [bel](https://github.com/shama/bel) – a simple library for composable DOM elements using tagged template strings

## See also

- [minidocs](https://github.com/freeman-lab/minidocs) – build a minimalist site for your documentation (more features than docpage)
- [static.land](https://static.land) – static site hosting with SSL via Let's Encrypt

## Contact

Need Node.js & JavaScript consulting? Let's work together! Send an email to [Seth Vincent](http://sethvincent.com) at sethvincent@gmail.com.

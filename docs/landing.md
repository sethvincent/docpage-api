# docpage

Quickly publish documentation sites from a single markdown file.

## About

With `docpage` a single markdown file becomes:

- a single html file with:
  - simple, readable styles
  - a sidebar with table of contents
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

### Publish a markdown file to docpage.org

```sh
docpage register
docpage publish example.md example-docpage-site
```

### Watch a markdown file for changes and serve through a development server

```sh
docpage start example.md
```

### Full command-line help text

```
USAGE:
  docpage {command} [options]

COMMANDS:
  publish,   publish a page
  build,     build page,
  start,     serve a page locally
  register,  create an account on docpage.org
  login,     log in to docpage.org
  help,      show this help message

BUILD
  docpage build file.md

START
  docpage start file.md

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

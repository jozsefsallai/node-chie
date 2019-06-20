# Chie

Powerful TSC decryption/encryption tool for Node.js and the CLI.

[![Build Status](https://travis-ci.org/jozsefsallai/chie.svg)](https://travis-ci.org/jozsefsallai/chie) [![Coverage Status](https://coveralls.io/repos/github/jozsefsallai/chie/badge.svg?branch=master)](https://coveralls.io/github/jozsefsallai/chie?branch=master) [![npm version](https://img.shields.io/npm/v/chie.svg?style=flat)](https://www.npmjs.com/package/chie)

## Getting Started

Install using Yarn

```sh
yarn add chie
```

or npm:

```sh
npm i chie
```

Import and have fun!

```js
const { TSC } = require('chie');

TSC().fromFile('input.tsc').decrypt().toFile('output.txt');
```

## Usage

Chie supports the following methods:

  * **fromFile(path)** - Read data from file
  * **fromString(str)** - Read data from string
  * **decrypt()** - Convert TSC to plaintext
  * **encrypt()** - Convert plaintext to TSC
  * **toString()** - Return the output as a string
  * **toFile(path)** - Write the output to a file

## CLI

Chie is also available for the command line.

```sh
npm i -g chie
```

You will have access to two new commands: `decrypt-tsc` and `encrypt-tsc`. Running either of these will display a prompt asking you for the source and destination paths.

## Contribution

Any kind of contribution is welcome! Whether it's a question, a bug report, or a pull request, you're more than welcome to submit it on GitHub.

## For PRs

Make sure to write/change the proper unit tests and run them:

```sh
yarn test
```

and make sure your changes pass the linter:

```sh
yarn lint
```

## License

MIT. 

Chie is a character from Cave Story (Doukutsu Monogatari), a game by Daisuke "Pixel" Amaya and Nicalis.

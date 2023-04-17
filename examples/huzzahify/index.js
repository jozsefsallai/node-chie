/**
 * Copyright 2019 József Sallai
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files(the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and / or sell copies
 * of the Software, and to permit persons to whom the Software is furnished to do
 * so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
 * FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.IN NO EVENT SHALL THE AUTHORS OR
 * COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
 * IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

const inquirer = require('inquirer');
const path = require('path');
const fs = require('fs');

const { TSC } = require('../../'); // require('node-chie');

// NOTE: this example assumes that you have inquirer installed

inquirer.prompt([
  {
    type: 'string',
    name: 'folder',
    message: 'Cave Story+ installation folder location:'
  },
  {
    type: 'confirm',
    name: 'confirmation',
    message: 'Before running this script you SHOULD make a backup.\nBy continuing, you agree that you did create one. Continue?',
    default: false
  }
])
  .then(({ folder, confirmation }) => {
    if (!confirmation) {
      console.log('Aborted.');
      process.exit();
    }

    const TSC_PATH = path.resolve(folder, 'data', 'base', 'Stage');
    const files = fs.readdirSync(TSC_PATH);

    files.forEach(file => {
      const f = path.join(TSC_PATH, file);

      if (!file.toLowerCase().endsWith('.tsc')) {
        return;
      }

      const original = TSC().fromFile(f).decrypt().toString();

      if (!original.includes('Oh Yeaaah!!')) {
        return;
      }

      const changed = original.split('Oh Yeaaah!!').join('Huzzah!');
      // or Bushlands -> Grasstown, etc.

      TSC().fromString(changed).encrypt().toFile(f);

      console.log(`Changed in ${file}!`);
    });
  })
    .then(function () {
      console.log('Done!');
      process.exit();
    })
    .catch(err => {
      console.error(err);
      process.exit(1);
    });

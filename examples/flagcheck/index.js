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

const { TSC } = require('../../'); // require('chie');

// NOTE: this example assumes that you have inquirer installed

inquirer.prompt([
  {
    type: 'string',
    name: 'folder',
    message: 'Path to the folder that contains the TSC files (Stage folder):'
  },
  {
    type: 'string',
    name: 'id',
    message: 'Flag ID:'
  }
])
  .then(({ folder, id }) => {
    const TSC_PATH = path.resolve(folder);
    const files = fs.readdirSync(TSC_PATH);

    files.forEach(file => {
      const f = path.join(TSC_PATH, file);

      if (!file.toLowerCase().endsWith('.tsc')) {
        return;
      }

      const tsc = TSC().fromFile(f).decrypt().toString();

      if (tsc.includes(`<FL+${id}`)) {
        // A flag ID exists in a TSC file if it is assigned using <FL+

        const chunks = tsc.split(`<FL+${id}`).slice(0, -1);

        chunks.forEach(chunk => {
          const event = chunk.match(/#[0-9]{4}/g).pop();
          console.log(`Found flag in ${file}, assigned in event ${event}.`);
        });
      }
    });
  })
  .then(function () {
    process.exit();
  })
  .catch(err => {
    console.error(err)
    process.exit(1);
  });

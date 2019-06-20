const fs = require('fs');

class TSC {
  constructor() {
    this.output = '';
    this.CONVERSION_TYPES = {
      ENCRYPT: 1,
      DECRYPT: 2
    };
  }

  convert(type) {
    let key = this.encodingChar
      ? this.encodingChar % 256
      : 7;

    if (type === this.CONVERSION_TYPES.DECRYPT) {
      key *= -1;
    }

    for (let i = 0; i < this.contents.length; i++) {
      const char = i !== Math.floor(this.size / 2)
        ? String.fromCharCode(this.contents[i] + key)
        : String.fromCharCode(this.contents[i]);

      this.output += char;
    }

    return this;
  }

  getEncodingChar() {
    return this.contents[Math.floor(this.size / 2)];
  }

  decrypt() {
    this.encodingChar = this.getEncodingChar();
    this.convert(this.CONVERSION_TYPES.DECRYPT);

    return this;
  }

  encrypt() {
    this.encodingChar = this.getEncodingChar();
    this.convert(this.CONVERSION_TYPES.ENCRYPT);

    return this;
  }

  fromFile(file) {
    if (!fs.existsSync(file)) {
      throw new Error(`The specified path "${file}" does not exist or is not readable.`);
    }

    this.contents = fs.readFileSync(file);
    this.size = this.contents.length;

    return this;
  }

  fromString(str) {
    if (typeof str !== 'string') {
      throw new TypeError('The specified value must be a string.');
    }

    this.contents = Buffer.from(str, 'latin1');
    this.size = this.contents.byteLength;

    return this;
  }

  toFile(path) {
    if (!path) {
      throw new Error('Please specifiy a path to save the output in.');
    }

    return fs.writeFileSync(path, this.output, { encoding: 'latin1' });
  }

  toString() {
    return this.output;
  }
}

module.exports = () => new TSC();
module.exports.default = module.exports;
module.exports.TSC = module.exports;

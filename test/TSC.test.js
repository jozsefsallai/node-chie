const { expect } = require('chai');
const path = require('path');
const fs = require('fs');

const TSC = require('../lib/TSC');

const fixtures = {
  TSC: path.join(__dirname, 'fixtures', 'Cave.tsc'),
  TXT: path.join(__dirname, 'fixtures', 'Cave.txt')
};

describe('TSC', function () {
  describe('#fromFile', function () {
    it('should properly throw if file does not exist', function () {
      return expect(() => TSC().fromFile('woah.tsc')).to.throw();
    });

    it('should read the contents if the file exists', function () {
      const tsc = TSC().fromFile(fixtures.TSC);
      return expect(tsc.contents).to.not.be.undefined;
    });

    it ('should have proper size', function () {
      const tsc = TSC().fromFile(fixtures.TSC);
      return expect(tsc.size).to.not.be.null;
    });
  });

  describe('#fromString', function () {
    it('should throw on non-string', function () {
      return expect(() => TSC().fromString({ chie: 'Chie is cute' })).to.throw(TypeError);
    });

    it('should read the contents', function () {
      const tsc = TSC().fromString('Chie is cute');
      return expect(tsc.contents).to.not.be.undefined;
    });

    it('should have proper length', function () {
      const tsc = TSC().fromString('Chie is cute');
      return expect(tsc.size).to.eql('Chie is cute'.length);
    });
  });

  describe('#getEncodingChar', function () {
    it('should get encoding char', function () {
      const input = 'Chie is cute';
      const char = Buffer.from(input[Math.floor(input.length / 2)], 'latin1');

      const encodingChar = TSC().fromString(input).getEncodingChar();

      return expect(encodingChar).to.eql(char[0]);
    });
  });

  describe('#convert', function () {
    it('should convert tsc to plaintext', function () {
      const tsc = TSC().fromFile(fixtures.TSC);
      tsc.encodingChar = tsc.getEncodingChar();
      const output = tsc.convert(2).output;
      const plainText = fs.readFileSync(fixtures.TXT, { encoding: 'utf8' });
      return expect(output.replace(/\r/g, '')).to.eql(plainText);
    });

    it('should convert plaintext to tsc', function () {
      const tsc = TSC().fromFile(fixtures.TXT);
      tsc.encodingChar = tsc.getEncodingChar();
      const output = tsc.convert(1).output;
      const origin = fs.readFileSync(fixtures.TSC, { encoding: 'latin1' });
      return expect(output).to.eql(origin);
    });
  });

  describe('#decrypt', function () {
    it('should decrypt tsc', function () {
      const tsc = TSC().fromFile(fixtures.TSC).decrypt();
      const output = tsc.output;
      const origin = fs.readFileSync(fixtures.TXT, { encoding: 'utf8' });
      return expect(output).to.eql(origin);
    });
  });

  describe('#encrypt', function () {
    it('should encrypt tsc', function () {
      const tsc = TSC().fromFile(fixtures.TXT).encrypt();
      const output = tsc.output;
      const origin = fs.readFileSync(fixtures.TSC, { encoding: 'latin1' });
      return expect(output).to.eql(origin);
    });
  });

  describe('#toFile', function () {
    beforeEach(function () {
      return TSC().fromFile(fixtures.TSC).decrypt().toFile(path.join(__dirname, 'out.txt'));
    });

    afterEach(function () {
      return fs.unlinkSync(path.join(__dirname, 'out.txt'));
    });

    it('should throw when no file is provided', function () {
      return expect(() => TSC().fromFile(fixtures.TSC).decrypt().toFile()).to.throw(Error);
    })

    it('should create file', function () {
      return expect(fs.existsSync(path.join(__dirname, 'out.txt'))).to.be.true;
    });

    it('should write contents to file', function () {
      const expected = fs.readFileSync(fixtures.TXT, { encoding: 'utf8' });
      return expect(fs.readFileSync(path.join(__dirname, 'out.txt'), { encoding: 'utf8' })).to.eql(expected);
    });
  });

  describe('#toString', function () {
    it('should return output', function () {
      const tsc = TSC().fromFile(fixtures.TSC).decrypt();
      return expect(tsc.toString()).to.eql(tsc.output);
    });
  });
});

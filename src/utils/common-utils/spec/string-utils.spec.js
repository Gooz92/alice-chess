'use strict';

var assert = require('chai').assert,
  stringUtils = require('../string-utils');

describe('stringUtils', function () {
  describe('.repeat()', function () {
    var repeat = stringUtils.repeat;
    it('create string with repeated n times substring', function () {
      var times = 5, substring = 'ha', expected = 'hahahahaha';
      assert.strictEqual(repeat(substring, times), expected);
    });

    it('return empty string if repetiotion count is zero', function () {
      assert.strictEqual(repeat('repeat me plz', 0), '');
    });

    it('return empty string if repetiotion count is negative', function () {
      assert.strictEqual(repeat('repeat me plz', -2), '');
    });
  });

  describe('.createPadding()', function () {
    var createPadding = stringUtils.createPadding;
    it('repeat padding character size - str.length times', function () {
      assert.strictEqual(createPadding('pad me', 8, '-'), '--');
    });

    it('return empty string if size <= str.length', function () {
      assert.strictEqual(createPadding('pad me', 5, '-'), '');
    });
  });

  describe('.padLeft()', function () {
    var padLeft = stringUtils.padLeft;
    it('return same string if padding size <= string.length', function () {
      var text = 'my length is 15';
      assert.strictEqual(padLeft(text, 14), text);
    });

    it('add str.length - size padding characters before string', function () {
      var str = 'pad me plz',
        padSize = str.length + 2,
        padChar = '#',
        paddedStr = '##pad me plz';

      assert.strictEqual(padLeft(str, padSize, padChar), paddedStr);
    });

    it('use space as default padding character', function () {
      assert.strictEqual(padLeft('', 1), ' ');
    });
  });

  describe('.padRight()', function () {
    var padRight = stringUtils.padRight;
    it('return same string if padding size <= string.length', function () {
      assert.strictEqual(padRight('abc', 2), 'abc');
    });

    it('add str.length - size padding characters after string', function () {
      var str = 'pad me plz',
        padSize = str.length + 2,
        padChar = '#',
        paddedStr = 'pad me plz##';

      assert.strictEqual(padRight(str, padSize, padChar), paddedStr);
    });

    it('use space as default padding character', function () {
      assert.strictEqual(padRight('', 1), ' ');
    });
  });

  describe('.center()', function () {
    it('center string in larger string with given size', function () {
      assert.strictEqual(stringUtils.center('a', 4), ' a  ');
      assert.strictEqual(stringUtils.center('a', 5), '  a  ');
    });

    it('return same string if size less or eqaul than string length', function () {
      assert.strictEqual(stringUtils.center('abc', 2), 'abc');
    });

    it('may use custom pad character', function () {
      assert.strictEqual(stringUtils.center('+', 3, '#'), '#+#');
    });
  });

  describe('.stringify()', function () {
    var stringify = stringUtils.stringify;
    it('return empty single quotes for null', function () {
      assert.strictEqual(stringify(null), "''");
    });

    it('return empty single quotes for undefined', function () {
      var notDefined = void 0;
      assert.strictEqual(stringify(notDefined), "''");
    });

    it('return empty single quotes for empty string', function () {
      var empty = '';
      assert.strictEqual(stringify(empty), "''");
    });

    it('wrap string without quotes in single quotes', function () {
      var message = 'hello';
      assert.strictEqual(stringify(message), "'hello'");
    });

    it('wrap string with double quotes in single quotes', function () {
      var data = 'message="hello"';
      assert.strictEqual(stringify(data), "'message=\"hello\"'");
    });

    it('wrap string with single quotes in double quotes', function () {
      var data = "message='hello'";
      assert.strictEqual(stringify(data), '"message=\'hello\'"');
    });
  });
});

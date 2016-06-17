'use strict';

var assert = require('chai').assert,
  stringUtils = require('../string-utils');

describe('stringUtils', function () {
  describe('.isWrappedInQuotes', function () {
    var isWrappedInQuotes = stringUtils.isWrappedInQuotes;

    it('return true for string wrapped in double quotes', function () {
      assert.isTrue(isWrappedInQuotes('"value"'));
    });

    it('return true for string wrapped in single quotes', function () {
      assert.isTrue(isWrappedInQuotes("'value'"));
    });

    it('return false if string not wrapped in quotes', function () {
      assert.isFalse(isWrappedInQuotes('value'));
    });

    it('return false for if start quote not equal to end quote', function () {
      assert.isFalse(isWrappedInQuotes("'value\""));
    });

    it('return false if only start quote present', function () {
      assert.isFalse(isWrappedInQuotes('"value'));
    });

    it('return false if only end quote present', function () {
      assert.isFalse(isWrappedInQuotes("value'"));
    });
  });

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
    it('return same string if padding size <= string.length');
    it('add str.length - size padding characters before string');
    it('use space as default padding character');
  });

  describe('.padRight()', function () {
    var padRight = stringUtils.padRight;
    it('return same string if padding size <= string.length');
    it('add str.length - size padding characters after string');
    it('use space as default padding character');
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

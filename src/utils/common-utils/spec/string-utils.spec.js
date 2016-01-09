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
});

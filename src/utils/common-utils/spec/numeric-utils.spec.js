'use strict';

var numericUtils = require('../numeric-utils'),
  assert = require('chai').assert;

describe('numericUtils', function () {
  describe('.isNonNegativeInteger()', function () {
    var isNonNegativeInteger = numericUtils.isNonNegativeInteger;

    it('return true for zero', function () {
      assert.isTrue(isNonNegativeInteger(0));
    });

    it('return true for positive integer', function () {
      assert.isTrue(isNonNegativeInteger(1));
      assert.isTrue(isNonNegativeInteger(42));
    });

    it('return false for negative integer', function () {
      assert.isFalse(isNonNegativeInteger(-1));
      assert.isFalse(isNonNegativeInteger(-6));
    });
  });

  describe('.splitInThousands()', function () {
    var splitInThousands = numericUtils.splitInThousands;
    it('split number in thousands groups', function () {
      var number = 123456789;
      assert.deepEqual(splitInThousands(number), ['123', '456', '789']);
    });

    it('first thousand group may content two digits', function () {
      assert.deepEqual(splitInThousands(12345), ['12', '345']);
    });

    it('first thousand group may content one digit', function () {
       assert.deepEqual(splitInThousands(1234567), ['1', '234', '567']);
    });

    it('return array with same string if string.length < 4', function () {
      assert.deepEqual(splitInThousands(12), ['12']);
    });
  });

  describe('.formatThousands()', function () {
    var formatThousands = numericUtils.formatThousands;
    it('split thousands use space as default separator', function () {
      assert.deepEqual(formatThousands(1000000), '1 000 000');
    });

    it('may take custom separator as argument', function () {
      assert.deepEqual(formatThousands(1000, ','), '1,000');
    });
  });
});

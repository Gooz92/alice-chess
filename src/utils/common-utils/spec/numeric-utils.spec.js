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
});

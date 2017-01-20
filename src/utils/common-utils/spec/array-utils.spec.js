'use strict';

var assert = require('assert'),
  arrayUtils = require('../array-utils');

describe('arrayUtils', function () {

  describe('.sum()', function () {
    it('return sum of array elements', function () {
      assert.strictEqual(arrayUtils.sum([2, 3, 4]), 9);
    });
  });

  describe('.mean()', function () {
    it('return mean of the values in array', function () {
      assert.strictEqual(arrayUtils.mean([2, 3, 4]), 3);
    });
  });

  describe.skip('removeAt', function () {
    it('remove element from array by index', function () {
      var array = ['one', 2, '3'];

      arrayUtils.removeAt(array, 1);

      assert.deepEqual(array, ['one', '3']);
    });
  });

  describe('remove', function () {
    it('remove element from array', function () {
      var array = ['p', 'queen', 'chess', 'alice', 'bob'];

      arrayUtils.remove(array, 'alice');

      assert.deepEqual(array, ['p', 'queen', 'chess', 'bob']);
    });
  });
});

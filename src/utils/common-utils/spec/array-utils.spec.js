'use strict';

var assert = require('assert'),
  arrayUtils = require('../array-utils');

describe('arrayUtils', function () {
  describe('removeAt', function () {
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

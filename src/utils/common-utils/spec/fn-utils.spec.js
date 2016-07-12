'use strict';

var assert = require('assert'),
  sinon = require('sinon'),

  fnUtils = require('../fn-utils');

describe('fnUtils', function() {
  describe('.times()', function() {
    it('invoke function n times', function() {
      var n = 10,
        fn = sinon.spy();

      fnUtils.times(n, fn);

      assert.strictEqual(fn.callCount, n);
    });
  });

  describe('.constant()', function () {
    var constant = fnUtils.constant;
    it('create a function that returns given value', function () {
      var pi = constant(Math.PI);
      assert.strictEqual(pi(), Math.PI);
    });
  });
});

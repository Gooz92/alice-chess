'use strict';

var assert = require('chai').assert,
  assertion = require('../assertion');

describe('createUnaryAssertion()', function () {
  it('return function', function () {
    var unaryAssertion = assertion.createUnaryAssertion(function () {});
    assert.isFunction(unaryAssertion);
  });
});

'use strict';

var assert = require('chai').assert,
  createAssertion = require('../create-assertion');

describe('createAssertion()', function () {
  it.skip('return function', function () {
    var assertion = createAssertion(function () {});
    assert.isFunction(assertion);
  });
});

'use strict';

var getType = require('../get-type'),
  assert = require('chai').assert;

describe('getType()', function () {
  it("return 'object' for not-null object", function () {
    var obj = {},
      type = getType(obj);

    assert.strictEqual(type, 'object');
  });

  it("return 'null' for null", function () {
    var nill = null,
      type = getType(nill);

    assert.strictEqual(type, 'null');
  });

  it("return 'array' for array", function () {
    var arr = [1, 2, 3],
      type = getType(arr);

    assert.strictEqual(type, 'array');
  });

  it("return 'string' for string", function () {
    var text = 'hello',
      type = getType(text);

    assert.strictEqual(type, 'string');
  });

  it("return 'function' for function", function () {
    var add = function (a, b) {
      return a + b;
    };

    var type = getType(add);

    assert.strictEqual(type, 'function');
  });

  it("return 'number' for number", function () {
    var answer = 42,
      type = getType(answer);

    assert.strictEqual(type, 'number')
  });

  // Not-A-Number is a number lol
  it("return 'number' for NaN", function () {
    var notNumber = Number.NaN,
      type = getType(notNumber);

    assert.strictEqual(type, 'number');
  });

  it("return 'number' for positive infinity", function () {
    var endless = Number.POSITIVE_INFINITY,
      type = getType(endless);

    assert.strictEqual(type, 'number');
  });

  it("return 'number' for negative infinity", function () {
    var abyss = Number.NEGATIVE_INFINITY,
      type = getType(abyss);

    assert.strictEqual(type, 'number');
  });

  it("return 'boolean' for true", function () {
    var truth = true,
      type = getType(truth);

    assert.strictEqual(type, 'boolean');
  });

  it("return 'undefined' for undefined", function () {
    var notDefined = void 0,
      type = getType(notDefined);

    assert.strictEqual(type, 'undefined');
  });
});

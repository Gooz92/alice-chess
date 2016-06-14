'use strict';

var assert = require('chai').assert,
  template = require('../template')

describe('template()', function () {
  it("return same string for string without placeholders", function () {
    var pattern = 'string without placeholders';

    assert.strictEqual(template(pattern), pattern);
  });

  it('replace placeholders in pattern with actual values', function () {
    var pattern = 'val1 = {0}, val2 = {1}, val3 = {2}',
      one = 1, two = 'two', three = '3',
      expected = 'val1 = 1, val2 = two, val3 = 3',
      actual = template(pattern, one, two, three);

    assert.strictEqual(actual, expected);
  });

  it("don't replace escaped placeholders", function () {
    var pattern = 'Not replaced: \\{0}, replaced: {0}, {1}',
      one = 'first', two = 'zwei',
      expected = 'Not replaced: \\{0}, replaced: first, zwei',
      actual = template(pattern, one, two);

    assert.strictEqual(actual, expected);
  });

  it('may take replaced values as array', function () {
    var pattern = '[x={0};y={1}]',
      point = [1, 2],
      expected = '[x=1;y=2]',
      actual = template(pattern, point);

    assert.strictEqual(actual, expected);
  });
});

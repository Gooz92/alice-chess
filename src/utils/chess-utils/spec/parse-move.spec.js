'use strict';

var parseMove = require('../parse-move'),
  assert = require('chai').assert;

describe('parseMove()', function () {
  it("return object with piece = 'p' for pawn moves", function () {
    var move = parseMove('e4');
    assert.strictEqual(move.piece, 'p');
    move = parseMove('e2e4');
    move = parseMove
  });

  it('return object with destination square for pawn moves', function () {
    var move = parseMove('e5');
    assert.strictEqual(move.to, 'e5');
  });
});
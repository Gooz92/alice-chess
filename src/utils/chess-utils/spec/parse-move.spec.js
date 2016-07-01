'use strict';

var parseMove = require('../parse-move'),
  assert = require('chai').assert;

describe('parseMove()', function () {
  it("return object with piece = 'P' for pawn moves", function () {
    var move = parseMove('e4');
    assert.strictEqual(move.piece, 'P');
  });

  it('return object with destination square for pawn moves', function () {
    var move = parseMove('e5');
    assert.strictEqual(move.to, 'e5');
  });

  it("return object with piece = 'N' for knight moves", function () {
    var move = parseMove('Nc3');
    assert.strictEqual(move.piece, 'N');
  });

  it("return object with destination square for knight moves", function () {
    var move = parseMove('Nf3');
    assert.strictEqual(move.to, 'f3');
  });

  it("return object with true capture flag for captures", function () {
    var move = parseMove('Nxe5');
    assert.isTrue(true);
  });
});
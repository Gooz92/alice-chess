'use strict';

var getSanDisambiguationOptions = require('../get-san-disambiguation-options'),
  moveFactory = require('../move-factory'),
  Chess = require('../chess'),
  assert = require('chai').assert;

describe('getSanDisambiguationOptions()', function () {

  var chess;
  beforeEach(function () {
    chess = new Chess();
  });

  it('return empty array for empty array', function () {
    var disambiguationOptions = getSanDisambiguationOptions([]);
    assert.sameMembers(disambiguationOptions, []);
  });

  it('set file disambiguation option to true if needed', function () {
    var leftRook = chess.placePiece('R', 'a1'),
      rightRook = chess.placePiece('R', 'h1'),
      targetSquare = chess.squares.e1,

    moves = [
      moveFactory.createRookMove(leftRook.square, targetSquare),
      moveFactory.createRookMove(rightRook.square, targetSquare)
    ],

    disambiguationOptions = getSanDisambiguationOptions(moves);

    assert.isTrue(disambiguationOptions[0].file);
    assert.isTrue(disambiguationOptions[1].file);
  });

  /*
    6 B . .
    5 . x .
    4 . . # <= g4
    3 . x .
    2 B . .
      e f g
  */

  it('set rank disambiguation option to true if needed', function () {
    var upperBishop = chess.placePiece('B', 'e6'),
      lowerBishop = chess.placePiece('B','e2'),
      targetSquare = chess.squares.g4,

    moves = [
      moveFactory.createSilentMove(upperBishop.square, targetSquare),
      moveFactory.createSilentMove(lowerBishop.square, targetSquare)
    ],

    disambiguationOptions = getSanDisambiguationOptions(moves);

    assert.isTrue(disambiguationOptions[0].rank);
    assert.isTrue(disambiguationOptions[1].rank);
  });
});
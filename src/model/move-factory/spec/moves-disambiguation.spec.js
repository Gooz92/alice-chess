'use strict';

var movesDisambiguation = require('../moves-disambiguation'),
  moveFactory = require('..'),
  Chess = require('../../chess'),
  assert = require('chai').assert;

describe('movesDisambiguation', function () {
  var disambiguateMoves = movesDisambiguation.disambiguateMoves;
  describe('disambiguateMoves()', function () {
    var chess;
    beforeEach(function () {
      chess = new Chess();
    });

    it('set file disambiguation option to true if needed', function () {
      var leftRook = chess.placePiece('R', 'a1'),
        rightRook = chess.placePiece('R', 'h1'),
        targetSquare = chess.squares.e1,

      moves = [
        moveFactory.createRookMove(leftRook.square, targetSquare),
        moveFactory.createRookMove(rightRook.square, targetSquare)
      ];

      disambiguateMoves(moves);

      assert.isTrue(moves[0].disambiguateFile);
      assert.isTrue(moves[1].disambiguateFile);
    });

    it('set rank disambiguation option to true if needed', function () {
      var upperBishop = chess.placePiece('B', 'e6'),
        lowerBishop = chess.placePiece('B','e2'),
        targetSquare = chess.squares.g4,

      moves = [
        moveFactory.createSilentMove(upperBishop.square, targetSquare),
        moveFactory.createSilentMove(lowerBishop.square, targetSquare)
      ];

      disambiguateMoves(moves);

      assert.isTrue(moves[0].disambiguateRank);
      assert.isTrue(moves[1].disambiguateRank);
    });
  });
});

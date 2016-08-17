'use strict';

var BigPawn = require('../big-pawn'),
  Chess = require('../../chess'),
  assert = require('chai').assert;

describe('BigPawn', function () {
  describe('#make()', function () {
    it('update target en passant square', function () {
      var chess = new Chess(),
        sourceSquare = chess.squares.e2,
        bigPawnMove;

      chess.placePiece('P', sourceSquare.name);

      bigPawnMove = new BigPawn(sourceSquare, chess.squares.e4);
      bigPawnMove.make();

      assert.strictEqual(chess.enPassantTargetSquare, chess.squares.e3);
    });
  });
});

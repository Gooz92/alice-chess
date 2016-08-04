'use strict';

var Promotion = require('../promotion'),
  Chess = require('../../chess'),
  assert = require('chai').assert;

describe('Promotion', function () {
  var chess, pawn;

  beforeEach(function () {
    var promotion;

    chess = new Chess();

    pawn = chess.placePiece('P', 'e7');
    promotion = new Promotion(chess.squares.e7, chess.squares.e8, 'Q');
    promotion.make();
  });

  describe('#make()', function () {
    it('remove pawn from source square', function () {
      assert.isTrue(chess.squares.e7.isEmpty());
    });

    it('place promoted piece to source square', function () {
      assert.isTrue(chess.squares.e8.piece.isQueen());
    });
  });
});

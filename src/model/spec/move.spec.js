'use strict';

var assert = require('chai').assert,
  Chess = require('../chess');

describe('Move', function () {
  describe('#toSAN()', function () {
    it("don't add 'p' token for pawn move", function () {
      var chess = new Chess(),
        pawn = chess.placePiece('P', 'e2'),
        moves = pawn.generateSanMoves();

      var result = moves.every(function (move) {
        return move.charAt(0) !== 'P';
      });

      assert.isTrue(result);
    });
  });
});

'use strict';

var assert = require('chai').assert,
  Chess = require('../chess');

require('chai').config.truncateThreshold = 80;

describe('Moves generation', function () {
  describe("pawn, rook, bishop, queen shoul'd jump over pieces", function () {
    var chess;

    beforeEach(function () {
      chess = new Chess();
    });

    it("pawn shoul'd jump over pieces", function () {
      var pawn = chess.placePiece('P', 'c2'),
        pawnMoves;

      chess.placePiece('N', 'c3');

      pawnMoves = pawn.generateMoves();

      assert.sameMembers(pawnMoves, []);
    });

    it("rook shoul'd jump over pieces", function () {
      var rook = chess.placePiece('r', 'a8'),
        rookMoveTargetSquareNames;

      chess.placePiece('N', 'd8'); // black rook may capture this white knight
      chess.placePiece('b', 'a6');

      rookMoveTargetSquareNames = rook.generateTargetSquareNames();

      assert.sameMembers(rookMoveTargetSquareNames, [
        'b8', 'c8', 'd8', 'a7'
      ]);
    });

    it("bishop shoul'd jump over pieces", function () {
      var bishop = chess.placePiece('b', 'a1'),
        bishopMoveTargetSquareNames;

      chess.placePiece('r', 'f6');

      bishopMoveTargetSquareNames = bishop.generateTargetSquareNames();

      assert.sameMembers(bishopMoveTargetSquareNames, [
        'b2', 'c3', 'd4', 'e5'
      ]);
    });

    it("queen shoul'd jump over pieces", function () {
      var queen = chess.placePiece('Q', 'b1'),
        queenMoveTargetSquareNames;

      chess.placePiece('P', 'b3');
      chess.placePiece('P', 'd3');
      chess.placePiece('P', 'e1');

      queenMoveTargetSquareNames = queen.generateTargetSquareNames();

      assert.sameMembers(queenMoveTargetSquareNames, [
        'a1', 'c1', 'd1', 'b2', 'a2', 'c2'
      ]);
    });
  });

  describe("don't leave king in check", function () {
    var chess;

    beforeEach(function () {
      chess = new Chess();
    });

    it('lang-ranged piece', function () {
      var whiteRook, rookTargerSquareNames;

      chess.place({
        e3: 'K',
        e5: 'R',
        e8: 'r'
      });

      whiteRook = chess.getSquareByName('e5').piece;
      rookTargerSquareNames = whiteRook.generateTargetSquareNames();

      assert.sameMembers(rookTargerSquareNames, [
        'e4', 'e6', 'e7', 'e8'
      ]);
    });

    it('pawn silent move', function () {
      var blackPawn, pawnTargetSquareNames;

      chess.turn();

      chess.place({
        d3: 'k',
        f5: 'p',
        h7: 'B'
      });

      blackPawn = chess.getSquareByName('f5').piece;
      pawnTargetSquareNames = blackPawn.generateTargetSquareNames();

      assert.sameMembers(pawnTargetSquareNames, []);
    });

    it('knight silent move', function() {
      var whiteKnight, knightTargetSquareNames;

      chess.place({
        e5: 'N',
        e6: 'K',
        e3: 'q'
      });

      whiteKnight = chess.getSquareByName('e5').piece;
      knightTargetSquareNames = whiteKnight.generateTargetSquareNames();

      assert.sameMembers(knightTargetSquareNames, []);
    });
  });
});

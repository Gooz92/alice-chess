'use strict';

var assert = require('chai').assert,
  Chess = require('../chess'),
  boardUtils = require('../../utils/chess-utils/board-utils');

describe('Pawn', function () {
  var chess;

  beforeEach(function () {
    chess = new Chess();
  });

  describe('#generateTargetSquareNames()', function () {
    it('generate en passant capture for white pawn', function () {
      var pawn = chess.placePiece('P', 'e5'),
        moves;

      chess.placePiece('p', 'd5');
      chess.enPassantTargetSquare = chess.squares.d6;

      moves = pawn.generateTargetSquareNames();

      assert.sameMembers(moves, ['e6', 'd6']);
    });

    it('generate en passant capture for black pawn', function () {
      var pawn = chess.placePiece('p', 'd4'),
        captures;

      chess.placePiece('P', 'e4');
      chess.enPassantTargetSquare = chess.squares.e3;

      captures = pawn.generateTargetSquareNames();

      assert.sameMembers(captures, ['d3', 'e3']);
    });
  });

  describe('#isOnStartPosition()', function () {
    it('return true for white pawn placed on second rank', function () {
      var pawn = chess.placePiece('P', 'e2');
      assert.isTrue(pawn.isOnStartPosition());
    });

    it('return false for white pawn placed on third rank', function () {
      var pawn = chess.placePiece('P', 'd3');
      assert.isFalse(pawn.isOnStartPosition());
    });

    it('return false for white pawn placed on seventh rank', function () {
      var pawn = chess.placePiece('P', 'f7');

      assert.isFalse(pawn.isOnStartPosition());
    });

    it('return true for black pawn placed on seventh rank', function () {
      var pawn = chess.placePiece('p', 'c7');
      assert.isTrue(pawn.isOnStartPosition());
    });

    it('return false for black pawn placed on fourth rank', function () {
      var pawn = chess.placePiece('p', 'g4');
      assert.isFalse(pawn.isOnStartPosition());
    });

    it('return false for black pawn placed on second rank', function () {
      var pawn = chess.placePiece('p', 'a2');
      assert.isFalse(pawn.isOnStartPosition());
    });
  });
});

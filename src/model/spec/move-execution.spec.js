'use strict';

var assert = require('chai').assert,
  Chess = require('../chess');

describe('Move execution', function () {
  describe('silent move', function () {
    var chess;

    beforeEach(function () {
      var move;

      chess = Chess.createStartPosition();
      move = chess.createMove('e2-e3');
      move.execute();
    });

    it('source square should be empty after move execution', function () {
      var sourceSquare = chess.getSquareByName('e2');
      assert.isTrue(sourceSquare.isEmpty());
    });

    it('target square should be occupied', function () {
      var targetSquare = chess.getSquareByName('e3');
      assert.isTrue(targetSquare.isOccupied());
    });
  });

  describe('big pawn', function () {
    var chess;

    beforeEach(function () {
      chess = Chess.createStartPosition();
    });

    it('update en passant target square for white pawn', function () {
      var bigPawnMove = chess.createMove('e2-e4'),
        epTargetSquare = chess.getSquareByName('e3');

      bigPawnMove.execute();

      assert.strictEqual(chess.enPassantTargetSquare, epTargetSquare);
    });

    it('update en passant targetsquare for black pawn', function () {
      var bigPawnMove = chess.createMove('d7-d5'),
        epTargetSquare = chess.getSquareByName('d6');

      bigPawnMove.execute();

      assert.strictEqual(chess.enPassantTargetSquare, epTargetSquare);
    });
  });

  describe('capture', function () {
    var chess;

    beforeEach(function () {
      chess = new Chess();
    });

    it('replace captured piece on target square', function () {
      var whiteQueen = chess.placePiece('Q', 'd5'),
        targetSquare = chess.getSquareByName('f7'),
        capture = whiteQueen.createMove(targetSquare);

      chess.placePiece('p', 'f7');

      capture.execute();

      assert.strictEqual(targetSquare.piece, whiteQueen);
    });
  });
});

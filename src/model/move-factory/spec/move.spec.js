'use strict';

var assert = require('chai').assert,
  Chess = require('../../chess'),
  Move = require('../move');

describe('Move', function () {
  describe('#make()', function () {

    var chess, sourceSquare, targetSquare, move, piece;
    beforeEach(function () {
      chess = new Chess();
      piece = chess.placePiece('P', 'e2');
      sourceSquare = chess.getSquareByName('e2');
      targetSquare = chess.getSquareByName('e3');
      move = new Move(sourceSquare, targetSquare);
      move.make();
    });

    it('place moved piece on target square', function () {
      assert.strictEqual(targetSquare.piece, piece);
    });

    it('remove moved piece from source square', function () {
      assert.isTrue(sourceSquare.isEmpty());
    });

    it('toggle color', function () {
      assert.isTrue(chess.activeColor.isBlack());
    });

    it('push itself in history', function () {
      var lastMove = chess.history[chess.history.length - 1];
      assert.strictEqual(lastMove, move);
    });
  });

  describe('#unMake()', function () {
    var chess, sourceSquare, targetSquare, move, piece;

    beforeEach(function () {
      chess = new Chess();
      sourceSquare = chess.getSquareByName('d2');
      targetSquare = chess.getSquareByName('d3');
      piece = chess.placePiece('P', targetSquare.name);
      move = new Move(sourceSquare, targetSquare);
      move.unMake();
    });

    it('place moved piece to source square', function () {
      assert.strictEqual(sourceSquare.piece, piece);
    });

    it('remove moved piece from target square', function () {
      assert.isTrue(targetSquare.isEmpty());
    });

    it('toggle color', function () {
      assert.isTrue(chess.activeColor.isBlack());
    });

    it('remove itself from history', function () {
      var lastMove = chess.history[chess.history.length - 1];
      assert.notStrictEqual(lastMove, move);
    });
  });

  describe('#toSAN()', function () {
    it("pawn move name don't start with 'P'", function () {
      var chess = new Chess(),
        sourceSquare = chess.squares.e4,
        move,
        san;

      chess.placePiece('P', sourceSquare.name);
      move = new Move(sourceSquare, chess.squares.e5);

      san = move.toSAN();

      assert.notEqual(san.charAt(0), 'P');
    });

    it('SAN move name ends with target square name');

    'RNBQK'.split('').forEach(function (pieceToken) {
      it("SAN move name start with '" +
        pieceToken + "' for '" + pieceToken + "' piece");
    });
  });
});
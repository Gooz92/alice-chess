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
      move.make();
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

      bigPawnMove.make();

      assert.strictEqual(chess.enPassantTargetSquare, epTargetSquare);
    });

    it('update en passant target square for black pawn', function () {
      var bigPawnMove = chess.createMove('d7-d5'),
        epTargetSquare = chess.getSquareByName('d6');

      bigPawnMove.make();

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

      capture.make();

      assert.strictEqual(targetSquare.piece, whiteQueen);
    });
  });

  describe('white short castling', function () {
    var king, rook;

    beforeEach(function () {
      var chess = new Chess(), shortCastling;

      king = chess.placePiece('K', 'e1');
      rook = chess.placePiece('R', 'h1');

      shortCastling = king.createShortCastlingMove();

      shortCastling.make();
    });

    it('move rook to f1', function () {
      assert.strictEqual(rook.square.name, 'f1');
    });

    it('move king to g1', function () {
      assert.strictEqual(king.square.name, 'g1');
    });
  });

  describe('black short castling', function () {
    var king, rook;

    beforeEach(function () {
      var chess = new Chess(), shortCastling;

      king = chess.placePiece('k', 'e8');
      rook = chess.placePiece('r', 'h8');

      shortCastling = king.createShortCastlingMove();

      shortCastling.make();
    });

    it('move rook to f8', function () {
      assert.strictEqual(rook.square.name, 'f8');
    });

    it('move king to g8', function () {
      assert.strictEqual(king.square.name, 'g8');
    });
  });

  describe('white long castling', function () {
    var king, rook;

    beforeEach(function () {
      var chess = new Chess(), longCastling;

      king = chess.placePiece('K', 'e1');
      rook = chess.placePiece('R', 'a1');

      longCastling = king.createLongCastlingMove();

      longCastling.make();
    });

    it('move rook to d1', function () {
      assert.strictEqual(rook.square.name, 'd1');
    });

    it('move king to c1', function () {
      assert.strictEqual(king.square.name, 'c1');
    });
  });

  describe('black long castling', function () {
     var king, rook;

    beforeEach(function () {
      var chess = new Chess(), longCastling;

      king = chess.placePiece('k', 'e8');
      rook = chess.placePiece('r', 'a8');

      longCastling = king.createLongCastlingMove();

      longCastling.make();
    });

    it('move rook to d8', function () {
      assert.strictEqual(rook.square.name, 'd8');
    });

    it('move king to c8', function () {
      assert.strictEqual(king.square.name, 'c8');
    });
  });

  describe('update castling avalibility', function () {
    var chess;

    beforeEach(function () {
      chess = new Chess();

      chess.placePiece('K', 'e1');
      chess.placePiece('R', 'a1');
      chess.placePiece('R', 'h1');

      chess.placePiece('k', 'e8');
      chess.placePiece('r', 'a8');
      chess.placePiece('r', 'h8');
    });

    it('white short castling impossible after moving right rook', function () {
      chess.move('Rh5');
      assert.isFalse(chess.castlingAvalibility.w.k);
    });

    it('white long castling impossible after moving left rook', function () {
      chess.move('Ra6');
      assert.isFalse(chess.castlingAvalibility.w.q);
    });

    it('white castling impossible after moving white king', function () {
      chess.move('Ke2');
      assert.isFalse(chess.castlingAvalibility.w.q);
      assert.isFalse(chess.castlingAvalibility.w.k);
    });

    it('black castling impossible after moving black king', function () {
      chess.turn();
      chess.move('Kd8');
      assert.isFalse(chess.castlingAvalibility.b.q);
      assert.isFalse(chess.castlingAvalibility.b.k);
    });

    it('black short castling impossible after moving left rook', function () {
      chess.turn();
      chess.move('Rh6');
      assert.isFalse(chess.castlingAvalibility.b.k);
    });

    it('black long castling impossible after moving right rook', function () {
      chess.turn();
      chess.move('Ra5');
      assert.isFalse(chess.castlingAvalibility.b.q);
    });
  });
});

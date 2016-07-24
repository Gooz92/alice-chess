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
      var castlingRights;

      chess.move('Rh4');
      castlingRights = chess.generateFenCastlingRights();

      assert.strictEqual(castlingRights, 'Qkq');
    });

    it('white long castling impossible after moving left rook', function () {
      var castlingRights;

      chess.move('Ra3');
      castlingRights = chess.generateFenCastlingRights();
      assert.strictEqual(castlingRights, 'Kkq');
    });

    it('white castling impossible after moving white king', function () {
      var castlingRights;

      chess.move('Ke2');
      castlingRights = chess.generateFenCastlingRights();

      assert.strictEqual(castlingRights, 'kq');
    });

    it('black castling impossible after moving black king', function () {
      var castlingRights;

      chess.turn();
      chess.move('Kd7');
      castlingRights = chess.generateFenCastlingRights();

      assert.strictEqual(castlingRights, 'KQ');
    });

    it('black short castling impossible after moving left rook', function () {
      var castlingRights;

      chess.turn();
      chess.move('Rh5');
      castlingRights = chess.generateFenCastlingRights();

      assert.strictEqual(castlingRights, 'KQq');
    });

    it('black long castling impossible after moving right rook', function () {
      var castlingRights;

      chess.turn();
      chess.move('Ra3');
      castlingRights = chess.generateFenCastlingRights();

      assert.strictEqual(castlingRights, 'KQk');
    });
  });
});

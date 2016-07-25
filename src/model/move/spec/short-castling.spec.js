'use strict';

var ShortCastling = require('../short-castling'),
  Chess = require('../../chess'),
  squares = require('../../../utils/chess-utils/squares'),
  assert = require('chai').assert;

describe('ShortCastling', function () {

  var chess;
  beforeEach(function () {
    chess = new Chess();

    chess.place({
      a8: 'r', e8: 'k', h8: 'r',
      a1: 'R', e1: 'K', h1: 'R'
    });
  });

  describe('#make()', function () {
    describe('white', function () {
      var king, rook;
      beforeEach(function () {
        var shortCastling;

        king = chess.squares[squares.e1].piece;
        rook = chess.squares[squares.h1].piece;

        shortCastling = new ShortCastling(king, rook);

        shortCastling.make();
      });

      it('place king on g1', function () {
        assert.strictEqual(king.square.name, 'g1');
      });

      it('remove king from start position', function () {
        assert.isTrue(chess.squares[squares.e1].isEmpty());
      });

      it('place rook on f1', function () {
        assert.strictEqual(rook.square.name, 'f1');
      });

      it('remove rook from start position', function () {
        assert.isTrue(chess.squares[squares.h1].isEmpty());
      });

      it('update castling rights', function () {
        var fenCastlingRights = chess.generateFenCastlingRights();
        assert.strictEqual(fenCastlingRights, 'kq');
      });
    });

    describe('black', function () {
      var king, rook;
      beforeEach(function () {
        var shortCastling;

        king = chess.squares[squares.e8].piece;
        rook = chess.squares[squares.h8].piece;

        shortCastling = new ShortCastling(king, rook);

        shortCastling.make();
      });

      it('place king on g8', function () {
        assert.strictEqual(king.square.name, 'g8');
      });

      it('remove king from start position', function () {
        assert.isTrue(chess.squares[squares.e8].isEmpty());
      });

      it('place rook on f8', function () {
        assert.strictEqual(rook.square.name, 'f8');
      });

      it('remove rook from start position', function () {
        assert.isTrue(chess.squares[squares.h8].isEmpty());
      });

      it('update castling rights', function () {
        var fenCastlingRights = chess.generateFenCastlingRights();
        assert.strictEqual(fenCastlingRights, 'KQ');
      });
    });
  });

  describe('#unMake()', function () {
    describe('white', function () {
      var king, rook;
      beforeEach(function () {
        var shortCastling;

        king = chess.squares[squares.e1].piece;
        rook = chess.squares[squares.h1].piece;

        shortCastling = new ShortCastling(king, rook);

        shortCastling.make();
        shortCastling.unMake();
      });

      it('place king on start position', function () {
        assert.strictEqual(king.square.name, 'e1');
      });

      it('remove king from g1', function () {
        assert.isTrue(chess.squares[squares.g1].isEmpty());
      });

      it('place rook on start position', function () {
        assert.strictEqual(rook.square.name, 'h1');
      });

      it('remove rook from f1', function () {
        assert.isTrue(chess.squares[squares.f1].isEmpty());
      });
    });

    describe('black', function () {
      var king, rook;
      beforeEach(function () {
        var shortCastling;

        king = chess.squares[squares.e8].piece;
        rook = chess.squares[squares.h8].piece;

        shortCastling = new ShortCastling(king, rook);

        shortCastling.make();
        shortCastling.unMake();
      });

      it('place king on start position', function () {
        assert.strictEqual(king.square.name, 'e8');
      });

      it('remove king from g8', function () {
        assert.isTrue(chess.squares[squares.g8].isEmpty());
      });

      it('place rook on start position', function () {
        assert.strictEqual(rook.square.name, 'h8');
      });

      it('remove rook from f8', function () {
        assert.isTrue(chess.squares[squares.f8].isEmpty());
      });
    });

    it('restore castling rights', function () {
      var fenCastlingRights = chess.generateFenCastlingRights();
      assert.strictEqual(fenCastlingRights, 'KQkq');
    });
  });

  describe('#toSAN()', function () {
    it("return 'O-O'", function () {
      var king = chess.squares[squares.e1],
        rook = chess.squares[squares.h1],
        castling = new ShortCastling(king, rook);

      assert.strictEqual(castling.toSAN(), 'O-O');
    });
  });
});

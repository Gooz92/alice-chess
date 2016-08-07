'use strict';

var assert = require('chai').assert,
  Piece = require('../piece'),
  Color = require('../color'),
  Chess = require('../chess');

describe('Piece', function () {
  describe('#getFenToken()', function () {
    it('return uppercase token for white piece', function () {
      var piece = new Piece(Color.WHITE, {});
      piece.token = 'p';

      assert.strictEqual(piece.getFenToken(), 'P');
    });
  });

  describe('#create()', function () {
    it('create white piece for uppercase token', function () {
      var piece = Piece.create('R', {});

      assert.isTrue(piece.color.isWhite());
    });

    it('create black piece for lowercase token', function () {
      var piece = Piece.create('q', {});

      assert.isTrue(piece.color.isBlack());
    });
  });

  describe('#createMove()', function () {
    it.skip('create move with corresponding piece', function () {
      var chess = new Chess(),
        targetSquare = chess.getSquareByName('a3'),
        piece = chess.placePiece('N', 'b1'),
        move = piece.createMove(targetSquare);

      assert.strictEqual(move.piece, piece);
    });
  });

  describe('#moveTo()', function () {
    var chess;
    beforeEach(function () {
      chess = new Chess();
    });

    it('move piece to destination square', function () {
      var piece = chess.placePiece('P', 'e2'),
        destinationSquare = chess.getSquareByName('e4');

      piece.moveTo(destinationSquare);
      assert.equal(piece.square, destinationSquare);
    });

    it('remove piece from source square', function () {
      var piece = chess.placePiece('p', 'd7'),
        sourceSquare = piece.square,
        destinationSquare = chess.getSquareByName('d5');

      piece.moveTo(destinationSquare);

      assert.isUndefined(sourceSquare.piece);
    });
  });

  describe("#remove", function () {
    it('remove piece from square', function () {
      var chess = new Chess(),
        piece = chess.placePiece('P', 'e2'),
        square = piece.square;

      piece.remove();

      assert.isTrue(square.isEmpty());
    });
  });
});

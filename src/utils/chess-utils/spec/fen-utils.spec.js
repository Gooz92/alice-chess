'use strict';

var assert = require('chai').assert,
  fenUtils = require('../fen-utils');

describe('fenUtils', function () {
  describe('.isPieceToken()', function () {
    it('return true for white (uppercase) piece token', function () {
      var pieceTokens = 'PRNBQK'.split('');

      pieceTokens.forEach(function (token) {
        assert.isTrue(fenUtils.isPieceToken(token),
          "Token '" + token + "'' must be piece token");        
      });
    });

    it('return true for black (lowercase) piece token', function () {
      var pieceTokens = 'prnbqk'.split('');

      pieceTokens.forEach(function (token) {
        assert.isTrue(fenUtils.isPieceToken(token),
          "Token '" + token + "'' must be piece token");
      });
    });

    it('return false for not piece token', function() {
      var tokens = ['s', '', 'pawn'];

      tokens.forEach(function (token) {
        assert.isFalse(fenUtils.isPieceToken(token),
          "Token '" + token + "'' is not piece token");
      });
    });
  });

  describe('.isEmptySquaresToken()', function () {
    it('return true for empty square count token as string', function () {
      var emptySquaresCountTokens = '12345678'.split('');

      emptySquaresCountTokens.forEach(function (token) {
        assert.isTrue(fenUtils.isEmptySquaresToken(token),
          "Token '" + token + "'' must be empty squares count token");
      });
    });

    it('return true for empty square count token as number', function () {
      var squaresCount, ok;

      for (squaresCount = 1; squaresCount < 9; squaresCount++) {
        ok = fenUtils.isEmptySquaresToken(squaresCount);
        assert.isTrue(ok, "Token '" + squaresCount +
          "' must be empty squares count token");
      }
    });

    it('return false for not empty squares token', function () {
      var tokens = [-1, 0, 9, '0', '', '9', 'alice'];

      tokens.forEach(function (token) {
        assert.isFalse(fenUtils.isEmptySquaresToken(token),
          "Token '" + token + "'' is not empty squares count token");
      });
    });
  });

  describe('.isColorToken()', function() {
    it("return true for 'w' token", function() {
      assert.isTrue(fenUtils.isColorToken('w'));
    });

    it("return true for 'b' token", function () {
      assert.isTrue(fenUtils.isColorToken('b'));
    });

    it("return false if token is not 'w' or 'b'", function () {
      assert.isFalse(fenUtils.isColorToken('q'));
    });
  });

  describe('.isCastlingToken()', function () {
    it("return true for castling token", function () {
      var tokens = 'KQkq'.split('');

      tokens.forEach(function (token) {
        assert.isTrue(fenUtils.isCastlingToken(token),
          "Token '" + token + "'' must be castling token");
      });
    });

    it('return false for not castling token', function () {
      assert.isFalse(fenUtils.isCastlingToken('p'));
    });
  });

   describe('.isEnPassantSquareToken()', function () {
    it('return true for squares in rank 3 or 6', function () {
      var squareNames = [
        'a3', 'e3', 'h3',
        'a6', 'd6', 'h6'
      ];

      squareNames.forEach(function (squareName) {
        assert.isTrue(fenUtils.isEnPassantSquareToken(squareName),
          "Square with name '" + squareName + "'' can be en passant square");
      });
    });

    it('return false for squares in ranks different from 3 or 6', function () {
      var squareNames = [
        'a2', 'd2', 'h1',
        'a4', 'e5', 'h4',
        'a5', 'd7', 'h7'
      ];

      squareNames.forEach(function (squareName) {
        assert.isFalse(fenUtils.isEnPassantSquareToken(squareName),
          "Square with name '" + squareName + "'' can't be en passant square");
      });
    });

    it('return false for not square name', function () {
      var tokens = ['a', 'p', 'queen', 'alice', ''];

      tokens.forEach(function (token) {
        assert.isFalse(fenUtils.isEnPassantSquareToken(token),
          "'" + token + "' is not square name");
      });
    });

    it("return true for '-' token", function () {
      assert.isTrue(fenUtils.isEnPassantSquareToken('-'));
    });
  });

  describe('.colorNameFromPieceToken()', function () {
    it("return 'white' color name for uppercase fen piece token", function () {
      var colorName = fenUtils.colorNameFromPieceToken('P');
      assert.strictEqual(colorName, 'white');
    });

    it("return 'black' color name for lowercase fen piece token", function () {
      var colorName = fenUtils.colorNameFromPieceToken('p');
      assert.strictEqual(colorName, 'black');
    });
  });
});

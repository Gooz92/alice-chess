'use strict';

const assert = require('chai').assert,
  Chess = require('../../chess'),
  Move = require('../move');

describe('Move', () => {

  describe('#make()', function () {

    var chess, sourceSquare, targetSquare, move, piece;
    beforeEach(function () {
      chess = new Chess();
      piece = chess.placePiece('P', 'e2');
      sourceSquare = chess.squares.e2;
      targetSquare = chess.squares.e3;
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
  });

  describe('#unMake()', function () {
    var chess, sourceSquare, targetSquare, move, piece;

    beforeEach(function () {
      chess = new Chess();
      sourceSquare = chess.squares.d2;
      targetSquare = chess.squares.d3;
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

    it.skip('set previous move', function () {
      assert.notStrictEqual(chess.previousMove, move.previousMove);
    });
  });

  describe('#toSAN()', function () {
    var chess;
    beforeEach(function () {
      chess = new Chess();
    });

    it("pawn move name don't start with 'P'", function () {
      var sourceSquare = chess.squares.e4,
        targetSquare = chess.squares.e5,
        move, san;

      chess.placePiece('P', sourceSquare.name);

      move = new Move(sourceSquare, targetSquare);
      san = move.toSAN();

      assert.notEqual(san.charAt(0), 'P');
    });

    it('SAN ends with target square name', function () {
      var sourceSquare = chess.squares.f4,
        targetSquare = chess.squares.c1,
        move, san;

      chess.placePiece('Q', sourceSquare.name);
      move = new Move(sourceSquare, targetSquare);

      san = move.toSAN();

      assert.match(san, new RegExp(targetSquare.name));
    });

    it('pawn SAN silent move is just target square name', function () {
      var sourceSquare = chess.squares.d4,
        targetSquare = chess.squares.d5,
        move, san;

      chess.placePiece('P', sourceSquare.name);
      move = new Move(sourceSquare, targetSquare);

      san = move.toSAN();

      assert.strictEqual(san, targetSquare.name);
    });

    it("Rook move SAN starts with 'R'", function () {
      var sourceSquare = chess.squares.b2,
        targetSquare = chess.squares.b7,
        move, san;

      chess.placePiece('R', sourceSquare.name);
      move = new Move(sourceSquare, targetSquare);

      san = move.toSAN();

      assert.match(san, /^R/);
    });

    it("Knight move starts with 'N'", function () {
      var sourceSquare = chess.squares.g1,
        targetSquare = chess.squares.h3,
        move, san;

      chess.placePiece('N', sourceSquare.name);
      move = new Move(sourceSquare, targetSquare);

      san = move.toSAN();

      assert.match(san, /^N/);
    });

    it("Bishop move starts with 'B'", function () {
      var sourceSquare = chess.squares.e4,
        targetSquare = chess.squares.g2,
        move, san;

      chess.placePiece('B', sourceSquare.name);
      move = new Move(sourceSquare, targetSquare);

      san = move.toSAN();

      assert.match(san, /^B/);
    });

    it("Queen move starts with 'Q'", function () {
      var sourceSquare = chess.squares.f4,
        targetSquare = chess.squares.f8,
        move, san;

      chess.placePiece('Q', sourceSquare.name);
      move = new Move(sourceSquare, targetSquare);

      san = move.toSAN();

      assert.match(san, /^Q/);
    });

    it("King move starts with 'K'", function () {
      var sourceSquare = chess.squares.e1,
        targetSquare = chess.squares.e2,
        move, san;

      chess.placePiece('K', sourceSquare.name);
      move = new Move(sourceSquare, targetSquare);

      san = move.toSAN();

      assert.match(san, /^K/);
    });

    it("add unambiguous file if move.disambiguateFile is true", function () {
      var sourceSquare = chess.squares.e5,
        targetSquare = chess.squares.c3,
        pieceToken = 'B',
        expectedSan = [
          pieceToken,
          sourceSquare.fileName,
          targetSquare.name
        ].join(''),
        move, san;

      chess.placePiece(pieceToken, sourceSquare.name);
      move = new Move(sourceSquare, targetSquare);

      move.disambiguateFile = true;

      san = move.toSAN();

      assert.strictEqual(san, expectedSan);
    });

    it("add unambiguous rank if move.disambiguateRank is true", function () {
      var sourceSquare = chess.squares.d5,
        targetSquare = chess.squares.a2,
        pieceToken = 'Q',
        expectedSan = [
          pieceToken,
          sourceSquare.rankName,
          targetSquare.name
        ].join(''),
        move, san;

      chess.placePiece(pieceToken, sourceSquare.name);
      move = new Move(sourceSquare, targetSquare);

      move.disambiguateRank = true;

      san = move.toSAN();

      assert.strictEqual(san, expectedSan);
    });

   it('add rank and file if both disambiguate options is true', function () {
     var sourceSquare = chess.squares.b3,
        targetSquare = chess.squares.d2,
        pieceToken = 'N',
        expectedSan = [
          pieceToken,
          sourceSquare.fileName,
          sourceSquare.rankName,
          targetSquare.name
        ].join(''),
        move, san;

      chess.placePiece(pieceToken, sourceSquare.name);
      move = new Move(sourceSquare, targetSquare);

      move.disambiguateRank = true;
      move.disambiguateFile = true;

      san = move.toSAN();

      assert.strictEqual(san, expectedSan);
    });
  });
});
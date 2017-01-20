'use strict';

var Capture = require('../capture'),
  Chess = require('../../chess'),
  assert = require('chai').assert;

describe('Capture', function () {
  describe('#make()', function () {
    it('remove captured piece', function () {
      var chess = new Chess(),
        sourceSquare = chess.squares.b8,
        targetSquare = chess.squares.a6,
        capturedPiece,
        capture;

      chess.placePiece('n', sourceSquare.name);
      capturedPiece = chess.placePiece('P', targetSquare.name);

      capture = new Capture(sourceSquare, targetSquare);
      capture.make();

      assert.notInclude(chess.pieces[capturedPiece.color.index], capturedPiece);
    });
  });

  describe('#unMake()', function () {
    it('place captured piece on target square', function () {
       var chess = new Chess(),
        sourceSquare = chess.squares.e4,
        targetSquare = chess.squares.d5,
        capturedPiece,
        capture;

      chess.placePiece('P', sourceSquare.name);
      capturedPiece = chess.placePiece('p', targetSquare.name);

      capture = new Capture(sourceSquare, targetSquare);
      capture.make();
      capture.unMake();

     assert.strictEqual(targetSquare.piece, capturedPiece);
     assert.include(chess.pieces[capturedPiece.color.index], capturedPiece);
    });
  });

  describe('#toSAN()', function () {
    var chess;
    beforeEach(function () {
      chess = new Chess();
    });

    it("add 'x' before target square name by default", function () {
      var sourceSquare = chess.squares.c3,
        targetSquare = chess.squares.d5,
        capture, san;

      chess.placePiece('N', sourceSquare.name);
      chess.placePiece('p', targetSquare.name);

      capture = new Capture(sourceSquare, targetSquare);
      san = capture.toSAN();

      assert.match(san, new RegExp('x' + targetSquare.name + '$'));
    });

    it("don't add 'x' if notes.capture is false", function () {
      var sourceSquare = chess.squares.a3,
        targetSquare = chess.squares.h3,
        capture, san;

      chess.placePiece('R', sourceSquare.name);
      chess.placePiece('p', targetSquare.name);

      capture = new Capture(sourceSquare, targetSquare);

      san = capture.toSAN({
        notes: {
          capture: false
        }
      });

      assert.notInclude(san, 'x');
    });
  });
});

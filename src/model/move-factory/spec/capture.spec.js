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

      assert.notInclude(chess.pieces[capturedPiece.color.name], capturedPiece);
    });
  });

  describe('#unMake()', function () {
    it('place captured piece on target square');

  describe('#toSAN()', function () {
    it("add 'x' before target square name by default");
    it("don't add 'x' if flag.capture is false");
  });
});

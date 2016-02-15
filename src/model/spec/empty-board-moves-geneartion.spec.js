'use strict';

var assert = require('chai').assert,
  Chess = require('../chess'),
  testData = require('./data/empty-board-moves-generation');

describe('Empty board moves', function () {
  var pieces = Object.keys(testData);
  pieces.forEach(testPieceMoves);

  function testPieceMoves(pieceToken) {
    describe('generate correct moves for ' + pieceToken, function () {
      var squares = testData[pieceToken];

      Object.keys(squares).forEach(function (square) {
        it('placed on ' + square, function () {
          var moves = squares[square],
            chess = new Chess(),
            piece = chess.placePiece(pieceToken, square),
            generatedMoves = piece.generateTargetSquareNames();

          assert.sameMembers(generatedMoves, moves);
        });
      });
    });
  }
});
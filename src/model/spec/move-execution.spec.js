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
      move.execute();
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
});

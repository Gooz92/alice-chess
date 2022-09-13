'use strict';

var assert = require('chai').assert,
  Chess = require('../chess');

describe('King', function () {
  describe('#generateTargetSquareNames()', function () {

    var chess;
    beforeEach(function () {
      chess = new Chess();
    });

    it('white king can not move to square under attack', function () {
      var whiteKing = chess.placePiece('K', 'd4'),
        targetSquareNames;

      chess.placePiece('r', 'e8');
      chess.placePiece('Q', 'd2');

      targetSquareNames = whiteKing.generateTargetSquareNames();

      assert.sameMembers(targetSquareNames, [
        'd5', 'd3',
        'c5', 'c4', 'c3'
      ]);
    });

    it('black king can not move to square under attack', function () {
      var blackKing = chess.placePiece('k', 'e5'),
        targetSquareNames;

      chess.turn();

      chess.placePiece('B', 'g5');
      chess.placePiece('r', 'd7');

      targetSquareNames = blackKing.generateTargetSquareNames();

      assert.sameMembers(targetSquareNames, [
        'd6', 'e6',
        'd5', 'f5',
        'd4', 'e4'
      ]);
    });
  });
});
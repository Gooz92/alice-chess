'use strict';

var throws = require('chai').assert.throws,
  chessAssertion = require('../chess-assertion');

describe('chessAssertion', function () {
  describe('.isSquareName()', function () {
    var isSquareName = chessAssertion.isSquareName;

    it('do nothing if square name is valid', function () {
      isSquareName('e3');
    });

    it('throw error if square name is invalid', function () {
      var invalidSquareName = 'h9';

      throws(function () {
        isSquareName(invalidSquareName);
      }, invalidSquareName);
    });
  });

  describe('.isPieceToken()', function () {
    var isPieceToken = chessAssertion.isPieceToken;

    it('do nothing id piece token is valid', function () {
      var whitePawn = 'P';
      isPieceToken(whitePawn);
    });

    it('throw error if piece token is invalid', function () {
      var invalidPieceToken = 'm';

      throws(function () {
        isPieceToken(invalidPieceToken);
      }, invalidPieceToken);
    });
  });
});

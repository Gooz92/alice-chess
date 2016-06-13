'use strict';

var fenSerializationMixin = require('../fen-serialization-mixin'),
  castlingUtils = require('../../utils/chess-utils/castling-rights-utils'),
  assert = require('chai').assert,
  sinon = require('sinon');

describe('fenSerializationMixin', function () {
  describe('generateFenCastlingAvailability()', function () {

    it('toFenField called with chess.castlingRights', function () {
      var getFenCastling = fenSerializationMixin.generateFenCastlingAvailability,
        chess = {
          castlingRights: 7
        };

      castlingUtils.toFenField = sinon.spy();
      chess.generateFenCastlingAvailibility = getFenCastling;
      chess.generateFenCastlingAvailibility();

      assert.isTrue(castlingUtils.toFenField.calledWith(chess.castlingRights));
    });
  });
});

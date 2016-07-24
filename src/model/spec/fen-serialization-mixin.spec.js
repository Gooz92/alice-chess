'use strict';

var fenSerializationMixin = require('../fen-serialization-mixin'),
  castlingUtils = require('../../utils/chess-utils/castling-rights-utils'),
  assert = require('chai').assert,
  sinon = require('sinon'),
  Chess = require('../chess');

describe('fenSerializationMixin', function () {
  describe('generateFenCastlingRights()', function () {
    it('toFenField called with chess.castlingRights');
  });

  describe('.generateFenRank()', function () {
    Chess.prototype.generateFenRank = fenSerializationMixin.generateFenRank;

    it("return '8' for empty rank", function () {
      var chess = new Chess();
      assert.strictEqual(chess.generateFenRank(0), '8');
    });

    it("return 'rnbqkbnr' for eighth rank on start position", function () {
      var chess = Chess.createStartPosition();
      assert.strictEqual(chess.generateFenRank(7), 'rnbqkbnr');
    });

    it("return '4P3' for fourth rank after king's pawn move", function () {
      var chess = Chess.createStartPosition();
      chess.move('e4');
      assert.strictEqual(chess.generateFenRank(3), '4P3');
    });
  });

  // describe('.generatePiecePlacement()');
});

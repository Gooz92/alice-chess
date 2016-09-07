'use strict';

var Chess = require('../chess'),
  asciiSerializationMixin = require('../ascii-serialization-mixin'),
  objectUtils = require('../../utils/common-utils/object-utils'),
  assert = require('chai').assert;


describe('asciiSerializationMixin', function () {
  var chess = Chess.createStartPosition();

  objectUtils.extend(chess, asciiSerializationMixin);

  describe('#generateAsciiRank()', function () {
    it('generate ascii representation of rank with given index', function () {
      var rank = chess.generateAsciiRank(0);
      assert.strictEqual(rank, '1 | R  N  B  Q  K  B  N  R | 1');
    });
  });
});
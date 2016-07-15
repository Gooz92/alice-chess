'use strict';

var PiecePlacementParser = require('../piece-placement-parser'),
  assert = require('chai').assert;

describe('PiecePlacementParser', function () {
  describe('#parse()', function () {
    it('throw error if ranks number not equal to 8', function () {
      var parser = new PiecePlacementParser(),
        invalidPiecePlacement = 'rnbqkbnr/pppppppp/8/8/4P3/PPPP1PPP/RNBQKBNR';

      assert.throws(function () {
        parser.parse(invalidPiecePlacement);
      });
    });
  });
});

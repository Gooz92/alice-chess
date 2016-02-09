'use strict';

var assert = require('chai').assert,
  FenParser = require('../fen-parser');

describe('FenParser default behaviuor', function () {
  var parser;

  beforeEach(function () {
    parser = new FenParser();
  });

  describe('#parsePiecePlacement()', function () {
    var startPiecePlacement = [
      'rnbqkbnr',
      'pppppppp',
      8, 8, 8, 8,
      'PPPPPPPP',
      'RNBQKBNR'
     ].join('/');

    it('return array with length = 8', function () {
      var board = parser.parsePiecePlacement(startPiecePlacement);
      assert.isArray(board);
      assert.equal(board.length, 8);
    });
  });

  describe('#parseRank()', function () {
    it('return [] for empty rank', function () {
      var emptyRank = parser.parseRank('8');
      assert.deepEqual(emptyRank, []);
    });

    it('correct parse rank with pieces and empty squares', function () {
      var rank = new Array(8);

      rank[1] = 'n';
      rank[4] = 'b';

      assert.deepEqual(parser.parseRank('1n2b3'), rank);
    });
  });

  describe('#parseActiveColor()', function () {
    it("return 'white' for 'w' token", function () {
      var colorName = parser.parseActiveColor('w');
      assert.deepEqual(colorName, 'white');
    });
  });

  describe('#parseCastlingAvailability()', function () {
    it("parse '-' token", function () {
      var castling = parser.parseCastlingAvailability('-');

      var noNeitherSideCastling = {
        K: false,
        Q: false,
        k: false,
        q: false
      };

      assert.deepEqual(castling, noNeitherSideCastling);
    });
  });
});

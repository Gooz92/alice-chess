'use strict';

var RankParser = require('../rank-parser'),
  assert = require('chai').assert;

describe('RankParser', function () {
  describe('#parse()', function () {
    var parser;
    beforeEach(function () {
      parser = new RankParser();
    });

    it('throw error if parsed rank length less than 8', function () {
      var shortRank = 'p3p';

      assert.throws(function () {
        parser.parse(shortRank);
      }, shortRank);
    });

    it('throw error if parsed rank length great than 8', function () {
      var longRank = '3n5';

      assert.throws(function () {
        parser.parse(longRank);
      }, longRank);
    });

    it('throw error if parsed rank contains illegal characters', function () {
      var invalidRank = 'prnbqkbna';

      assert.throws(function () {
        parser.parse(invalidRank);
      }, 'a');
    });
  });
});

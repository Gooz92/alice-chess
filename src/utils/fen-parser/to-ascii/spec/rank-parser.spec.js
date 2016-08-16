'use strict';

var RankParser = require('../to-ascii-rank-parser'),
  assert = require('chai').assert;

describe('ToAsciiRankParser', function () {
  describe('#parse()', function () {
    it('use RankParser.defaultEmptySquareToken by default');
    it("insert use emptySquareToken from options");
    it("don't insert gaps by default");
    it('insert single space gaps if gap options is true');
    it("don't insert gaps if gap option is false");
    it("don't insert gaps if gap option is 0");
    it('insert single space gaps if gap options is 1');
    it('insert two space gaps if gap options is 2');
  });
});

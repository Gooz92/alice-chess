'use strict';

var sinon = require('sinon'),
  assert = require('chai').assert,
  FenParser = require('../fen-parser');

describe('FenParser', function () {
  describe('#parsePiecePlacement()', function () {
    var startPiecePlacement = [
      'rnbqkbnr',
      'pppppppp',
      8, 8, 8, 8,
      'PPPPPPPP',
      'RNBQKBNR'
     ];

    it('invoke parseRank eightfold', function () {
      var parser = new FenParser();

      parser.parseRank = sinon.spy();
      parser.parsePiecePlacement(startPiecePlacement.join('/'));

      assert.strictEqual(parser.parseRank.callCount, 8);
    });

    startPiecePlacement.forEach(function (rank, index) {
      it(index + 'th parseRank call with ' + index + ' th rank', function () {
        var parser = new FenParser();
        parser.parseRank = sinon.spy();
        parser.parsePiecePlacement(startPiecePlacement.join('/'));

        var call = parser.parseRank.getCall(index);
        call.calledWith(rank);
      });
    });
  });
});

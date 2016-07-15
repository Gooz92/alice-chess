'use strict';

var PiecePlacementParser = require('../piece-placement-parser'),
  assert = require('chai').assert,
  sinon = require('sinon');

describe('PiecePlacementParser', function () {
  describe('#parse()', function () {
    describe('onStart', function () {
      it('take not parsed piece placement as single argument', function () {
        var onStart = sinon.spy(),
          parser = new PiecePlacementParser({
            onStart: onStart
          }),
          piecePlacement = 'rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR';

        parser.parse(piecePlacement);

        assert.isTrue(onStart.calledWith(piecePlacement));
      });
    });

    describe('#rankParser', function () {
      describe('#parse()', function () {
        it('called for every rank', function () {
          var piecePlacementParser = new PiecePlacementParser(),
            piecePlacement = 'rnbqkbnr/pp1ppppp/8/2p5/4P3/5N2/PPPP1PPP/RNBQKB1R',
            parseRank = sinon.spy(),
            ranks = piecePlacement.split('/');

          piecePlacementParser.rankParser.parse = parseRank;

          piecePlacementParser.parse(piecePlacement);

          // TODO dynamic generate it ?
          ranks.forEach(function (rank, index) {
            assert.strictEqual(parseRank.getCall(index).args[0], rank);
          });
        });
      });
    });
  });
});

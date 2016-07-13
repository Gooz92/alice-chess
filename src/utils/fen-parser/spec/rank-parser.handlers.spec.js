'use strict';

var RankParser = require('../rank-parser'),
  assert = require('chai').assert,
  sinon = require('sinon');

describe('RankParser', function () {
  describe('#parse()', function () {
    describe('onStart', function () {
      it('take not parsed rank as argument', function () {
        var onStart = sinon.spy(),
          parser = new RankParser({
            onStart: onStart
          }),
          rank = 'rnbqkbnr';

        parser.parse(rank);

        assert.isTrue(onStart.calledWith(rank));
      });
    });

    describe('onPieceToken', function () {
      var parser, onPieceToken;

      beforeEach(function () {
        onPieceToken = sinon.spy();

        parser = new RankParser({
          onPieceToken: onPieceToken
        });
      });

      it('called for every piece token in rank', function () {
        parser.parse('r2N2b1'); // r--N--b-

        assert.strictEqual(onPieceToken.callCount, 3);

        assert.strictEqual(onPieceToken.firstCall.args[0], 'r');
        assert.strictEqual(onPieceToken.secondCall.args[0], 'N');
        assert.strictEqual(onPieceToken.thirdCall.args[0], 'b');
      });

      it('take file index as second argument', function () {
        /*
         * --p--Q--
         * 01234567
         */
        parser.parse('2p2Q2');

        assert.strictEqual(onPieceToken.firstCall.args[1], 2);
        assert.strictEqual(onPieceToken.secondCall.args[1], 5);
      });
    });

    describe('onEmptySquaresCount', function () {
      it('called for every empty squares token in rank', function () {
        var onEmptySquaresCount = sinon.spy(),
          parser = new RankParser({
            onEmptySquaresCount: onEmptySquaresCount
          });

        parser.parse('4p3');

        assert.strictEqual(onEmptySquaresCount.firstCall.args[0], 4);
        assert.strictEqual(onEmptySquaresCount.secondCall.args[0], 3);
      });
    });

    describe('onEmptySquare', function () {
      var parser, onEmptySquare;

      beforeEach(function () {
        onEmptySquare = sinon.spy();

        parser = new RankParser({
          onEmptySquare: onEmptySquare
        });
      });

      it('called for every empty square in rank', function () {
        parser.parse('2N5');
        assert.strictEqual(onEmptySquare.callCount, 7);
      });

      it('take empty square file index as single argument', function () {
        /*
         * --pppp-p
         * 01234567
         */
        parser.parse('2pppp1p');
        assert.deepEqual(onEmptySquare.firstCall.args, [0]);
        assert.deepEqual(onEmptySquare.secondCall.args, [1]);
        assert.deepEqual(onEmptySquare.thirdCall.args, [6]);
      });
    });
  });
});

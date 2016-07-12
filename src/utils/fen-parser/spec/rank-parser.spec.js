'use strict';

var RankParser = require('../rank-parser'),
  assert = require('chai').assert,
  sinon = require('sinon');

describe('RankParser', function () {

  describe('#parse()', function () {
    var handlers, parser;

    beforeEach(function () {
      handlers = {
        onStart: sinon.spy(),
        onPiece: sinon.spy(),
        onEmptySquare: sinon.spy(),
        onEmptySquares: sinon.spy(),
        onEnd: sinon.spy()
      };

      parser = new RankParser(handlers);
    });

    describe('onStart', function () {
      it('called before parsing', function () {
        parser.parse('PPPP1PPP');
        assert.isTrue(handlers.onStart.calledBefore(handlers.onPiece));
        assert.isTrue(handlers.onStart.calledBefore(handlers.onEmptySquare));
        assert.isTrue(handlers.onStart.calledBefore(handlers.onEmptySquares));
        assert.isTrue(handlers.onStart.calledBefore(handlers.onEnd));
      });
    });

    describe('onPiece', function () {
      it('called for every piece token in rank', function () {
        parser.parse('r1N1b1qK');
        assert.strictEqual(handlers.onPiece.getCall(0).args[0], 'r');
        assert.strictEqual(handlers.onPiece.getCall(1).args[0], 'N');
        assert.strictEqual(handlers.onPiece.getCall(2).args[0], 'b');
        assert.strictEqual(handlers.onPiece.getCall(3).args[0], 'q');
        assert.strictEqual(handlers.onPiece.getCall(4).args[0], 'K');
      });

      it('take file index as second argument');
    });

    describe('onEmptySquare', function () {
      it('called for every empty square in rank');
    });

     describe('onEmptySquares', function () {
      it('called for every empty squares token in rank');
    });
  });
});


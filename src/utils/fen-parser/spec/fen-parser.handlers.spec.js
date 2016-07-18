'use strict';

var FenParser = require('../fen-parser'),
  assert = require('chai').assert,
  sinon = require('sinon');

describe('FenParser', function () {
  describe('#parse()', function () {
    describe('onStart', function () {
      it('take not parsed fen as argument', function () {
        var fen = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
          onStart = sinon.spy(),
          parser = new FenParser({
            onStart: onStart
          });

        parser.parse(fen);

        assert.strictEqual(onStart.firstCall.args[0], fen);
      });
    });

    describe('onActiveColor', function () {
      it('take active color token as argument', function () {
        var fen = 'rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq e3 0 1',
          onActiveColor = sinon.spy(),
          parser = new FenParser({
            onActiveColor: onActiveColor
          });

        parser.parse(fen);

        assert.isTrue(onActiveColor.calledWith('b'));
      });
    });

    describe('onWhiteActiveColor', function () {
      it('called if active color is white', function () {
        var fen = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
          onWhiteActiveColor = sinon.spy(),
          parser = new FenParser({
            onWhiteActiveColor: onWhiteActiveColor
          });

        parser.parse(fen);

        assert.isTrue(onWhiteActiveColor.called);
      });
    });

    describe('onBlackActiveColor', function () {
      it('called if active color is black', function () {
        var fen = 'rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq e3 0 1',
          onBlackActiveColor = sinon.spy(),
          parser = new FenParser({
            onBlackActiveColor: onBlackActiveColor
          });

        parser.parse(fen);

        assert.isTrue(onBlackActiveColor.called);
      });
    });

    describe('onEnPassantTargetSquare', function () {
      it('take en passant target square name as argument', function () {
        var fen = 'rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq e3 0 1',
          onEnPassantTargetSquare = sinon.spy(),
          parser = new FenParser({
            onEnPassantTargetSquare: onEnPassantTargetSquare
          });

        parser.parse(fen);

        assert.strictEqual(onEnPassantTargetSquare.firstCall.args[0], 'e3');
      });
    });

    describe('onHalfmoveClock', function () {
      it('take halfmove clock as argument');
    });

    describe('onFullMoveNumber', function () {
      it('take fullmove number as argument');
    });
  });
});

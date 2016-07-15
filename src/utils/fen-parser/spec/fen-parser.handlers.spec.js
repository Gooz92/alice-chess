'use strict';

var FenParser = require('../fen-parser');

describe('FenParser', function () {
  describe('#parse()', function () {
    describe('onStart', function () {
      it('take not parsed fen as argument')
    });

    describe('onActiveColor', function () {
      it('take active color as argument');
    });

    describe('onWhiteActiveColor', function () {
      it('called if active color is white');
    });

    describe('onBlackActiveColor', function () {
      it('called if active color is black');
    });

    describe('onEnPassantTargetSquare', function () {
      it('take en passant target square name as argument');
    });

    describe('onHalfmoveClock', function () {
      it('take halfmove clock as argument');
    });

    describe('onFullMoveNumber', function () {
      it('take fullmove number as argument');
    });
  });
});

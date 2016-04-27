'use strict';

var assert = require('chai').assert,
  Chess = require('../chess');

describe('Move', function () {
  describe('#make()', function () {
    it('move piece to target square');
    it('save previous e.p. target square');
    it('toggle color');
    it('push itself in history');
  });

  describe('#unMake', function () {
    it('move piece to source square');
    it('restore prveious e.p. target square');
    it('toggle color');
    it('remove itself from history');
  });

  describe('#toSan()', function () {
    it("pawn SAN move name don't start with 'p'");
    it('SAN move name ends with target square name');

    'RNBQK'.split('').forEach(function (pieceToken) {
      it("SAN move name start with '" +
        pieceToken + "' for '" + pieceToken + "' piece");
    });
  });
});
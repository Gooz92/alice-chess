'use strict';

var LongCastling = require('../long-castling'),
  Chess = require('../../chess'),
  squares = require('../../../utils/chess-utils/squares'),
  assert = require('chai').assert;

describe('LongCastling', function () {
  var chess;
  beforeEach(function () {
    chess = new Chess();

    chess.place({
      a8: 'r', e8: 'k', h8: 'r',
      a1: 'R', e1: 'K', h1: 'R'
    });
  });

  describe('#make()', function () {
    describe('white', function () {
      it('place king on c1');
      it('remove king from start position');

      it('place rook on d1');
      it('remove rook from start position');

      it('update castling rights');
    });

    describe('black', function () {
      it('place king on c8');
      it('remove king from start position');

      it('place rook on d8');
      it('remove rook from start position');

      it('update castling rights');
    });
  });

  describe('#unMake()', function () {
    describe('white', function () {
      it('place king on start position');
      it('place rook on start position');
    });

    describe('black', function () {

    });
  });
});
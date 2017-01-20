'use strict';

var isMayAttacked = require('../is-may-attacked'),
  squares = require('../squares'),
  assert = require('chai').assert;


describe('.isMayAttacked()', function () {
  it('return true for square attacked by white pawn', function () {
    assert.isTrue(isMayAttacked(squares.e4, squares.d5, 'P'));
  });

  it('return false for square not attacked by white pawn', function () {
    assert.isFalse(isMayAttacked(squares.e4, squares.e5, 'P'));
  });

  it('return true for square attacked by black pawn', function () {
    assert.isTrue(isMayAttacked(squares.e5, squares.d4, 'p'));
  });

  it('return false for square not attacked by black pawn', function () {
    assert.isFalse(isMayAttacked(squares.e4, squares.d5, 'p'));
  });
});
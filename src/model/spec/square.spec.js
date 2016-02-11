'use strict';

var assert = require('chai').assert,
  Square = require('../square.js'),
  Color = require('../color');

describe('Square', function () {
  var square;

  beforeEach(function () {
    square = new Square();
  });

  describe('.fromName()', function () {
    it("create square with index 0 from name 'a1'", function () {
      var square = Square.fromName('a1');
      assert.strictEqual(square.index, 0);
    });

    it("create square with index 112 from name 'a8'", function () {
      var square = Square.fromName('a8');
      assert.strictEqual(square.index, 112);
    });

    it("create square with index 119 from name 'h8'", function () {
      var square = Square.fromName('h8');
      assert.strictEqual(square.index, 119);
    });

    it("create square with index 67 for name 'd5'", function () {
      var square = Square.fromName('d5');
      assert.strictEqual(square.index, 67);
    });

    it('set chess object new square', function () {
      var chess = {},
        square = Square.fromName('e3', chess);

      assert.strictEqual(square.chess, chess);
    });
  });

  describe('#isOccupied()', function () {
    it("return true if property 'piece' is not null or undefined", function () {
      square.piece = 'pawn';
      assert.isTrue(square.isOccupied());
    });

    it('return false for new square', function () {
      assert.isFalse(square.isOccupied());
    });

    it("return false if property 'piece' is null", function () {
      square.piece = null;
      assert.isFalse(square.isOccupied());
    });

    it("return false if property 'piece' is undefined", function () {
      square.piece = void 0;
      assert.isFalse(square.isOccupied());
    });
  });

  describe('#isEmpty()', function () {
    it('return true for new square', function () {
      assert.isTrue(square.isEmpty());
    });
  });

  describe('#isOccupiedByOpponent()', function () {
    it('return true if square occupied by opponent piece', function () {
      var playerColor = Color.WHITE,
        opponentColor = playerColor.toggle();

      square.piece = {
        color: opponentColor
      };

      assert.isTrue(square.isOccupiedByOpponent(playerColor));
    });

    it('return false if square occupied by player piece', function () {
      var playerColor = Color.WHITE;

      square.piece = {
        color: playerColor
      };

      assert.isFalse(square.isOccupiedByOpponent(playerColor));
    });
  });
});

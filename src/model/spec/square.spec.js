'use strict';

var assert = require('chai').assert,
  Square = require('../square.js'),
  Color = require('../color');

describe('Square', function () {
  var square;

  beforeEach(function () {
    square = new Square();
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

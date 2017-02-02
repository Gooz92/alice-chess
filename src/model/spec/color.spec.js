'use strict';

var assert = require('chai').assert,
  Color = require('../color');

describe('Color', function () {

  describe('#constructor', function () {
    it('throw error', function () {
      var createColor = function () {
        return new Color('white');
      };

      assert.throws(createColor);
    });
  });

  describe('#isWhite()', function () {
    it('return true for Color.WHITE', function () {
      var color = Color.WHITE;
      assert.isTrue(color.isWhite());
    });

    it('return false for Color.BLACK', function () {
      var color = Color.BLACK;
      assert.isFalse(color.isWhite());
    });
  });

  describe('#isBlack()', function() {
    it('return true for Color.BLACK', function () {
      var color = Color.BLACK;
      assert.isTrue(color.isBlack());
    });

    it('return false for Color.WHITE', function () {
      var color = Color.WHITE;
      assert.isFalse(color.isBlack());
    });
  });

  describe('#toggle()', function () {
    it('return Color.WHITE for Color.BLACK', function () {
      var white = Color.BLACK.toggle();
      assert.equal(white, Color.WHITE);
    });

    it('return Color.BLACK for Color.WHITE', function () {
      var black = Color.WHITE.toggle();
      assert.equal(black, Color.BLACK);
    });
  });

  describe('.getByName()', function() {
    it("return Color.WHITE for 'white'", function () {
      var color = Color.getByName('white');
      assert.equal(color, Color.WHITE);
    });

    it("return Color.BLACK for 'black'", function () {
      var color = Color.getByName('black');
      assert.equal(color, Color.BLACK);
    });

    it('throw error for not existing color', function () {
      var getNotExistingColor = function() {
        return Color.getByName('pink');
      };

      assert.throws(getNotExistingColor, /pink/);
    });
  });

  describe('.getByToken()', function () {
    it("return Color.WHITE for 'w'", function () {
      var color = Color.getByToken('w');
      return assert.equal(color, Color.WHITE);
    });

    it("return Color.BLACK for 'b'", function () {
      var color = Color.getByToken('b');
      return assert.equal(color, Color.BLACK);
    });

    it("throw error if token is not 'w' or 'b'", function () {
      var getNotExistingColor = function () {
        return Color.getByToken('r');
      };

      assert.throws(getNotExistingColor, /r/);
    });
  });

  describe('.getByFlag()', function () {
    it('return Color.WHITE for true', function () {
      var color = Color.getByFlag(true);
      assert.equal(color, Color.WHITE);
    });

    it('return Color.BLACK for false', function () {
      var color = Color.getByFlag(false);
      assert.equal(color, Color.BLACK);
    });
  });

  describe('.getByIndex()', function () {
    it('return Color.WHITE for 1', function () {
      var color = Color.getByIndex(1);
      assert.equal(color, Color.WHITE);
    });

    it('return Color.BLACK for 0', function () {
      var color = Color.getByIndex(0);
      assert.equal(color, Color.BLACK);
    });
  });
});

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

  describe('#getRankDistance()', function () {
    it('return 0 if source and destination squares are same', function () {
      var square = Square.fromName('e4'),
        rankDistance = square.getRankDistance(square);

      assert.strictEqual(rankDistance, 0);
    });

    it('is symmetric', function () {
      var source = Square.fromName('a2'),
        destination = Square.fromName('d4'),
        source2destination = source.getRankDistance(destination),
        destination2source = destination.getRankDistance(source);

      assert.strictEqual(source2destination, destination2source);
    });

    it('return 0 for squares a4 and h4', function () {
      var source = Square.fromName('a4'),
        destination = Square.fromName('h4'),
        distance = source.getRankDistance(destination);

      assert.strictEqual(distance, 0);
    });

    it('return 7 for squares h8 and a1', function () {
      var source = Square.fromName('h8'),
        destination = Square.fromName('a1'),
        distance = source.getRankDistance(destination);

      assert.strictEqual(distance, 7);
    });
  });

  describe('#getFileDistance()', function () {
    it('return 0 if source and destination squares are same', function () {
      var square = Square.fromName('d5'),
        fileDistance = square.getFileDistance(square);

      assert.strictEqual(fileDistance, 0);
    });

    it('is symmetric', function () {
      var source = Square.fromName('e2'),
        destination = Square.fromName('f6'),
        source2destination = source.getFileDistance(destination),
        destination2source = destination.getFileDistance(source);

      assert.strictEqual(source2destination, destination2source);
    });

    it('return 2 for squares a2 and c8', function () {
      var source = Square.fromName('a2'),
        destination = Square.fromName('c8'),
        distance = source.getFileDistance(destination);

      assert.strictEqual(distance, 2);
    });

    it('return 7 for squares a4 and h1', function () {
      var source = Square.fromName('a4'),
        destination = Square.fromName('h1'),
        distance = source.getFileDistance(destination);

      assert.strictEqual(distance, 7);
    });
  });

  describe('#getDistance()', function () {
    it('return 0 if source and destination squares are same', function () {
      var square = Square.fromName('c5'),
        distance = square.getDistance(square);

      assert.strictEqual(distance, 0);
    });

    it('is symmetric', function () {
      var source = Square.fromName('a3'),
        destination = Square.fromName('b4'),
        source2destination = source.getDistance(destination),
        destination2source = destination.getDistance(source);

      assert.strictEqual(source2destination, destination2source);
    });

    it('return 14 for squares a1 and h8', function () {
      var source = Square.fromName('a1'),
        destination = Square.fromName('h8'),
        distance = source.getDistance(destination);

      assert.strictEqual(distance, 14);
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

'use strict';

var assert = require('chai').assert,
  Square = require('../square'),
  Chess = require('../chess'),
  Color = require('../color');

describe('Square', function () {

  var chess = new Chess();

  describe('#getRankDistance()', function () {
    it('return 0 if source and destination squares are same', function () {
      var square = chess.squares.e4,
        rankDistance = square.getRankDistance(square);

      assert.strictEqual(rankDistance, 0);
    });

    it('is symmetric', function () {
      var source = chess.squares.a2,
        destination = chess.squares.d4,
        source2destination = source.getRankDistance(destination),
        destination2source = destination.getRankDistance(source);

      assert.strictEqual(source2destination, destination2source);
    });

    it('return 0 for squares a4 and h4', function () {
      var source = chess.squares.a4,
        destination = chess.squares.h4,
        distance = source.getRankDistance(destination);

      assert.strictEqual(distance, 0);
    });

    it('return 7 for squares h8 and a1', function () {
      var source = chess.squares.h8,
        destination = chess.squares.a1,
        distance = source.getRankDistance(destination);

      assert.strictEqual(distance, 7);
    });
  });

  describe('#getFileDistance()', function () {
    it('return 0 if source and destination squares are same', function () {
      var square = chess.squares.d5,
        fileDistance = square.getFileDistance(square);

      assert.strictEqual(fileDistance, 0);
    });

    it('is symmetric', function () {
      var source = chess.squares.e2,
        destination = chess.squares.f6,
        source2destination = source.getFileDistance(destination),
        destination2source = destination.getFileDistance(source);

      assert.strictEqual(source2destination, destination2source);
    });

    it('return 2 for squares a2 and c8', function () {
      var source = chess.squares.a2,
        destination = chess.squares.c8,
        distance = source.getFileDistance(destination);

      assert.strictEqual(distance, 2);
    });

    it('return 7 for squares a4 and h1', function () {
      var source = chess.squares.a4,
        destination = chess.squares.h1,
        distance = source.getFileDistance(destination);

      assert.strictEqual(distance, 7);
    });
  });

  describe('#getDistance()', function () {
    it('return 0 if source and destination squares are same', function () {
      var square = chess.squares.c5,
        distance = square.getDistance(square);

      assert.strictEqual(distance, 0);
    });

    it('is symmetric', function () {
      var source = chess.squares.a3,
        destination = chess.squares.b4,
        source2destination = source.getDistance(destination),
        destination2source = destination.getDistance(source);

      assert.strictEqual(source2destination, destination2source);
    });

    it('return 14 for squares a1 and h8', function () {
      var source = chess.squares.a1,
        destination = chess.squares.h8,
        distance = source.getDistance(destination);

      assert.strictEqual(distance, 14);
    });
  });

  describe('#isOccupied()', function () {
    var square;

    beforeEach(function () {
      square = new Square();
    });

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
    it('return true for empty square');
  });

  describe('#isOccupiedByOpponent()', function () {
    var square;

    beforeEach(function () {
      square = new Square();
    });

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

  describe('#isOnLastRank()', function () {
    it('return true if square placed on first rank', function () {
      var square = chess.squares.e1;
      assert.isTrue(square.isOnLastRank());
    });

    it('return true if square placed on eighth rank', function () {
      var square = chess.squares.d8;
      assert.isTrue(square.isOnLastRank());
    });

    it('return false if square placed on third rank', function () {
      var square = chess.squares.f3;
      assert.isFalse(square.isOnLastRank());
    });
  });

});

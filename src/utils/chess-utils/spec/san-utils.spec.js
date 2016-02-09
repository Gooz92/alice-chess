'use strict';

var assert = require('chai').assert,
  sanUtils = require('../san-utils');

describe('sanUtils', function () {
  describe('.isSquareName()', function () {
    it('return true for valid square san name', function () {
      var squareNames = ['a1', 'h1', 'e4', 'a8', 'h8'];

      squareNames.forEach(function (squareName) {
        assert.isTrue(sanUtils.isSquareName(squareName),
          "Square name '" + squareName + "' must be valid");
      });
    });

    it('return false for invalid square san name', function() {
      var invalidSquareNames = ['a0, h9', 'a9', 'i0', 'a10', '6a'];

      invalidSquareNames.forEach(function (invalidSquareName) {
        assert.isFalse(sanUtils.isSquareName(invalidSquareName),
          "Square name '" + invalidSquareName + "'' must be invalid");
      });
    });
  });

  describe('.isFileName()', function() {
    it('return true for valid file name', function() {
      var fileNames = 'abcdefgh'.split('');

      fileNames.forEach(function (fileName) {
        assert.isTrue(sanUtils.isFileName(fileName),
          "File name '" + fileName + "' must be valid");
      });
    });

    it('return false for invalid file name', function() {
      var invalidFileNames = ['A', 'i', '1', 'alice'];

      invalidFileNames.forEach(function (invalidFileName) {
        assert.isFalse(sanUtils.isFileName(invalidFileName),
          "File name '" + invalidFileName + "'' must be invalid");
      });
    });
  });

  describe('.isRankName()', function () {
    it('return true for valid rank name as string', function() {
      var rankNames = '12345678'.split('');

      rankNames.forEach(function (rankName) {
        assert.isTrue(sanUtils.isRankName(rankName),
          "Rank name " + rankName + " must be valid");
      });
    });

    it('return true for rank name as number', function () {
      var rankName;

      for (rankName = 1; rankName < 9; rankName++) {
        assert.isTrue(sanUtils.isRankName(rankName),
          "Rank name '" + rankName + "'' must be valid");
      }
    });

    it('return false for invalid rank name', function () {
      var invalidRankNames = ['0', 0, '9', 9, 'alice', ''];

      invalidRankNames.forEach(function (invalidRankName) {
        assert.isFalse(sanUtils.isRankName(invalidRankName),
          "Rank name '" + invalidRankName + "'' must be invalid");
      });
    });
  });
});

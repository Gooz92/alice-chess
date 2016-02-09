'use strict';

var assert = require('chai').assert,
  boardUtils = require('../board-utils');

describe('boardUtils', function () {
  describe('.isLineIndex()', function () {
    it('return true for index between 0 and 7 (including)', function () {
      var index;

      for (index = 0; index < 8; index++) {
        assert.isTrue(boardUtils.isLineIndex(index),
          index + " must be line index");
      }
    });

    it('return false for index less then 0', function () {
      assert.isFalse(boardUtils.isLineIndex(-1));
    });

    it('return false for index great then 7', function () {
      assert.isFalse(boardUtils.isLineIndex(8));
    });
  });

  describe('.fileIndexToName()', function () {
    it('return fileName for index between 0 and 7 (including)', function () {
      var fileNames = 'abcdefgh'.split('');

      fileNames.forEach(function (fileName, fileIndex) {
        assert.strictEqual(boardUtils.fileIndexToName(fileIndex), fileName,
          "File with name '" + fileName + "'' should nave index " + fileIndex);
      });
    });
  });

  describe('.fileNameToIndex()', function () {
    it('return file index for valid file names', function () {
      var fileNames = 'abcdefgh'.split('');

      fileNames.forEach(function (fileName, fileIndex) {
        assert.strictEqual(boardUtils.fileNameToIndex(fileName), fileIndex,
          "File with index " + fileIndex +
          " should have name '" + fileName + "'");
      });
    });
  });

  describe('.rankIndexToName()', function () {
    it('return rank name for valid rank index', function () {
      var rankNames = '12345678', rankName, rankIndex;

      for (rankIndex = 0; rankIndex < 8; rankIndex++) {
        rankName = rankNames.charAt(rankIndex);
        assert.strictEqual(boardUtils.rankIndexToName(rankIndex), rankName,
          "Rank with index " + rankIndex +
          " should have name '" + rankName + "'");
      }
    });
  });

  describe('.rankNameToIndex()', function () {
    it('return rank index for valid rank names', function () {
      var rankNames = '12345678', rankName, rankIndex;

      for (rankIndex = 0; rankIndex < 8; rankIndex++) {
        rankName = rankNames.charAt(rankIndex);
        assert.strictEqual(boardUtils.rankNameToIndex(rankName), rankIndex,
          "Rank with name '" + rankName +
          "'' should have index " + rankIndex);
      }
    });
  });

  describe('.fileIndexFromSquareIndex()', function () {
    it('return file index for square index', function () {
      // TODO improve
      var fileIndex = boardUtils.fileIndexFromSquareIndex(52);
      assert.strictEqual(fileIndex, 4);
    });
  });
});

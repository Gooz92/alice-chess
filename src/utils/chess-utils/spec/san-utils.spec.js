const { assert } = require('chai');
const sanUtils = require('../san-utils');

describe('sanUtils', () => {
  describe('.isSquareName()', () => {
    it('return true for valid square san name', () => {
      var squareNames = ['a1', 'h1', 'e4', 'a8', 'h8'];

      squareNames.forEach(squareName => {
        assert.isTrue(sanUtils.isSquareName(squareName),
          "Square name '" + squareName + "' must be valid");
      });
    });

    it('return false for invalid square san name', () => {
      const invalidSquareNames = ['a0, h9', 'a9', 'i0', 'a10', '6a'];

      invalidSquareNames.forEach(invalidSquareName => {
        assert.isFalse(sanUtils.isSquareName(invalidSquareName),
          "Square name '" + invalidSquareName + "'' must be invalid");
      });
    });
  });

  describe('.isFileName()', () => {
    it('return true for valid file name', () => {
      var fileNames = 'abcdefgh'.split('');

      fileNames.forEach(fileName => {
        assert.isTrue(sanUtils.isFileName(fileName),
          "File name '" + fileName + "' must be valid");
      });
    });

    it('return false for invalid file name', () => {
      var invalidFileNames = ['A', 'i', '1', 'alice'];

      invalidFileNames.forEach(invalidFileName => {
        assert.isFalse(sanUtils.isFileName(invalidFileName),
          "File name '" + invalidFileName + "'' must be invalid");
      });
    });
  });

  describe('.isRankName()', () => {
    it('return true for valid rank name as string', () => {
      const rankNames = '12345678'.split('');

      rankNames.forEach(rankName => {
        assert.isTrue(sanUtils.isRankName(rankName),
          "Rank name " + rankName + " must be valid");
      });
    });

    it('return true for rank name as number', () => {
      for (let rankName = 1; rankName < 9; rankName++) {
        assert.isTrue(sanUtils.isRankName(rankName),
          "Rank name '" + rankName + "'' must be valid");
      }
    });

    it('return false for invalid rank name', () => {
      const invalidRankNames = ['0', 0, '9', 9, 'alice', ''];

      invalidRankNames.forEach(function (invalidRankName) {
        assert.isFalse(sanUtils.isRankName(invalidRankName),
          "Rank name '" + invalidRankName + "'' must be invalid");
      });
    });
  });

  describe('.parseLAN()', () => {
    const { parseLAN } = sanUtils;

    const samples = [
      [ 'e2e4', [ 'e2', 'e4', null ] ],
      [ 'd7d8q', [ 'd7', 'd8', 'q' ] ]
    ];

    samples.forEach(([ lan, expectedMove ]) => {
      it(lan, () => {
        const actualMove = parseLAN(lan);
        assert.deepEqual(actualMove, expectedMove);
      });
    });
  });

});

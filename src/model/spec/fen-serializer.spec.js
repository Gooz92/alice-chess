const FenSerializer = require('../fen-serializer'),
  assert = require('chai').assert,
  Chess = require('../chess');

describe('FenSerializer', () => {

  describe('.generateFenRank()', () => {

    it("return '8' for empty rank", () => {
      const fenSerializer = new FenSerializer(new Chess());
      assert.strictEqual(fenSerializer.generateFenRank(0), '8');
    });

    it("return 'rnbqkbnr' for eighth rank on start position", () => {
      const fenSerializer = new FenSerializer(Chess.createStartPosition());
      assert.strictEqual(fenSerializer.generateFenRank(7), 'rnbqkbnr');
    });

    it("return '4P3' for fourth rank after king's pawn move", () => {
      const chess = Chess.createStartPosition();
      const fenSerializer = new FenSerializer(chess);
      chess.move('e4');
      assert.strictEqual(fenSerializer.generateFenRank(3), '4P3');
    });
  });
});

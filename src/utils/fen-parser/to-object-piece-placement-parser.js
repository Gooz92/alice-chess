'use strict';

var PiecePlacementParser = require('./piece-placement-parser');

function ToObjectPiecePlacementParser() {
  this.piecePlacementParser = new PiecePlacementParser({
    onStart: function () {
      this.board = {};
      this.rank = 8;
    },

    rank: {
      onPieceToken: function (piece, fileIndex) {
        var fileName = 'abcdefgh'.charAt(fileIndex);
        this.board[fileName + this.rank] = piece;
      },

      onEnd: function () {
        --this.rank;
      }
    },

    onEnd: function () {
      return this.board;
    }
  });
}

ToObjectPiecePlacementParser.prototype.parse = function (piecePlacement) {
  return this.piecePlacementParser.parse(piecePlacement);
};

module.exports = ToObjectPiecePlacementParser;

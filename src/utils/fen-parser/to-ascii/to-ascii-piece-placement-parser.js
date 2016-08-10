'use strict';

var PiecePlacementParser = require('../piece-placement-parser');

var piecePlacementParser = new PiecePlacementParser({
  onStart: function () {
    this.board = [];
    this.rankIndex = 8;
  },

  rank: {
    onStart: function () {
      this.rank = [];
    },

    onPieceToken: function (pieceToken) {
      this.rank.push(pieceToken);
    },

    onEmptySquare: function () {
      this.rank.push('.');
    },

    onEnd: function () {
      var rank = this.rank.join('  ');
      this.board.push(rank);
    }
  },

  onEnd: function () {
    return this.board.join('\n');
  }
});

function parsePiecePlacement(piecePlacement) {
  return piecePlacementParser.parse(piecePlacement);
}

module.exports = parsePiecePlacement;

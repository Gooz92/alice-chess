'use strict';

var RankParser = require('./rank-parser');

var rankParser = new RankParser({
  onStart: function () {
    this.rank = [];
  },

  onPieceToken: function (pieceToken) {
    this.rank.push(pieceToken);
  },

  onEmptySquare: function () {
    this.rank.push('-');
  },

  onEnd: function () {
    return this.rank.join('');
  }
});

function fenRankToAscii(fenRank) {
  return rankParser.parse(fenRank);
}

module.exports = fenRankToAscii;

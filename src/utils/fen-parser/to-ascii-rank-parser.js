'use strict';

var RankParser = require('./rank-parser');

function ToAsciiRankParser(emptySquareToken) {
  this.rankParser = new RankParser({
    onStart: function () {
      this.rank = [];
    },

    onPieceToken: function (pieceToken) {
      this.rank.push(pieceToken);
    },

    onEmptySquare: function () {
      this.rank.push(emptySquareToken);
    },

    onEnd: function () {
      return this.rank.join('');
    }
  });
}

ToAsciiRankParser.prototype.parse = function (rank) {
  return this.rankParser.parse(rank);
};

module.exports = ToAsciiRankParser;
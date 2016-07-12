'use strict';

var RankParser = require('./rank-parser');

module.exports = new RankParser({
  onStart: function () {
    this.rank = [];
  },

  onPiece: function (pieceToken) {
    this.rank.push(pieceToken);
  },

  onEmptySquare: function () {
    this.rank.push(' ');
  },

  onEnd: function () {
    this.rank.join('');
  }
});

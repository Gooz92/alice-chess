'use strict';

var isUtils = require('../common-utils/is-utils'),
  FenParser = require('./fen-parser');

var hLine = '  +-----------------+',
  fileLabels = '    a b c d e f g h';

function rankToString(rank, rankIndex) {
  var index, token;

  for (index = 0; index < 8; index++) {
    token = rank[index];
    rank[index] = isUtils.isString(token) ? token : '-';
  }

  return [rankIndex, '|', rank.join(' '), '|', rankIndex].join(' ');
}

module.exports = new FenParser({
  onPiecePlacementStart: function () {
    this.data = {
      board: [fileLabels, hLine],
      rankIndex: 8
    };
  },

  onRankStart: function () {
    this.data.rank = [];
  },

  onPiece: function (piece, fileIndex) {
    this.data.rank[fileIndex] = piece;
  },

  onRankEnd: function () {
    var rank = rankToString(this.data.rank, this.data.rankIndex);
    this.data.board.push(rank);
    --this.data.rankIndex;
  },

  onPiecePlacementEnd: function () {
    var board = this.data.board;
    delete this.data;

    board.push(hLine, fileLabels);
    this.board = board.join('\n');

    return this.board;
  },

  onWhiteActiveColor: function () {
    this.board += '   w';
  },

  onBlackActiveColor: function () {
    this.board += '   b';
  },

  onEnd: function () {
    var board = this.board;
    delete this.board;
    return board;
  }
});

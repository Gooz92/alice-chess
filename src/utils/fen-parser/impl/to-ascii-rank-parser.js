'use strict';

var RankParser = require('./rank-parser'),
  isTypeUtils = require('../common-utils/is-type-utils');

ToAsciiRankParser.defaultEmptySquareToken = '.';

function ToAsciiRankParser(options) {
  var emptySquareToken = options.emptySquareToken,
    separator;

  if (isTypeUtils.isUndefined(emptySquareToken)) {
    emptySquareToken = ToAsciiRankParser.defaultEmptySquareToken;
  }

  if (options.gap) {
    separator = ' ';
  } else {
    separator = '';
  }

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
      return this.rank.join(separator);
    }
  });
}

ToAsciiRankParser.prototype.parse = function (rank) {
  return this.rankParser.parse(rank);
};

module.exports = ToAsciiRankParser;

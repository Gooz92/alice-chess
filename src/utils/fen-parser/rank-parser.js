'use strict';

var fenUtils = require('../chess-utils/fen-utils'),
  { noop } = require('../common-utils/lang-fns'),
  fnUtils = require('../common-utils/fn-utils'),
  objectUtils = require('../common-utils/object-utils');

var rankLength = 8,
  maxFileIndex = 7;

function throwTooLongRankError(rank) {
  throw new Error(`Rank '${rank}' is too long`);
}

function throwRepeatedEmptySquareTokensError(rank) {
  throw new Error(`Consecutively repeated empty square tokens in rank '${rank}'`);
}

module.exports = class RankParser {

  constructor(handlers = {}) {
    this.handlers = objectUtils.defaults(handlers, {
      onStart: noop,
      onPieceToken: noop,
      onEmptySquare: noop,
      onEmptySquaresCount: noop,
      onEnd: noop
    });
  }

  parse(rank, data = {}) {
    var previousTokenIsEmptySquareToken = false,
      fileIndex = 0,
      rankTokens;

    this.handlers.onStart.call(data, rank);

    rank.split('').forEach(token => {
      if (fenUtils.isEmptySquaresToken(token)) {

        if (previousTokenIsEmptySquareToken) {
          throwRepeatedEmptySquareTokensError(rank);
        }

        previousTokenIsEmptySquareToken = true;
        token = parseInt(token);
        this.handlers.onEmptySquaresCount.call(data, token);

        if (fileIndex + token > rankLength) {
          throwTooLongRankError(rank);
        }

        fnUtils.times(token, () => this.handlers.onEmptySquare.call(data, fileIndex++));

      } else if (fenUtils.isPieceToken(token)) {
        previousTokenIsEmptySquareToken = false;
        if (fileIndex > maxFileIndex) {
          throwTooLongRankError(rank);
        }

        this.handlers.onPieceToken.call(data, token, fileIndex++);
      } else {
        throw new Error(`Unknown token '${token}' in rank '${rank}'`);
      }
    });

    if (fileIndex < rankLength) {
      throw new Error(`Rank '${rank}' is too short`);
    }

    return this.handlers.onEnd.call(data, rank);
  }
}

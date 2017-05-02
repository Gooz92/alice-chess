'use strict';

var fenUtils = require('../chess-utils/fen-utils'),
  langFns = require('../common-utils/lang-fns'),
  fnUtils = require('../common-utils/fn-utils'),
  objectUtils = require('../common-utils/object-utils');

var rankLength = 8,
  maxFileIndex = 7;

function RankParser(handlers) {
  this.handlers = objectUtils.defaults(handlers, {
    onStart: langFns.noop,
    onPieceToken: langFns.noop,
    onEmptySquare: langFns.noop,
    onEmptySquaresCount: langFns.noop,
    onEnd: langFns.noop
  });
}

function throwTooLongRankError(rank) {
  throw new Error(`Rank '${rank}' is too long`);
}

function throwRepeatedEmptySquareTokensError(rank) {
  throw new Error(`Consecutively repeated empty square tokens in rank '${rank}'`);
}

RankParser.prototype.parse = function (rank, data) {
  var handlers = this.handlers,
    previousTokenIsEmptySquareToken = false,
    fileIndex = 0,
    rankTokens;

  data = data || {};

  handlers.onStart.call(data, rank);

  rankTokens = rank.split('');

  rankTokens.forEach(function (token) {
    if (fenUtils.isEmptySquaresToken(token)) {

      if (previousTokenIsEmptySquareToken) {
        throwRepeatedEmptySquareTokensError(rank);
      }

      previousTokenIsEmptySquareToken = true;
      token = parseInt(token);
      handlers.onEmptySquaresCount.call(data, token);

      if (fileIndex + token > rankLength) {
        throwTooLongRankError(rank);
      }

      fnUtils.times(token, function () {
        handlers.onEmptySquare.call(data, fileIndex++);
      });
    } else if (fenUtils.isPieceToken(token)) {
       previousTokenIsEmptySquareToken = false;
      if (fileIndex > maxFileIndex) {
        throwTooLongRankError(rank);
      }

      handlers.onPieceToken.call(data, token, fileIndex++);
    } else {
      throw new Error(`Unknown token '${token}' in rank '${rank}'`);
    }
  });

  if (fileIndex < rankLength) {
    throw new Error(`Rank '${rank}' is too short`);
  }

  return handlers.onEnd.call(data, rank);
};

module.exports = RankParser;

'use strict';

var fenUtils = require('../chess-utils/fen-utils'),
  langFns = require('../common-utils/lang-fns'),
  fnUtils = require('../common-utils/fn-utils'),
  objectUtils = require('../common-utils/object-utils'),
  throwError = require('../common-utils/throw-error');

var maxFileIndex = 7;

function RankParser(handlers) {
  this.handlers = objectUtils.defaults(handlers, {
    onStart: langFns.noop,
    onPieceToken: langFns.noop,
    onEmptySquare: langFns.noop,
    onEmptySquaresCount: langFns.noop,
    onEnd: langFns.noop
  });
}


RankParser.prototype.parse = function (rank, data) {
  var handlers = this.handlers,
    fileIndex = 0,
    rankTokens;

  data = data || {};

  handlers.onStart.call(data, rank);

  rankTokens = rank.split('');

  rankTokens.forEach(function (token) {
    if (fenUtils.isEmptySquaresToken(token)) {
      token = parseInt(token);
      handlers.onEmptySquaresCount.call(data, token);

      if (fileIndex + token > maxFileIndex) {
        throwError("Rank '{0}' is too long", rank);
      }

      fnUtils.times(token, function () {
        handlers.onEmptySquare.call(data, fileIndex++);
      });
    } else if (fenUtils.isPieceToken(token)) {
      fileIndex++;

      if (fileIndex > maxFileIndex) {
        throwError("Rank '{0}' is too long", rank);
      }

      handlers.onPieceToken.call(data, token, fileIndex);
    } else {
      throwError("Unknown token '{0}' in rank '{1}'", token, rank);
    }
  });

  if (fileIndex < maxFileIndex) {
    throwError("Rank '{0}' is too short", rank);
  }

  return handlers.onEnd.call(data, rank);
};

module.exports = RankParser;

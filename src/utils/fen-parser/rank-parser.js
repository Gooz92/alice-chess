'use strict';

var fnUtils = require('../common-utils/fn-utils'),
  isTypeUtils = require('../common-utils/is-type-utils');

var handlerNames = [
  'onPiece',
  'onEmptySquare',
  'onEmptySquares'
];

function RankParser(handlers) {
  handlerNames.forEach(function (handlerName) {
    var handler = handlers[handlerName];

    if (isTypeUtils.isUndefined(handler)) {
      handlers[handlerName] = function () {};
    }
  });

  this.handlers = handlers;
}

RankParser.prototype.parse = function (rank) {
  var rankTokens = rank.split(''),
      fileIndex = 0,
      handlers = this.handlers,
      data = {};

  rankTokens.forEach(function (token) {
      if (fileIndex > 7) {
        throw new Error("Rank '" + rank + "' is too long");
      }

      if (fenUtils.isEmptySquaresToken(token)) {
        token = parseInt(token);
        handlers.onEmptySquaresCount.call(data, token);
        fnUtils.times(token, function () {
          handlers.onEmptySquare.call(data, fileIndex++);
        });
      } else if (fenUtils.isPieceToken(token)) {
        handlers.onPiece.call(data, token, fileIndex++);
      } else {
        throw new Error("Unknown token: " + token);
      }
  });

  if (fileIndex < 7) {
    throw new Error("Rank '" + rank + "' is too short");
  }
};

module.exports = RankParser;


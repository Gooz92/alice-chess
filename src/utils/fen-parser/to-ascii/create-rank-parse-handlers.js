'use strict';

var isTypeUtils = require('../../common-utils/is-type-utils'),
  stringUtils = require('../../common-utils/string-utils'),
  objectUtils = require('../../common-utils/object-utils');

var defaultOptions = {
  emptySquareToken: '.',
  defaultGap: 2
};

function createRankParseHandlers(options) {
  var separator, emptySquareToken;

  options = objectUtils.defaults(options, defaultOptions);

  emptySquareToken = options.emptySquareToken;
  separator = stringUtils.repeat(' ', options.gap);

  return {
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
  };
}

module.exports = createRankParseHandlers;

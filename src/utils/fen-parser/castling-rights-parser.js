'use strict';

var fenUtils = require('../chess-utils/fen-utils'),
  throwError = require('../common-utils/throw-error'),
  langFns = require('../common-utils/lang-fns'),
  objectUtils = require('../common-utils/object-utils');

var castlingTokens = ['K', 'Q', 'k', 'q'];

function checkOrder(tokenIndex, castlingTokensOccurences) {
  while (tokenIndex-- > 0) {
    if (castlingTokensOccurences[tokenIndex]) {
      throwError('wrong castling token order');
    }
  }
}

function CastlingRightsParser(handlers, strictOrder) {
  this.handlers = objectUtils.defaults(handlers, {
    onStart: langFns.noop,
    onCastlingRightsToken: langFns.noop,
    onEnd: langFns.noop
  });
}

CastlingRightsParser.prototype.parse = function (castlingRights, data) {
  var onCastlingRightsToken = this.handlers.onCastlingRightsToken,
    castlingTokensOccurences = [false, false, false, false],
    tokens;

  data = data || {};

  this.handlers.onStart.call(data);

  if (castlingRights !== '-') {
    tokens = castlingRights.split('');

    tokens.forEach(function (token) {
      var tokenIndex = castlingTokens.indexOf(token);

      if (tokenIndex === -1) {
        throwError("Unknown castling rights token: '{0}'", token);
      }

      if (castlingTokensOccurences[tokenIndex]) {
        throwError("Repeated castling rights token: {0}", token);
      }

      checkOrder(tokenIndex, castlingTokensOccurences);

      castlingTokensOccurences[tokenIndex] = true;

      onCastlingRightsToken.call(data, token);
    });
  }

  return this.handlers.onEnd.call(data);
};

module.exports = CastlingRightsParser;

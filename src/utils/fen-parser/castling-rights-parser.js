'use strict';

var { noop } = require('../common-utils/lang-fns'),
  objectUtils = require('../common-utils/object-utils');

var castlingTokens = 'KQkq';

function checkOrder(tokenIndex, castlingTokensOccurences) {
  while (tokenIndex++ < castlingTokensOccurences.length) {
    if (castlingTokensOccurences[tokenIndex]) {
      throw new Error('wrong castling token order');
    }
  }
}

function CastlingRightsParser(handlers, strictOrder) {
  this.handlers = objectUtils.defaults(handlers, {
    onStart: noop,
    onCastlingRightsToken: noop,
    onEnd: noop
  });
}

CastlingRightsParser.prototype.parse = function (castlingRights, data) {
  var onCastlingRightsToken = this.handlers.onCastlingRightsToken,
    castlingTokensOccurences = [false, false, false, false],
    tokens;

  data = data || {};

  this.handlers.onStart.call(data, castlingRights);

  if (castlingRights !== '-') {
    tokens = castlingRights.split('');

    tokens.forEach(function (token) {
      var tokenIndex = castlingTokens.indexOf(token);

      if (tokenIndex === -1) {
        throw new Error(`Unknown castling rights token: '${token}'`);
      }

      if (castlingTokensOccurences[tokenIndex]) {
        throw new Error(`Repeated castling rights token: ${token}`);
      }

      checkOrder(tokenIndex, castlingTokensOccurences);

      castlingTokensOccurences[tokenIndex] = true;

      onCastlingRightsToken.call(data, token);
    });
  }

  return this.handlers.onEnd.call(data);
};

module.exports = CastlingRightsParser;

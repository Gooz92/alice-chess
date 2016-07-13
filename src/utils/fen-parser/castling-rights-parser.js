'use strict';

var fenUtils = require('../chess-utils/fen-utils'),
  throwError = require('../common-utils/throw-error'),
  langFns = require('../common-utils/lang-fns'),
  objectUtils = require('../common-utils/object-utils');

function CastlingRightsParser(handlers, strictOrder) {
  this.handlers = objectUtils.defaults(handlers, {
    onStart: langFns.noop,
    onCastlingRightsToken: langFns.noop,
    onEnd: langFns.noop
  });
}

CastlingRightsParser.prototype.parse = function (castlingRights, data) {
  var onCastlingRightsToken = this.handlers.onCastlingRightsToken,
    tokens;

  data = data || {};

  this.handlers.onStart.call(data);

  if (castlingRights !== '-') {
    tokens = castlingRights.split('');

    tokens.forEach(function (token) {
      if (fenUtils.isCastlingToken(token)) {
        onCastlingRightsToken.call(data, token);
      } else {
        throwError("Unknown castling rights token: '{0}'", token);
      }
    });
  }

  return this.handlers.onEnd.call(data);
};

module.exports = CastlingRightsParser;

'use strict';

var CastlingRightsParser = require('./castling-rights-parser');

function ToObjectCastlingRightsParser() {
  this.castlingRightsParser = new CastlingRightsParser({
    onStart: function () {
      this.castlingRights = {
        K: false,
        Q: false,
        k: false,
        q: false
      };
    },

    onCastlingRightsToken: function (token) {
      this.castlingRights[token] = true;
    },

    onEnd: function () {
      return this.castlingRights;
    }
  });
}

ToObjectCastlingRightsParser.prototype.parse = function (castlingRigths) {
  return this.castlingRightsParser.parse(castlingRigths);
};

module.exports = ToObjectCastlingRightsParser;

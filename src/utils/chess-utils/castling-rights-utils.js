'use strict';

// KQkq

var B_LONG_CASTLING_MASK = 1,
  B_SHORT_CASTLING_MASK = 2,
  W_LONG_CASLTING_MASK = 4,
  W_SHORT_CASTLING_MASK = 8;

var masks = {
  k: B_SHORT_CASTLING_MASK,
  q: B_LONG_CASTLING_MASK,
  K: W_SHORT_CASTLING_MASK,
  Q: W_LONG_CASLTING_MASK
};

var castlingTokens = ['K', 'Q', 'k', 'q'];

module.exports = {
  isWhiteShortCastlingPossible: function (castlingRights) {
    return (castlingRights & W_SHORT_CASTLING_MASK) === W_SHORT_CASTLING_MASK;
  },

  isWhiteLongCastlingPossible: function (castlingRights) {
    return (castlingRights & W_LONG_CASLTING_MASK) === W_LONG_CASLTING_MASK;
  },

  isBlackShortCastlingPossible: function (castlingRights) {
    return (castlingRights & B_SHORT_CASTLING_MASK) === B_SHORT_CASTLING_MASK;
  },

  isBlackLongCastlingPossible: function (castlingRights) {
    return (castlingRights & B_LONG_CASTLING_MASK) === B_LONG_CASTLING_MASK;
  },

  toFenField: function (castlingRights) {
    var fenField;

    if (castlingRights === 0) {
      return '-';
    }

    fenField = '';

    castlingTokens.forEach(function (token) {
      var mask = masks[token];

      if ((castlingRights & mask) === mask) {
        fenField += token;
      }
    });

    return fenField;
  }
};
'use strict';

// KQkq

var B_LONG_CASTLING_MASK = 1,
  B_SHORT_CASTLING_MASK = 2,
  W_LONG_CASLTING_MASK = 4,
  W_SHORT_CASTLING_MASK = 8;

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
  }
};
'use strict';

var castlingUtils = require('../utils/chess-utils/castling-rights-utils');

module.exports = {
  isShortCastlingPossible: function () {
    if (this.activeColor.isWhite()) {
      return castlingUtils.isWhiteLongCastlingPossible(this.castlingRights);
    }

    return castlingUtils.isBlackShortCastlingPossible(this.castlingRights);
  },

  isLongCastlingPossible: function () {
    if (this.activeColor.isWhite()) {
      return castlingUtils.isWhiteLongCastlingPossible(this.castlingRights);
    }

    return castlingUtils.isBlackLongCastlingPossible(this.castlingRights);
  }
};

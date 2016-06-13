'use strict';

var castlingRightsUtils = require('../utils/chess-utils/castling-rights-utils');

module.exports = {
  generateFenCastlingAvailability: function () {
    return castlingRightsUtils.toFenField(this.castlingRights);
  }
};

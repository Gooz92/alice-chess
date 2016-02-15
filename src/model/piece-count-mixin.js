'use strict';

var Color = require('./color'),
  arrayUtils = require('../utils/common-utils/array-utils');

module.exports = {
  getPieceCount: function (fenToken) {
    var pieceToken = fenToken.toLowerCase(),
      isWhite = fenToken !== pieceToken,
      color = Color.getByFlag(isWhite),
      pieces = this.pieces[color.name];

    return arrayUtils.count(pieces, function (piece) {
      return piece.token === pieceToken;
    });
  },

  getPawnCount: function (color) {
    var pieces;

    color = color || this.activeColor;
    pieces = this.pieces[color.name];

    return arrayUtils.count(pieces, function (piece) {
      return piece.isPawn();
    });
  }
};

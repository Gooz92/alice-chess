'use strict';

var sanUtils = require('./san-utils');

var pieceTokenPattern = /^[prnbqk]$/i,
  emptySquaresToken = /^[1-8]$/,
  castlingTokens = 'kqKQ';

var pieceNames = {
  p: 'pawn',
  r: 'rook',
  n: 'knight',
  b: 'bishop',
  q: 'queen',
  k: 'king'
};

module.exports = {
  isPieceToken: function (token) {
    return pieceTokenPattern.test(token);
  },

  isEmptySquaresToken: function (token) {
    return emptySquaresToken.test(token);
  },

  isColorToken: function (token) {
    return token === 'w' || token === 'b';
  },

  isCastlingToken: function (token) {
    return castlingTokens.indexOf(token) !== -1;
  },

  isEnPassantSquareToken: function (squareName) {
    var rankName;

    if (squareName === '-') {
      return true;
    }

    if (!sanUtils.isSquareName(squareName)) {
      return false;
    }

    rankName = squareName.charAt(1);
    return rankName === '6' || rankName === '3';
  },

  colorNameFromPieceToken: function (fenPieceToken) {
    var pieceToken = fenPieceToken.toLowerCase();

    return pieceToken === fenPieceToken ? 'black' : 'white';
  },

  tokenToPieceName: function (fenPieceToken) {
    return pieceNames[fenPieceToken];
  }
};

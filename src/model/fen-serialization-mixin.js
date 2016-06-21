'use strict';

var castlingRightsUtils = require('../utils/chess-utils/castling-rights-utils');

module.exports = {
  generateFenRank: function (rankIndex) {
    var rank = '',
      squareIndex = rankIndex * 16,
      endSquareIndex = squareIndex + 8,
      emptySquaresCount = 0,
      square;

    while (squareIndex < endSquareIndex) {
      square = this.squares[squareIndex];

      if (square.isEmpty()) {
        ++emptySquaresCount;
      } else {
        if (emptySquaresCount > 0) {
          rank += emptySquaresCount;
          emptySquaresCount = 0;
        }
        rank += square.piece.getFenToken();
      }

      ++squareIndex;
    }

    if (emptySquaresCount > 0) {
      rank += emptySquaresCount;
    }

    return rank;
  },

  generatePiecePlacement: function () {
    var piecePlacement = [],
      rank, rankIndex;

    for (rankIndex = 7; rankIndex >= 0; rankIndex--) {
      rank = this.generateFenRank(rankIndex);
      piecePlacement.push(rank);
    }

    return piecePlacement.join('/');
  },

  generateEnPassantTargetSquare: function () {
    if (this.enPassantTargetSquare) {
      return this.enPassantTargetSquare.name;
    }

    return '-';
  },

  generateFenCastlingAvailability: function () {
    return castlingRightsUtils.toFenField(this.castlingRights);
  },

  generateFullmoveNumber: function () {
    return Math.ceil((this.history.length + 1) / 2);
  },

  generateFen: function () {
    return [
      this.generatePiecePlacement(),
      this.activeColor.token,
      this.generateFenCastlingAvailability(),
      this.generateEnPassantTargetSquare(),
      this.halfmoveClock,
      this.generateFullmoveNumber()
    ].join(' ');
  }
};

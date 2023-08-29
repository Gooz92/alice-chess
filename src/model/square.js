'use strict';

const boardUtils = require('../utils/chess-utils/board-utils');

function Square(index, chess) {
  this.index = index;
  this.chess = chess;
  this.name = boardUtils.squareIndexToName(index);
  this.rankIndex = boardUtils.rankIndexFromSquareIndex(index);
  this.fileIndex = boardUtils.fileIndexFromSquareIndex(index);
  this.fileName = this.name.charAt(0);
  this.rankName = this.name.charAt(1);
  this.piece = null;
}

Square.prototype = {
  constructor: Square,

  getRankDistance: function (square) {
    return Math.abs(this.rankIndex - square.rankIndex);
  },

  getFileDistance: function (square) {
    return Math.abs(this.fileIndex - square.fileIndex);
  },

  getDistance: function (square) {
    var rankDistance = this.getRankDistance(square),
      fileDistance = this.getFileDistance(square),
      distance = rankDistance + fileDistance;

    return distance;
  },

  isTargetEnPassantSquare: function () {
    return this === this.chess.enPassantTargetSquare;
  },

  isOccupied: function () {
    return this.piece !== null;
  },

  isOccupiedByOpponent: function (playerColor) {
    var opponentColor = playerColor.toggle();
    return this.isOccupiedByPlayer(opponentColor);
  },

  isOccupiedByPlayer: function (playerColor) {
    return this.isOccupied() && this.piece.color === playerColor;
  },

  isEmpty: function () {
    return this.piece === null;
  },

  isOnLastRank: function () {
    return this.rankIndex === 7 || this.rankIndex === 0;
  }
};

module.exports = Square;

'use strict';

var isTypeUtils = require('../utils/common-utils/is-type-utils'),
  boardUtils = require('../utils/chess-utils/board-utils');

function Square(index, chess) {
  this.index = index;
  this.chess = chess;
  this.name = boardUtils.squareIndexToName(index);
  this.rankIndex = boardUtils.rankIndexFromSquareIndex(index);
  this.fileIndex = boardUtils.fileIndexFromSquareIndex(index);
}

Square.fromName = function (squareName, chess) {
  var index = boardUtils.squareNameToIndex(squareName),
    square = new Square(index, chess);

  return square;
};

Square.prototype = {
  constructor: Square,

  getRankDistance: function (square) {
    return Math.abs(this.rankIndex- square.rankIndex);
  },

  getFileDistance: function (square) {
    return Math.abs(this.fileIndex - square.fileIndex);
  },

  getFileName: function () {
    return this.name.charAt(0);
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
    return !isTypeUtils.isNill(this.piece);
  },

  isOccupiedByOpponent: function (playerColor) {
    var opponentColor = playerColor.toggle();
    return this.isOccupiedByPlayer(opponentColor);
  },

  isOccupiedByPlayer: function (playerColor) {
    return this.isOccupied() && this.piece.color === playerColor;
  },

  isEmpty: function () {
    return !this.isOccupied();
  },

  isOnLastRank: function () {
    return this.rankIndex === 7 || this.rankIndex === 0;
  }
};

module.exports = Square;

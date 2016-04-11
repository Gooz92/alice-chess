'use strict';

var isUtils = require('../utils/common-utils/is-utils'),
  boardUtils = require('../utils/chess-utils/board-utils');

function Square(index, chess) {
  this.index = index;
  this.chess = chess;
  this.name = boardUtils.squareIndexToName(index);
}

Square.fromName = function (squareName, chess) {
  var index = boardUtils.squareNameToIndex(squareName),
    square = new Square(index, chess);

  return square;
};

Square.prototype = {
  constructor: Square,

  getRankDistance: function (square) {
    var sourceRankIndex = this.getRankIndex(),
      destinationRankIndex = square.getRankIndex(),
      rankDistance = Math.abs(sourceRankIndex - destinationRankIndex);

    return rankDistance;
  },

  getFileDistance: function (square) {
    var sourceFileIndex = this.getFileIndex(),
      destinationFileIndex = square.getFileIndex(),
      fileDistance = Math.abs(sourceFileIndex - destinationFileIndex);

    return fileDistance;
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
    return isUtils.isPresent(this.piece);
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

  getRankIndex: function () {
    return boardUtils.rankIndexFromSquareIndex(this.index);
  },

  getFileIndex: function () {
    return boardUtils.fileIndexFromSquareIndex(this.index);
  },

  isOnLastRank: function () {
    var rankIndex = this.getRankIndex();
    return rankIndex === 7 || rankIndex === 0;
  }
};

module.exports = Square;

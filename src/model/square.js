'use strict';

var isUtils = require('../utils/common-utils/is-utils'),
  boardUtils = require('../utils/chess-utils/board-utils');

function Square(index, chess) {
  this.index = index;
  this.chess = chess;
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

  getDistance: function (square) {
    var rankDistance = this.getRankDistance(square),
      fileDistance = this.getFileDistance(square),
      distance = rankDistance + fileDistance;

    return distance;
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

  getName: function () {
    return boardUtils.squareIndexToName(this.index);
  }
};

module.exports = Square;

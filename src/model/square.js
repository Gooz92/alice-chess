'use strict';

var isUtils = require('../utils/common-utils/is-utils'),
  boardUtils = require('../utils/chess-utils/board-utils');

function Square(index, chess) {
  this.index = index;
  this.chess = chess;
}

Square.prototype = {
  constructor: Square,

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

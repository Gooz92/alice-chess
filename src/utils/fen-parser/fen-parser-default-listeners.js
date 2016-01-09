'use strict';

var isUtils = require('../common-utils/is-utils');

var listeners = module.exports = {
  onStart: function() {
    this.data = {
      board: []
    };
  },

  onRankStart: function () {
    this.currentRank = new Array(8);
  },

  onPiece: function (pieceToken, fileIndex) {
    this.currentRank[fileIndex] = pieceToken;
  },

  onRankEnd: function () {
    if (isUtils.isObject(this.data) && Array.isArray(this.data.board)) {
      this.data.board.push(this.currentRank);
    }

    return this.currentRank;
  },

  onPiecePlacementEnd: function () {
    delete this.currentRank;
    return this.data.field;
  },

  setActiveColor: function (colorName) {
    if (isUtils.isObject(this.data)) {
      this.data.activeColor = colorName;
    }

    return colorName;
  },

  onWhiteActiveColor: function () {
    return listeners.setActiveColor('white');
  },

  onBlackActiveColor: function () {
    return listeners.setActiveColor('black');
  },

  onEnd: function() {
    return this.data;
  },

  onCastlingAvailability: function (castlingAvalibility) {
    if (isUtils.isObject(this.data)) {
      this.data.castlingAvalibility = castlingAvalibility;
    }

    return castlingAvalibility;
  }
};

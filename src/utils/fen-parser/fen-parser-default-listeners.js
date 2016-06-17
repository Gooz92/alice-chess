'use strict';

var isTypeUtils = require('../common-utils/is-type-utils');

var listeners = module.exports = {
  onStart: function() {
    this.data = {};
  },

  onPiecePlacementStart: function () {
    if (!isTypeUtils.isObject(this.data)) {
      this.data = {};
    }

    this.data.board = [];
  },

  onRankStart: function () {
    this.currentRank = new Array(8);
  },

  onPiece: function (pieceToken, fileIndex) {
    this.currentRank[fileIndex] = pieceToken;
  },

  onRankEnd: function () {
    if (isTypeUtils.isObject(this.data) && Array.isArray(this.data.board)) {
      this.data.board.push(this.currentRank);
    }

    return this.currentRank;
  },

  onPiecePlacementEnd: function () {
    delete this.currentRank;
    return this.data.board;
  },

  setActiveColor: function (colorName) {
    if (isTypeUtils.isObject(this.data)) {
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
    if (isTypeUtils.isObject(this.data)) {
      this.data.castlingAvalibility = castlingAvalibility;
    }

    return castlingAvalibility;
  }
};

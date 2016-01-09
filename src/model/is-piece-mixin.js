'use strict';

module.exports = {
  isPawn: function () {
    return this.token === 'p';
  },

  isRook: function () {
    return this.token === 'r';
  },

  isKnight: function () {
    return this.token === 'n';
  },

  isBishop: function () {
    return this.token === 'b';
  },

  isQueen: function () {
    return this.token === 'q';
  },

  isKing: function () {
    return this.token === 'k';
  }
};

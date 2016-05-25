'use strict';

var RookMove = require('./rook-move'),
  Capture = require('./capture');

function RookCapture(sourceSquare, targetSquare) {
  Capture.call(this, sourceSquare, targetSquare);
}

RookCapture.prototype = {
  constructor: RookCapture,

  make: function () {
    Capture.prototype.call(this);
    RookMove.prototype.call(this);
  },

  unMake: function (params) {

  }
};

module.exports = RookCapture;

'use strict';

var RookMove = require('./rook-move'),
  Capture = require('./capture');

function RookCapture(sourceSquare, targetSquare) {
  Capture.call(this, sourceSquare, targetSquare);
}

RookCapture.prototype = {
  constructor: RookCapture,

  make: function () {
   this.capturedPiece.remove();
   RookMove.prototype.make.call(this);
  },

  unMake: function (params) {
    RookMove.prototype.unMake.call(this);
    Capture.prototype._placeCapturedPiece.call(this);
  },

  toSAN: function () {
    return 'Rx' + this.targetSquare.name;
  }
};

module.exports = RookCapture;

'use strict';

var KingMove = require('./king-move'),
  Capture = require('./capture');

function KingCapture(sourceSquare, targetSquare) {
  Capture.call(this. sourceSquare, targetSquare);
}

KingCapture.prototype = {
  constructor: KingCapture,

  make: function () {
    this.capturedPiece.remove();
    KingMove.prototype.make.call(this);
  },

  unMake: function () {
    KingMove.prototype.unMake.call(this);
    Capture.prototype._placeCapturedPiece.call(this);
  },

  toSAN: function () {
    return 'Kx' + this.targetSquare.name;
  }
};

module.exports = KingCapture;

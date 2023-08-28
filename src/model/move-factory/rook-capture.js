'use strict';

const RookMove = require('./rook-move'),
  Capture = require('./capture');

class RookCapture extends Capture {
  make() {
    this.capturedPiece.remove();
    RookMove.prototype.make.call(this);
  }
 
  unMake() {
    RookMove.prototype.unMake.call(this);
    Capture.prototype._placeCapturedPiece.call(this);
  }

  toSAN() {
    return 'Rx' + this.targetSquare.name;
  }
}

module.exports = RookCapture;

const KingMove = require('./king-move'),
  Capture = require('./capture');

class KingCapture extends Capture {
  make() {
    this.capturedPiece.remove();
    KingMove.prototype.make.call(this);
  }

  unMake() {
    KingMove.prototype.unMake.call(this);
    Capture.prototype._placeCapturedPiece.call(this);
  }

  toSAN() {
    return 'Kx' + this.targetSquare.name;
  }
}

module.exports = KingCapture;

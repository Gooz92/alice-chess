'use strict';

var Move = require('./move');

function Capture(sourceSquare, targetSquare) {
  Move.call(this, sourceSquare, targetSquare);
  this.capturedPiece = targetSquare.piece;
}

Capture.prototype = {
  constructor: Capture,

  make: function () {
    this.capturedPiece.remove();
    Move.prototype.make.call(this);
  },

  unMake: function () {
    var opponentColorname = this.capturedPiece.color.name;

    Move.prototype.unMake.call(this);

    this.targetSquare.piece = this.capturedPiece;
    this.capturedPiece.square = this.targetSquare;

    this.targetSquare.chess.pieces[opponentColorname].push(this.capturedPiece);
  },

  toSAN: function (options) {
    if (this.piece.isPawn()) {
      return this.sourceSquare.getFileName() + 'x' + this.targetSquare.name;
    }

    return this.piece.token.toUpperCase() + 'x' + this.targetSquare.name;
  }
};

module.exports = Capture;
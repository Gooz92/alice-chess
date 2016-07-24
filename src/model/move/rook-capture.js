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
    var opponentColorName = this.capturedPiece.color.name;

    RookMove.prototype.unMake.call(this);

    this.targetSquare.piece = this.capturedPiece;
    this.capturedPiece.squares = this.targetSquare;

    this.targetSquare.chess.pieces[opponentColorName].push(this.capturedPiece);
  },

  toSAN: function () {
    return 'Rx' + this.targetSquare.name;
  }
};

module.exports = RookCapture;

'use strict';

var Move = require('./move'),
  objectUtils = require('../../utils/common-utils/object-utils');

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
    var opponentColorName = this.capturedPiece.color.name;

    Move.prototype.unMake.call(this);

    this._placeCapturedPiece();
  },

  _placeCapturedPiece: function () {
    var opponentColorName = this.capturedPiece.color.name;

    this.targetSquare.piece = this.capturedPiece;
    this.capturedPiece.square = this.targetSquare;

    this.targetSquare.chess.pieces[opponentColorName].push(this.capturedPiece);
  },

  toSAN: function (options) {
    var separator = '';

    options = objectUtils.defaults(options, {
      notes: {
        capture: true
      }
    });

    if (options.notes.capture) {
      separator = 'x';
    }

    if (this.piece.isPawn()) {
      return [
        this.sourceSquare.fileName,
        this.targetSquare.name
      ].join(separator);
    }

    return [
      this.piece.token.toUpperCase(),
      this.targetSquare.name
    ].join(separator);
  }
};

module.exports = Capture;
'use strict';

const Move = require('./move'),
  objectUtils = require('../../utils/common-utils/object-utils');

class Capture extends Move {
  constructor(sourceSquare, targetSquare) {
    super(sourceSquare, targetSquare);

    this.capturedPiece = targetSquare.piece;

    this.disambiguateRank = false;
    this.disambiguateFile = false;
  }

  make() {
    this.capturedPiece.remove();
    Move.make(this);
  }

  unMake() {
    Move.unMake(this);

    this._placeCapturedPiece();
  }

  _placeCapturedPiece() {
    const opponentColorIndex = this.capturedPiece.color.index;

    this.targetSquare.piece = this.capturedPiece;
    this.capturedPiece.square = this.targetSquare;

    this.targetSquare.chess.pieces[opponentColorIndex].push(this.capturedPiece);
  }

  toSAN(options) {
    let separator = '',
      disambiguation = this.getSanDisambiguation.call(this);

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
      this.piece.token.toUpperCase() + disambiguation,
      this.targetSquare.name
    ].join(separator);
  }
}

module.exports = Capture;
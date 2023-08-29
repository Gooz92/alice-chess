'use strict';

class Move {

  constructor(sourceSquare, targetSquare) {
    this.sourceSquare = sourceSquare;
    this.targetSquare = targetSquare;
    this.piece = sourceSquare.piece;

    this.disambiguateRank = false;
    this.disambiguateFile = false;
  }

  make() {
    Move.make(this);
  }

  unMake() {
    Move.unMake(this);
  }

  getSanDisambiguation() {
    var disambiguation = '';

    if (this.disambiguateFile) {
      disambiguation += this.sourceSquare.fileName;
    }

    if (this.disambiguateRank) {
      disambiguation += this.sourceSquare.rankName;
    }

    return disambiguation;
  }

  toSAN() {
    if (this.piece.isPawn()) {
      return this.targetSquare.name;
    }

    return [
      this.piece.token.toUpperCase(),
      this.getSanDisambiguation(),
      this.targetSquare.name
    ].join('');
  }

  toLAN() {
    return [
      this.sourceSquare.name,
      this.targetSquare.name,
      this.promotedPieceToken ? this.promotedPieceToken.toLowerCase() : ''
    ].join('');
  }
}

Move.make = function (move) {
  const chess = move.targetSquare.chess;

  move.sourceSquare.piece.moveTo(move.targetSquare);

  chess.turn();
  move.previousEnPassantTargetSquare = chess.enPassantTargetSquare;
  chess.enPassantTargetSquare = null;

  move.previousMove = chess.previousMove;

  chess.previousMove = move;
};

Move.unMake = function (move) {
  var chess = move.targetSquare.chess;

  move.targetSquare.piece.moveTo(move.sourceSquare);

  chess.enPassantTargetSquare = move.previousEnPassantTargetSquare;
  chess.turn();

  chess.previousMove = move.previousMove;
}

module.exports = Move;
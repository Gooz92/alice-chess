'use strict';

var arrayUtils = require('../../utils/common-utils/array-utils'),
  objectUtils = require('../../utils/common-utils/object-utils');

function Move(sourceSquare, targetSquare) {
  this.sourceSquare = sourceSquare;
  this.targetSquare = targetSquare;
  this.piece = sourceSquare.piece;

  this.disambiguateRank = false;
  this.disambiguateFile = false;
}

Move.make = function (move) {
  var chess = move.targetSquare.chess;

  move.sourceSquare.piece.moveTo(move.targetSquare);

  chess.turn();
  move.previousEnPassantTargetSquare = chess.enPassantTargetSquare;
  chess.enPassantTargetSquare = null;

  move.previuosMove = chess.previuosMove;
  chess.previuosMove = move;
};

Move.unMake = function (move) {
  var chess = move.targetSquare.chess;

  move.targetSquare.piece.moveTo(move.sourceSquare);

  chess.enPassantTargetSquare = move.previousEnPassantTargetSquare;
  chess.turn();

  chess.previuosMove = move.previuosMove;
}

Move.prototype = {
  constructor: Move,

  make: function () {
    Move.make(this);
  },

  unMake: function () {
    Move.unMake(this);
  },

  getSanDisambiguation: function () {
    var disambiguation = '';

    if (this.disambiguateFile) {
      disambiguation += this.sourceSquare.fileName;
    }

    if (this.disambiguateRank) {
      disambiguation += this.sourceSquare.rankName;
    }

    return disambiguation;
  },

  // TODO
  toSAN: function () {
    if (this.piece.isPawn()) {
      return this.targetSquare.name;
    }

    return [
      this.piece.token.toUpperCase(),
      this.getSanDisambiguation(),
      this.targetSquare.name
    ].join('');
  }
};

module.exports = Move;
'use strict';

var arrayUtils = require('../../utils/common-utils/array-utils'),
  objectUtils = require('../../utils/common-utils/object-utils');

function Move(sourceSquare, targetSquare) {
  this.sourceSquare = sourceSquare;
  this.targetSquare = targetSquare;
  this.piece = sourceSquare.piece;
}

Move.prototype = {
  constructor: Move,

  make: function () {
    var chess = this.targetSquare.chess;

    this.sourceSquare.piece.moveTo(this.targetSquare);

    chess.turn();
    chess.history.push(this);
  },

  unMake: function () {
    var chess = this.targetSquare.chess;

    this.targetSquare.piece.moveTo(this.sourceSquare);

    // remove this shit and update clear e.p. square during move execution
    chess.enPassantTargetSquare = this.previousEnPassantTagetSquare;
    chess.turn();
    arrayUtils.remove(chess.history, this);
  },

  getSanDisambiguation: function (disambiguationOptions) {
    var disambiguation = '';

    disambiguationOptions = disambiguationOptions || {};

    if (disambiguationOptions.file) {
      disambiguation += this.sourceSquare.fileName;
    }

    if (disambiguationOptions.rank) {
      disambiguation += this.sourceSquare.rankName;
    }

    return disambiguation;
  },

  // TODO
  toSAN: function (options) {
    if (this.piece.isPawn()) {
      return this.targetSquare.name;
    }

    options = objectUtils.defaults(options, {
      disambiguation: {
        rank: false,
        file: false
      }
    });

    return [
      this.piece.token.toUpperCase(),
      this.getSanDisambiguation(options.disambiguation),
      this.targetSquare.name
    ].join('');
  }
};

module.exports = Move;
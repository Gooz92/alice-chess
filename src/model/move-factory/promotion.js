'use strict';

var arrayUtils = require('../../utils/common-utils/array-utils');

function Promotion(sourceSquare, targetSquare, promotedPieceToken) {
  this.sourceSquare = sourceSquare;
  this.targetSquare = targetSquare;
  this.promotedPieceToken = promotedPieceToken;
  this.piece = sourceSquare.piece;
}

Promotion.prototype.make = function () {
  var chess = this.targetSquare.chess;

  this.piece.remove();
  this.previousEnPassantTargetSquare = chess.enPassantTargetSquare;
  chess.enPassantTargetSquare = null;
  chess.placePiece(this.promotedPieceToken, this.targetSquare.name);
  chess.turn();
  chess.history.push(this);
};

Promotion.prototype.unMake = function () {
  var chess = this.targetSquare.chess;

  this.targetSquare.piece.remove();

  this.sourceSquare.piece = this.piece;
  this.piece.square = this.sourceSquare;

  chess.pieces[this.piece.color.index].push(this.piece);
  chess.enPassantTargetSquare = this.previousEnPassantTargetSquare;
  chess.turn();
  arrayUtils.remove(chess.history, this);
};

Promotion.prototype.toSAN = function () {
  return this.targetSquare.name + '=' + this.promotedPieceToken.toUpperCase();
};

module.exports = Promotion;

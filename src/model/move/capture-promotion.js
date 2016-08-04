'use strict';

var arrayUtils = require('../../utils/common-utils/array-utils'),
  Capture = require('./capture');

function CapturePromotion(sourceSquare, targetSquare, promotedPieceToken) {
  this.sourceSquare = sourceSquare;
  this.targetSquare = targetSquare;
  this.promotedPieceToken = promotedPieceToken;
  this.piece = sourceSquare.piece;
  this.capturedPiece = targetSquare.piece;
}

CapturePromotion.prototype.make = function () {
  var chess = this.targetSquare.chess;

  this.piece.remove();
  this.capturedPiece.remove();

  chess.placePiece(this.promotedPieceToken, this.targetSquare.name);
  chess.turn();
  chess.history.push(this);
};

CapturePromotion.prototype.unMake = function () {
  var chess = this.targetSquare.chess;

  this.targetSquare.piece.remove();

  Capture.prototype._placeCapturedPiece.call(this);

  this.sourceSquare.piece = this.piece;
  this.piece.square = this.sourceSquare;

  chess.pieces[this.piece.color.name].push(this.piece);

  chess.turn();
  arrayUtils.remove(chess.history, this);
};

CapturePromotion.prototype.toSAN = function () {

};

module.exports = CapturePromotion;

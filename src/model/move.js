'use strict';

var isUtils = require('../utils/common-utils/is-utils'),
  objectUtils = require('../utils/common-utils/object-utils'),
  arrayUtils = require('../utils/common-utils/array-utils');

var Move = function (sourceSquare, targetSquare) {
  this.sourceSquare = sourceSquare;
  this.targetSquare = targetSquare;
  this.piece = this.sourceSquare.piece;
};

Move.createSilentMove = function (sourceSquare, targetSquare) {
  return new Move(sourceSquare, targetSquare);
};

Move.createCapture = function (sourceSquare, targetSquare) {
  return new Capture(sourceSquare, targetSquare);
};

Move.create = function (sourceSquare, targetSquare, promotionPiece) {
  if (targetSquare.isOccupied() && isUtils.isUndefined(promotionPiece)) {
    return new Capture(sourceSquare, targetSquare);
  }

  if (sourceSquare.piece.isPawn()) {
    return createPawnMove(sourceSquare, targetSquare, promotionPiece);
  }

  if (sourceSquare.piece.isKing() &&
      sourceSquare.getFileDistance(targetSquare) === 2) {
    return new Castling(sourceSquare, targetSquare);
  }

  return new Move(sourceSquare, targetSquare);
};

Move.createBigPawnMove = function (sourceSquare, targetSquare) {
  return new BigPawn(sourceSquare, targetSquare);
};

Move.createEnPassant = function (sourceSquare, targetSquare) {
  return new EnPassant(sourceSquare, targetSquare);
};

function createPawnMove(sourceSquare, targetSquare, promotionPiece) {
  var pawn, targetSquareRankIndex, chess;

  if (sourceSquare.getRankDistance(targetSquare) === 2) {
    return new BigPawn(sourceSquare, targetSquare);
  }

  chess = targetSquare.chess;

  targetSquareRankIndex = targetSquare.getRankIndex();

  if (targetSquare.isTargetEnPassantSquare() && (
    (targetSquareRankIndex === 2 && chess.activeColor.isBlack()) ||
    (targetSquareRankIndex === 5 && chess.activeColor.isWhite()))) {
    return new EnPassant(sourceSquare, targetSquare);
  }

  pawn = sourceSquare.piece;

  if (isUtils.isDefined(promotionPiece)) {
    return new PawnPromotion(sourceSquare, targetSquare, promotionPiece);
  }

  return new Move(sourceSquare, targetSquare);
}

Move.prototype.make = function () {
  var chess = this.targetSquare.chess;

  this.piece.moveTo(this.targetSquare);

  this.changesInCastling = [];

  chess.turn();
  chess.history.push(this);

   // TODO optimize castlingAvalibility updating
  if (this.piece.isRook()) {
    if (this.sourceSquare.getFileIndex() === 0) {
      if (chess.castlingAvalibility[2 * this.piece.color.index + 1]) {
        this.changesInCastling.push(2 * this.piece.color.index + 1);
        chess.castlingAvalibility[2 * this.piece.color.index + 1] = false;
      }
    } else if (this.sourceSquare.getFileIndex() === 7) {
      if (chess.castlingAvalibility[2 * this.piece.color.index]) {
        chess.castlingAvalibility[2 * this.piece.color.index] = false;
        this.changesInCastling.push(2 * this.piece.color.index);
      }
    }
  }

  // TODO optimize castlingAvalibility updating
  if (this.piece.isKing()) {
    if (chess.castlingAvalibility[2 * this.piece.color.index]) {
      chess.castlingAvalibility[2 * this.piece.color.index] = false;
      chess.castlingAvalibility[2 * this.piece.color.index + 1] = false;
      this.changesInCastling.push(
        2 * this.piece.color.index,
        this.piece.color.index + 1
      );
    }
  }
};

Move.prototype.unMake = function () {
  var chess = this.targetSquare.chess;

  this.piece.moveTo(this.sourceSquare);

  chess.enPassantTargetSquare = this.previousEnPassantTagetSquare;

  this.changesInCastling.forEach(function (index) {
    chess.castlingAvalibility[index] = true;
  });

  this.targetSquare.chess.turn();
  arrayUtils.remove(this.targetSquare.chess.history, this);
};

Move.prototype.toSAN = function () {
  var san = this.targetSquare.name;

  if (!this.piece.isPawn()) {
    san = this.piece.token.toUpperCase() + san;
  }

  return san;
};

Move.prototype.toLongSAN = function () {
  return this.sourceSquare.name + '-' + this.targetSquare.name;
};

var BigPawn = objectUtils.inherit(function (sourceSquare, targetSquare) {
  this.super.constructor.call(this, sourceSquare, targetSquare);
}, Move);

BigPawn.prototype.make = function () {
  var chess = this.targetSquare.chess,
    squareIndexOffset = this.piece.color.isWhite() ? -16 : 16,
    epTargetSquareIndex = this.targetSquare.index + squareIndexOffset,
    epTargetSquare = chess.squares[epTargetSquareIndex];

  this.super.make.call(this);

  chess.enPassantTargetSquare = epTargetSquare;
};

var Capture = objectUtils.inherit(function (sourceSquare, targetSquare) {
  this.super.constructor.call(this, sourceSquare, targetSquare);
  this.capturedPiece = targetSquare.piece;
}, Move);

Capture.prototype.make = function () {
  this.targetSquare.piece.remove();
  this.super.make.call(this);
};

Capture.prototype.unMake = function () {
  var capturedPieceColor = this.capturedPiece.color.name;

  this.super.unMake.call(this);

  this.targetSquare.piece = this.capturedPiece;
  this.capturedPiece.square = this.targetSquare;
  this.targetSquare.chess.pieces[capturedPieceColor].push(this.capturedPiece);
};

Capture.prototype.toSAN = function () {
  if (this.piece.isPawn()) {
    return this.sourceSquare.getFileName() + 'x' + this.targetSquare.name;
  }

  return this.piece.token.toUpperCase() + 'x' + this.targetSquare.name;
};

var EnPassant = objectUtils.inherit(function (sourceSquare, targetSquare) {
  this.super.constructor.call(this, sourceSquare, targetSquare);
  this.capturedPawn = this.getCapturedPawn();
}, Move);

EnPassant.prototype.getCapturedPawn = function () {
  var chess = this.targetSquare.chess,
    squareIndexOffset = this.sourceSquare.piece.color.isWhite() ? -16 : 16,
    capturedPawnSquareIndex = this.targetSquare.index + squareIndexOffset,
    capturedPawn = chess.squares[capturedPawnSquareIndex].piece;

  return capturedPawn;
};

EnPassant.prototype.make = function () {
  this.capturedPawn.remove();
  this.super.make.call(this);
};

EnPassant.prototype.unMake = function () {
  var chess = this.targetSquare.chess;

  this.super.unMake.call(this);

  var squareIndexOffset = this.sourceSquare.piece.color.isWhite() ? -16 : 16,
    capturedPawnSquareIndex = this.targetSquare.index + squareIndexOffset;

  this.capturedPawn.square = chess.squares[capturedPawnSquareIndex];
  this.capturedPawn.square.piece = this.capturedPawn;
  chess.pieces[this.capturedPawn.color.name].push(this.capturedPawn);
};

EnPassant.prototype.toSAN = function () {
  return this.sourceSquare.getFileName() + 'x' + this.targetSquare.name;
};

var PawnPromotion = objectUtils.inherit(
  function (sourceSquare, targetSquare, promotedPiece) {
    this.super.constructor.call(this, sourceSquare, targetSquare);
    this.promotedPiece = promotedPiece;
  },
Move);

PawnPromotion.prototype.make = function () {
  var chess = this.targetSquare.chess;

  if (this.targetSquare.isOccupied()) {
    this.capturedPiece = this.targetSquare.piece;
    this.targetSquare.piece.remove();
  }

  this.piece.remove();

  this.promotedPiece = chess.placePiece(
    this.promotedPiece,
    this.targetSquare.name
  );

  this.previousEnPassantTagetSquare = chess.enPassantTargetSquare;
  this.targetSquare.chess.turn();
};

PawnPromotion.prototype.unMake = function () {
  var chess = this.targetSquare.chess;

  this.promotedPiece.remove();

  chess.placePiece(
    this.piece,
    this.sourceSquare.name
  );

  chess.enPassantTargetSquare = this.previousEnPassantTagetSquare;
};

var Castling = objectUtils.inherit(function (sourceSquare, targetSquare) {
  this.super.constructor.call(this, sourceSquare, targetSquare);
}, Move);

Castling.prototype.make = function () {
   var chess = this.targetSquare.chess,
      targetFileIndex = this.targetSquare.getFileIndex(),
      rook, rookTargetSquare;

  if (this.piece.isWhite()) {
    if (targetFileIndex === 2) { // king-side
      rook = chess.getSquareByName('a1').piece;
      rookTargetSquare = chess.getSquareByName('d1');
    } else { // queen-side
      rook = chess.getSquareByName('h1').piece;
      rookTargetSquare = chess.getSquareByName('f1');
    }
  } else {
    if (targetFileIndex === 2) {
      rook = chess.getSquareByName('a8').piece;
      rookTargetSquare = chess.getSquareByName('d8');
    } else {
      rook = chess.getSquareByName('h8');
      rookTargetSquare = chess.getSquareByName('f8');
    }
  }

  this.rookMove = rook.createMove(rookTargetSquare);
  this.rookMove.make();
  this.super.make.call(this);
};

Castling.prototype.unMake = function () {
  this.super.unMake.call(this);
  this.rookMove.unMake();
};

module.exports = Move;

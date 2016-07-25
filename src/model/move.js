'use strict';

var isTypeUtils = require('../utils/common-utils/is-type-utils'),
  objectUtils = require('../utils/common-utils/object-utils'),
  arrayUtils = require('../utils/common-utils/array-utils'),
  Move = require('./move/move'),
  Capture = require('./move/capture'),
  RookCapture = require('./move/rook-capture'),
  RookMove = require('./move/rook-move'),
  KingMove = require('./move/king-move'),
  KingCapture = require('./move/king-capture'),
  ShortCastling = require('./move/short-castling');

Move.createSilentMove = function (sourceSquare, targetSquare) {
  return new Move(sourceSquare, targetSquare);
};

Move.createCapture = function (sourceSquare, targetSquare) {
  return new Capture(sourceSquare, targetSquare);
};

Move.createRookMove = function (sourceSquare, targetSquare) {
  return new RookMove(sourceSquare, targetSquare);
};

Move.createRookCapture = function (sourceSquare, targetSquare) {
  return new RookCapture(sourceSquare, targetSquare);
};

Move.createKingMove = function (sourceSquare, targetSquare) {
  return new KingMove(sourceSquare, targetSquare);
};

Move.createKingCapture = function (sourceSquare, targetSquare) {
  return new KingCapture(sourceSquare, targetSquare);
};

Move.createShortCastling = function (king, rook) {
  return new ShortCastling(king, rook);
};

Move.create = function (sourceSquare, targetSquare, promotionPiece) {
  if (targetSquare.isOccupied() && isTypeUtils.isUndefined(promotionPiece)) {
    return new Capture(sourceSquare, targetSquare);
  }

  if (sourceSquare.piece.isPawn()) {
    return createPawnMove(sourceSquare, targetSquare, promotionPiece);
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

  if (isTypeUtils.isDefined(promotionPiece)) {
    return new PawnPromotion(sourceSquare, targetSquare, promotionPiece);
  }

  return new Move(sourceSquare, targetSquare);
}

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

module.exports = Move;

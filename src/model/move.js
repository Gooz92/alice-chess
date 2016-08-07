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
  ShortCastling = require('./move/short-castling'),
  LongCastling = require('./move/long-castling'),
  EnPassant = require('./move/en-passant');

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

Move.createLongCastling = function (king, rook) {
  return new LongCastling(king, rook);
};

Move.createBigPawnMove = function (sourceSquare, targetSquare) {
  return new BigPawn(sourceSquare, targetSquare);
};

Move.createEnPassant = function (sourceSquare, targetSquare) {
  return new EnPassant(sourceSquare, targetSquare);
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

module.exports = Move;

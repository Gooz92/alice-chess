'use strict';

const Move = require('./move'),
  Capture = require('./capture'),
  RookCapture = require('./rook-capture'),
  RookMove = require('./rook-move'),
  KingMove = require('./king-move'),
  KingCapture = require('./king-capture'),
  ShortCastling = require('./short-castling'),
  LongCastling = require('./long-castling'),
  EnPassant = require('./en-passant'),
  BigPawn = require('./big-pawn'),
  Promotion = require('./promotion'),
  CapturePromotion = require('./capture-promotion');

module.exports = {
  createSilentMove: function (sourceSquare, targetSquare) {
    return new Move(sourceSquare, targetSquare);
  },

  createCapture: function (sourceSquare, targetSquare) {
    return new Capture(sourceSquare, targetSquare);
  },

  createRookMove: function (sourceSquare, targetSquare) {
    return new RookMove(sourceSquare, targetSquare);
  },

  createRookCapture: function (sourceSquare, targetSquare) {
    return new RookCapture(sourceSquare, targetSquare);
  },

  createKingMove: function (sourceSquare, targetSquare) {
    return new KingMove(sourceSquare, targetSquare);
  },

  createKingCapture: function (sourceSquare, targetSquare) {
    return new KingCapture(sourceSquare, targetSquare);
  },

  createShortCastling: function (king, rook) {
    return new ShortCastling(king, rook);
  },

  createLongCastling: function (king, rook) {
    return new LongCastling(king, rook);
  },

  createBigPawnMove: function (sourceSquare, targetSquare) {
    return new BigPawn(sourceSquare, targetSquare);
  },

  createEnPassant: function (sourceSquare, targetSquare) {
    return new EnPassant(sourceSquare, targetSquare);
  },

  createPromotion: function (sourceSquare, targetSquare, pieceToken) {
    return new Promotion(sourceSquare, targetSquare, pieceToken);
  },

  createCapturePromotion: function (sourceSquare, targetSquare, pieceToken) {
    return new CapturePromotion(sourceSquare, targetSquare, pieceToken);
  }
};

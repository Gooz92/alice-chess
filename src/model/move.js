'use strict';

var isUtils = require('../utils/common-utils/is-utils'),
  objectUtils = require('../utils/common-utils/object-utils');

// TODO castling, pawn promotions !!!!

var SilentMove = function (sourceSquare, targetSquare) {
  this.sourceSquare = sourceSquare;
  this.targetSquare = targetSquare;
  this.piece = this.sourceSquare.piece;
};

SilentMove.prototype.make = function () {
  var enPassantTargetSquare = this.sourceSquare.chess.enPassantTargetSquare;

  this.piece.moveTo(this.targetSquare);

  this.previousEnPassantTagetSquare = enPassantTargetSquare;
  this.targetSquare.chess.turn();
};

SilentMove.prototype.unMake = function () {
  var chess = this.targetSquare.chess;

  this.piece.moveTo(this.sourceSquare);

  chess.enPassantTargetSquare = this.previousEnPassantTagetSquare;

  this.targetSquare.chess.turn();
};

SilentMove.prototype.toSAN = function () {
  var san = this.targetSquare.getName();

  if (!this.piece.isPawn()) {
    san = this.piece.token.toUpperCase() + san;
  }

  return san;
};

var BigPawn = objectUtils.inherit(function (sourceSquare, targetSquare) {
  this.super.constructor.call(this, sourceSquare, targetSquare);
}, SilentMove);

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
}, SilentMove);

Capture.prototype.make = function () {
  this.targetSquare.piece.remove();
  this.super.make.call(this);
};

Capture.prototype.unMake = function () {
  this.super.unMake.call(this);

  // TODO preformance
  this.targetSquare.chess.placePiece(
    this.capturedPiece.getFenToken(),
    this.targetSquare.getName()
  );
};

var EnPassant = objectUtils.inherit(function (sourceSquare, targetSquare) {
  this.super.constructor.call(this, sourceSquare, targetSquare);
  this.capturedPawn = this.getCapturedPawn();
}, SilentMove);

EnPassant.prototype.getCapturedPawn = function () {
  var chess = this.targetSquare.chess,
    squareIndexOffset = this.soureSquare.piece.isWhite() ? -16 : 16,
    capturedPawnSquareIndex = this.tagertSquare.index + squareIndexOffset,
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

  // TODO performance
  chess.placePiece(
    this.capturedPawn.getFenToken(),
    this.capturedPawn.square.getName()
  );
};

function getPawnExecuteMoveFunction(sourceSquare, targetSquare) {
  var execute = execution.silentMove,
    pawn = sourceSquare.piece;

  if (sourceSquare.getRankDistance(targetSquare) === 2) {
    execute = execution.bigPawn;
  } else if (targetSquare.isTargetEnPassantSquare()) {
    execute = execution.enPassant;
  } else if ((pawn.color.isWhite() && targetSquare.getRankIndex() === 7) ||
              (pawn.color.isBlack() && targetSquare.getRankIndex() === 8)) {
    execute = execution.promotion;
  }

  return execute;
}

function getExecuteFunction(sourceSquare, targetSquare) {
  var execute = execution.silentMove,
    piece = sourceSquare.piece;

  if (targetSquare.isOccupiedByOpponent(piece.color)) {
    execute = execution.capture;
  }

  if (piece.isPawn()) {
    execute = getPawnExecuteMoveFunction(piece, targetSquare);
  } else if (piece.isKing() &&
             sourceSquare.getFileDistance(targetSquare) === 2) {
    execute = execution.castling;
  } else {
    execute = execution.silentMove;
  }

  return execute;
}

var execution = {

  promotion: function () {
    var chess = this.targetSquare.chess,
      targetSquareName = this.tagetSquare.getName();

    chess.placePiece(this.promotedPiece, targetSquareName);

    this.piece.remove();

    chess.turn();
  },

  castling: function () {
    var chess = this.targetSquare.chess,
      targetFileIndex = this.targetSquare.getFileIndex(),
      rook, rookMove,
      rookTargetSquare;

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

    rookMove = rook.createMove(rookTargetSquare);
    rookMove.execute();
    execution.silentMove();
  }
};

module.exports = SilentMove;

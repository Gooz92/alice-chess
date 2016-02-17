'use strict';

var isUtils = require('../utils/common-utils/is-utils');

// TODO castling, pawn promotions !!!!

function Move(piece, targetSquare, promotedPiece) {
  this.piece = piece;
  this.targetSquare = targetSquare;
  this.promotedPiece = promotedPiece;
  this.execute = getExecuteFunction(piece, targetSquare);
}

function getPawnExecuteMoveFunction(pawn, targetSquare) {
  var execute = execution.silentMove;

  if (pawn.square.getRankDistance(targetSquare) === 2) {
    execute = execution.bigPawn;
  } else if (targetSquare.isTargetEnPassantSquare()) {
    execute = execution.enPassant;
  } else if ((pawn.color.isWhite() && targetSquare.getRankIndex() === 7) ||
              (pawn.color.isBlack() && targetSquare.getRankIndex() === 8)) {
    execute = execution.promotion;
  }

  return execute;
}

function getExecuteFunction(piece, targetSquare) {
  var execute = execution.silentMove;

  if (targetSquare.isOccupiedByOpponent(piece.color)) {
    execute = execution.capture;
  }

  if (piece.isPawn()) {
    execute = getPawnExecuteMoveFunction(piece, targetSquare);
  } else if (piece.isKing() &&
             piece.square.getFileDistance(targetSquare) === 2) {
    execute = execution.castling;
  } else {
    execute = execution.silentMove;
  }

  return execute;
}

var execution = {
  silentMove: function  () {
    delete this.piece.square.piece;

    this.targetSquare.piece = this.piece;
    this.piece.square = this.targetSquare;

    this.targetSquare.chess.turn();
  },

  bigPawn: function () {
    var chess = this.targetSquare.chess,
      squareIndexOffset = this.piece.color.isWhite() ? -16 : 16,
      epTargetSquareIndex = this.targetSquare.index + squareIndexOffset,
      epTargetSquare = chess.squares[epTargetSquareIndex];

    chess.enPassantTargetSquare = epTargetSquare;

    // TODO performance
    execution.silentMove.call(this);
  },

  enPassant: function () {
    var chess = this.targetSquare.chess,
      squareIndexOffset = this.piece.isWhite() ? -16 : 16,
      capturedPawnSquareIndex = this.tagertSquare.index + squareIndexOffset,
      capturedPawn = chess.squares[capturedPawnSquareIndex].piece;

    capturedPawn.remove();

    this.silentMove();
  },

  capture: function () {
    this.targetSquare.piece.remove();
    execution.silentMove.call(this);
  },

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

Move.prototype = {
  constructor: Move,

  isPawnBigMove: function () {
    var sourceRankIndex = this.piece.square.getRankIndex(),
      destinationRankIndex = this.targetSquare.getRankIndex(),
      rankDistance = Math.abs(sourceRankIndex - destinationRankIndex);

    return this.piece.isPawn() && rankDistance === 2;
  },

  updateEnPassantSquareIndex: function () {
    var chess = this.targetSquare.chess,
      offset;

    if (!this.isPawnBigMove()) {
      delete chess.enPassantSquareIndex;
      return;
    }

    offset = this.piece.color.isWhite() ? -16 : 16;
    chess.enPassantSquareIndex = this.targetSquare.index + offset;
    // TODO ???
    chess.enPassantPawn = this.piece;
  },

  isCapture: function () {
    return this.targetSquare.isOccupiedByOpponent(this.piece.color);
  },

  isEnPassant: function () {
    var sourceFileIndex, destinationFileIndex;

    if (!this.piece.isPawn() || this.targetSquare.isOccupied()) {
      return false;
    }

    sourceFileIndex = this.piece.square.getFileIndex();
    destinationFileIndex = this.targetSquare.getFileIndex();

    return sourceFileIndex !== destinationFileIndex;
  },

  toSAN: function () {
    var san = this.targetSquare.getName();

    if (isUtils.isPresent(this.promotedPiece)) {
      san += '=' + this.promotedPiece.token.toUpperCase();
    } else if (!this.piece.isPawn()) {
      san = this.piece.token.toUpperCase() + san;
    }

    return san;
  },

  toLongSAN: function () {
    var sourceSquareName = this.piece.square.getName(),
      destinationSquareName = this.targetSquare.getName();

    return sourceSquareName + '-' + destinationSquareName;
  }
};

module.exports = Move;

'use strict';

// TODO castling, pawn promotions !!!!

function Move(piece, targetSquare) {
  this.piece = piece;
  this.targetSquare = targetSquare;

  if (targetSquare.isOccupiedByOpponent(piece.color)) {
    this.execute = execution.capture;
  }

  if (piece.isPawn()) {
    if (piece.square.getRankDistance(targetSquare) === 2) {
      this.execute = execution.bigPawn;
    } else if (targetSquare.isTargetEnPassantSquare()) {
      this.execute = execution.enPassant;
    } else if ((piece.color.isWhite() && targetSquare.getRankIndex() === 7) ||
               (piece.color.isBlack() && targetSquare.getRankIndex() === 8)) {
      this.execute = execution.promotion;
    } else {
      this.execute = execution.silentMove;
    }
  } else if (piece.isKing() &&
             piece.square.getFileDistance(targetSquare) === 2) {
    this.execute = execution.castling;
  } else {
    this.execute = execution.silentMove;
  }
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

    if (!this.piece.isPawn()) {
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

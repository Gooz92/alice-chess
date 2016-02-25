'use strict';

var Square = require('./square'),
  Color = require('./color'),
  Piece = require('./piece'),
  Move = require('./move'),
  boardUtils = require('../utils/chess-utils/board-utils'),
  objectUtils = require('../utils/common-utils/object-utils'),
  rays = require('../utils/chess-utils/rays'),
  startPosition = require('../utils/chess-utils/start-position');

function Chess() {
  this.activeColor = Color.WHITE;

  this.pieces = {
    white: [],
    black: []
  };

  this.castlingAvalibility = {
    k: true,
    q: true,
    K: true,
    Q: true
  };

  this.squares = this.generateEmptySquares();
}

Chess.createStartPosition = function () {
  var chess = new Chess(),
    placePiece = chess.placePiece.bind(chess);

  objectUtils.forEachOwnProperty(startPosition, placePiece);

  return chess;
};

objectUtils.extend(Chess.prototype, {
  getSquareByName: function (squareName) {
    var squareIndex = boardUtils.squareNameToIndex(squareName);

    return this.squares[squareIndex];
  },

  place: function (position) {
    objectUtils.forEachOwnProperty(position, this.placePiece.bind(this));
  },

  placePiece: function (fenToken, squareName) {
    var square = this.getSquareByName(squareName),
      piece = Piece.create(fenToken, square);

    // TODO what if piece on this square already placed ???
    this.pieces[piece.color.name].push(piece);

    return piece;
  },

  initStartPosition: function () {
    var placePiece = this.placePiece.bind(this);

    objectUtils.forEachOwnProperty(startPosition, placePiece);
  },

  generateEmptySquares: function () {
    var squares = [],
      fileIndex, rankIndex, squareIndex;

    for (rankIndex = 0; rankIndex < 8; rankIndex++) {
      squareIndex = rankIndex * 16;
      for (fileIndex = 0; fileIndex < 8; fileIndex++) {
        squares[squareIndex] = this.createSquare(squareIndex);
        ++squareIndex;
      }
    }

    return squares;
  },

  calculateMobility: function (color) {
    var mobility = 0,
      pieces;

    color = this.activeColor || color;

    pieces = this.pieces[color.name];

    pieces.forEach(function (piece) {
      var moveCount = piece.calculateMoveCount();
      mobility += moveCount;
    });

    return mobility;
  },

  createSquare: function (squareIndex) {
    return new Square(squareIndex, this);
  },

  getOpponentPieces: function () {
    var opponentColor = this.activeColor.toggle();
    return this.pieces[opponentColor.name];
  },

  getPlayerPieces: function () {
    return this.pieces[this.activeColor.name];
  },

  getPlayerKing: function () {
    var playerPieces = this.getPlayerPieces(),
      piece, index;

    for (index = 0; index < playerPieces.length; index++) {
      piece = playerPieces[index];
      if (piece.isKing()) {
        return piece;
      }
    }

    return null;
  },

  getOpponentKing: function () {
    var opponentPieces = this.getOpponentPieces(),
      piece, index;

    for (index = 0; index < opponentPieces.length; index++) {
      piece = opponentPieces[index];
      if (piece.isKing()) {
        return piece;
      }
    }

    return null;
  },

  // TODO refactor
  generateMoves: function () {
    var moves = [], playerPieces;

    if (this.isInCheck()) {
      return this.getPlayerKing().generateMoves();
    }

    playerPieces = this.getPlayerPieces();

    playerPieces.forEach(function (piece) {
      var pieceMoves = piece.generateMoves();
      moves = moves.concat(pieceMoves);
    });

    return moves;
  },

  // TODO refactor
  generateMoveNames: function () {
    var moveNames = [], playerPieces;

    if (this.isInCheck()) {
      return this.getPlayerKing().generateSanMoves();
    }

    playerPieces = this.getPlayerPieces();

    playerPieces.forEach(function (piece) {
      var pieceMoveNames = piece.generateSanMoves();
      moveNames = moveNames.concat(pieceMoveNames);
    });

    return moveNames;
  },

  isInCheck: function () {
    var playerKing = this.getPlayerKing(),
      opponentColor = this.activeColor.toggle();

    if (playerKing === null) {
      return false;
    }

    // TODO
    return this.isSquareAttacked(playerKing.square.getName(), opponentColor);
  },

  // used only during move generation
  isOpponentInCheck: function () {
     var opponentKing = this.getOpponentKing(),
      playerColor = this.activeColor;

    if (opponentKing === null) {
      return false;
    }

    // TODO
    return this.isSquareAttacked(opponentKing.square.getName(), playerColor);
  },

  isSquareAttackedByPiece: function (squareIndex, piece) {
      var distance, attackIndex;

      distance = squareIndex - piece.square.index;
      attackIndex = distance + 119;

      if (!boardUtils.isMayAttacked(attackIndex, piece.token)) {
        return false;
      }

      if (piece.isPawn()) {
        if (distance > 0) {
          return piece.color.isWhite();
        }
        return piece.color.isBlack();
      }

      if (piece.isKnight() || piece.isKing()) {
        return true;
      }

      var offset = rays[attackIndex];
      var j = piece.square.index + offset;

      while (j !== squareIndex) {
        if (this.squares[j].isOccupied()) {
          return false;
        }
        j += offset;
      }

      return true;
  },

  isSquareAttacked: function (squareName, color) {
    var self = this,
      squareIndex= boardUtils.squareNameToIndex(squareName),
      pieces = this.pieces[color.name];

     return pieces.some(function (piece) {
       return self.isSquareAttackedByPiece(squareIndex, piece);
     });
  },

  isInCheckAfter: function (move) {
    var inCheck;

    move.make();
    inCheck = this.isOpponentInCheck();
    move.unMake();

    return inCheck;
  },

  turn: function () {
    this.activeColor = this.activeColor.toggle();
  },

  createMove: function (moveName) {
    var squareNames = moveName.split('-'),
      sourceSquare = this.getSquareByName(squareNames[0]),
      targetSquare = this.getSquareByName(squareNames[1]);

    return Move.create(sourceSquare, targetSquare);
  },

  getRank: function (rankIndex) {
    var rank = [],
      squareIndex = rankIndex * 16;

    while (rank.length < 8) {
      rank.push(this.squares[squareIndex++]);
    }

    return rank;
  },

  getRankPiecePlacement: function (rankIndex) {
    var piecePlacement = '',
      rank = this.getRank(rankIndex),
      emptySquaresCount = 0;

    rank.forEach(function (square) {
      if (square.isOccupied()) {
        if (emptySquaresCount > 0) {
          piecePlacement += emptySquaresCount;
          emptySquaresCount = 0;
        }
        piecePlacement += square.piece.getFenToken();
      } else {
        ++emptySquaresCount;
      }
    });

    if (emptySquaresCount > 0) {
      piecePlacement += emptySquaresCount;
    }

    return piecePlacement;
  },

  toASCII: function () {
    var board = '',
      square, fileIndex, rankIndex, squareIndex;

    // TODO refactor
    for (rankIndex = 7; rankIndex >= 0; rankIndex--) {
      squareIndex = rankIndex * 16;
      for (fileIndex = 0; fileIndex < 8; fileIndex++) {
        square = this.squares[squareIndex++];
        board += square.isEmpty() ? '-' : square.piece.getFenToken();
      }
      board += '\n';
    }

    return board;
  },

  generateFieldPlainObject: function () {
    var field = {};

    this.pieces.white.forEach(function (piece) {
      field[piece.square.getName()] = piece.token.toUpperCase();
    });

    this.pieces.black.forEach(function (piece) {
      field[piece.square.getName()] = piece.token;
    });

    return field;
  }

}, require('./piece-count-mixin'));

module.exports = Chess;

'use strict';

var Square = require('./square'),
  Color = require('./color'),
  Piece = require('./piece'),
  Move = require('./move'),
  boardUtils = require('../utils/chess-utils/board-utils'),
  objectUtils = require('../utils/common-utils/object-utils'),
  rays = require('../utils/chess-utils/rays');

var startPosition = {
  a1: 'R', b1: 'N', c1: 'B', d1: 'Q', e1: 'K', f1: 'B', g1: 'N', h1: 'R',
  a2: 'P', b2: 'P', c2: 'P', d2: 'P', e2: 'P', f2: 'P', g2: 'P', h2: 'P',

  a7: 'p', b7: 'p', c7: 'p', d7: 'p', e7: 'p', f7: 'p', g7: 'p', h7: 'p',
  a8: 'r', b8: 'n', c8: 'b', d8: 'q', e8: 'k', f8: 'b', g8: 'n', h8: 'r'
};

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

  // TODO temporary solution
  chess.kings = {
    white: chess.getSquareByName('e1').piece,
    black: chess.getSquareByName('e8').piece
  };

  return chess;
};

objectUtils.extend(Chess.prototype, {
  getSquareByName: function (squareName) {
    var squareIndex = boardUtils.squareNameToIndex(squareName);

    return this.squares[squareIndex];
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

  getPlayerPieces: function () {
    return this.pieces[this.activeColor.name];
  },

  getPlayerKing: function () {
    return this.kings[this.activeColor.name];
  },

  generateMoves: function () {
    var playerPieces = this.getPlayerPieces(),
      moves = [];

    playerPieces.forEach(function (piece) {
      var pieceMoves = piece.generateMoves();
      moves = moves.concat(pieceMoves);
    });

    return moves;
  },

  generateMoveNames: function () {
    var playerPieces = this.getPlayerPieces(),
      moveNames = [];

    playerPieces.forEach(function (piece) {
      var pieceMoveNames = piece.generateSanMoves();
      moveNames = moveNames.concat(pieceMoveNames);
    });

    return moveNames;
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

  turn: function () {
    this.activeColor = this.activeColor.toggle();
  },

  createMove: function (moveName) {
    var squareNames = moveName.split('-'),
      sourceSquare = this.getSquareByName(squareNames[0]),
      targetSquare = this.getSquareByName(squareNames[1]);

    return new Move(sourceSquare.piece, targetSquare);
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

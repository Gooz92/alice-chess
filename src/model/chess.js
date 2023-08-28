'use strict';

const Square = require('./square'),
  Color = require('./color'),
  Piece = require('./piece'),
  objectUtils = require('../utils/common-utils/object-utils'),
  rays = require('../utils/chess-utils/rays'),
  startPosition = require('../utils/chess-utils/start-position'),
  isMayAttacked = require('../utils/chess-utils/is-may-attacked'),
  { squareIndexes } = require('../utils/chess-utils/board-utils'),
  castlingRightsUtils = require('../utils/chess-utils/castling-rights-utils');

const pieceCost = {
  q: 90,
  r: 50,
  b: 30,
  n: 30,
  p: 10
};

class Chess {

  static createStartPosition() {
    const chess = new Chess(),
    placePiece = chess.placePiece.bind(chess);

    objectUtils.forEachOwnProperty(startPosition, placePiece);

    return chess;
  }

  constructor() {
    this.activeColor = Color.WHITE;

    this.previousMove = null;
  
    this.pieces = [[], []];
  
    this.kings = [];
  
    this.castlingRights = 15;
  
    this.squares = this.generateEmptySquares();
  }

  place(position) {
    objectUtils.forEachOwnProperty(position, this.placePiece.bind(this));
  }

  placePiece(fenToken, squareName) {
    const square = this.squares[squareName],
      piece = Piece.create(fenToken, square);

    if (piece.isKing()) {
      if (!piece.isOnStartPosition()) {
        this.castlingRights &= 12 >> piece.color.index * 2;
      }

      this.kings[piece.color.index] = piece;
    }

    // TODO what if piece on this square already placed ???
    this.pieces[piece.color.index].push(piece);

    return piece;
  }

  generateEmptySquares() {
    const squares = [];

    for (let rankIndex = 0; rankIndex < 8; rankIndex++) {
      let squareIndex = rankIndex * 16;
      for (let fileIndex = 0; fileIndex < 8; fileIndex++) {
        const square = new Square(squareIndex, this);
        squares[squareIndex] = square;
        squares[square.name] = square;
        ++squareIndex;
      }
    }

    return squares;
  }

  getOpponentPieces() {
    const opponentColor = this.activeColor.toggle();
    return this.pieces[opponentColor.index];
  }

  getPlayerPieces() {
    return this.pieces[this.activeColor.index];
  }

  getHistory() {
    const history = [];
    
    let move = this.previousMove;

    while (move) {
      history.unshift(move);
      move = move.previousMove;
    }

    return history;
  }

  getSanHistory () {
    const history = this.getHistory();

    return history.map(move => move.toSAN());
  }

  generateMoves(pseudoLegal = false) {
    const moves = [];
    const playerPieces = this.getPlayerPieces();

    playerPieces.forEach(piece => {
      const pieceMoves = piece.generateMoves(pseudoLegal);
      moves.push(...pieceMoves);
    });

    return moves;
  }

  generateMoveNames() {
    const moveNames = [];

    const playerPieces = this.getPlayerPieces();

    playerPieces.forEach(function (piece) {
      var pieceMoveNames = piece.generateSanMoves();
      moveNames.push(...pieceMoveNames);
    });

    return moveNames;
  }

  isInCheck() {
    const playerKing = this.kings[this.activeColor.index];

    if (!playerKing) {
      return false;
    }

    const opponentColor = this.activeColor.toggle();

    return this.isSquareAttacked(playerKing.square.index, opponentColor);
  }

  calculateMobility() {
    let mobility = 0;

    for (let index = 0; index < squareIndexes.length; index++) {
      if (this.squares[squareIndexes[index]].isEmpty() && this.isSquareAttacked(squareIndexes[index], this.activeColor)) {
        ++mobility;
      }
    }

    return mobility;
  }

  evaluate() {

    var playerPieces = this.getPlayerPieces();
    var result = 0;

    playerPieces.forEach(function (piece) {
      if (piece.isKing()) return;
      result += pieceCost[piece.token];
    });

    return result + this.calculateMobility();
  }

  findBestMove(maxDepth = 3) {
    var self = this, bestMove;

    var ab = function (alpha, beta, depth) {
      var score, moves, index;
  
      if (depth === 0) {
        score = self.evaluate();
        self.turn();
        score -= self.evaluate();
        self.turn();
        return score;
      }

      moves = self.generateMoves();

      for (index = 0; index < moves.length; index++) {
        moves[index].make();
        score = -ab(-beta, -alpha, depth - 1);
        moves[index].unMake();

        if (score >= beta) {
          if (depth === maxDepth) {
            bestMove = moves[index];
          }
          return beta;
        }

        if (score > alpha) {
          if (depth === maxDepth) {
            bestMove = moves[index];
          }
          alpha = score;
        }
      }

      return alpha;
    };
    

   ab(Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY, 3);
   
   // fix this. What I should do in mate\stalemate positions (score = -Infinity)
   return bestMove || this.generateMoves()[0];
  }

  // used only during move generation
  isOpponentInCheck() {
    const opponentKing = this.kings[+!this.activeColor.index];
    return this.isSquareAttacked(opponentKing.square.index, this.activeColor);
  }

  isSquareAttackedByPiece(target, piece) {
    let source = piece.square.index;

    if (!isMayAttacked(source, target, piece.fenToken)) {
      return false;
    }

    if (piece.isKnight() || piece.isKing()) {
      return true;
    }

    const attackIndex = target - piece.square.index + 119;
    while ((source += rays[attackIndex]) !== target) {
      if (this.squares[source].isOccupied()) {
        return false;
      }
    }

    return true;
  }

  isSquareAttacked(squareIndex, color) {
    const pieces = this.pieces[color.index];

    for (let index = 0; index < pieces.length; index++) {
      if (this.isSquareAttackedByPiece(squareIndex, pieces[index])) {
        return true;
      }
    }

    return false;
  }

  isInCheckAfter(move) {
    let inCheck;

    move.make();
    inCheck = this.isOpponentInCheck();
    move.unMake();

    return inCheck;
  }

  turn() {
    this.activeColor = this.activeColor.toggle();
  }

  move(moveName) {
    var moves = this.generateMoves(),
      move, index;

    for (index = 0; index < moves.length; index++) {
      move = moves[index];
      if (move.toSAN() === moveName) {
        move.make();
        return move;
      }
    }

    return null;
  }

  getRank(rankIndex) {
    var rank = [],
      squareIndex = rankIndex * 16;

    while (rank.length < 8) {
      rank.push(this.squares[squareIndex++]);
    }

    return rank;
  }

  toASCII() {
    var board = '',
      square, fileIndex, rankIndex, squareIndex;

    // TODO refactor
    for (rankIndex = 7; rankIndex >= 0; rankIndex--) {
      squareIndex = rankIndex * 16;
      for (fileIndex = 0; fileIndex < 8; fileIndex++) {
        square = this.squares[squareIndex++];
        board += square.isEmpty() ? '-' : square.piece.fenToken;
      }
      board += '\n';
    }

    return board;
  }

  generateFenCastlingRights() {
    return castlingRightsUtils.toFenField(this.castlingRights);
  }

  generateFieldPlainObject() {
    var field = {};

    this.pieces[1].forEach(function (piece) {
      field[piece.square.name] = piece.token.toUpperCase();
    });

    this.pieces[0].forEach(function (piece) {
      field[piece.square.name] = piece.token;
    });

    return field;
  }
}


module.exports = Chess;

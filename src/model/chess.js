'use strict';

var Square = require('./square'),
  Color = require('./color'),
  Piece = require('./piece'),
  objectUtils = require('../utils/common-utils/object-utils'),
  rays = require('../utils/chess-utils/rays'),
  startPosition = require('../utils/chess-utils/start-position'),
  movesDisambiguation = require('./move-factory/moves-disambiguation'),
  isMayAttacked = require('../utils/chess-utils/is-may-attacked');

function Chess() {
  this.activeColor = Color.WHITE;

  this.previousMove = null;

  this.pieces = [[], []];

  this.kings = [];

  this.castlingRights = 15;

  this.squares = this.generateEmptySquares();
}

Chess.createStartPosition = function () {
  var chess = new Chess(),
    placePiece = chess.placePiece.bind(chess);

  objectUtils.forEachOwnProperty(startPosition, placePiece);

  return chess;
};

objectUtils.extend(Chess.prototype, {
  place: function (position) {
    objectUtils.forEachOwnProperty(position, this.placePiece.bind(this));
  },

  placePiece: function (fenToken, squareName) {
    var square = this.squares[squareName],
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
  },

  initStartPosition: function () {
    var placePiece = this.placePiece.bind(this);

    objectUtils.forEachOwnProperty(startPosition, placePiece);
  },

  generateEmptySquares: function () {
    var squares = [],
      square,
      fileIndex,
      rankIndex,
      squareIndex;

    for (rankIndex = 0; rankIndex < 8; rankIndex++) {
      squareIndex = rankIndex * 16;
      for (fileIndex = 0; fileIndex < 8; fileIndex++) {
        square = new Square(squareIndex, this);
        squares[squareIndex] = square;
        squares[square.name] = square;
        ++squareIndex;
      }
    }

    return squares;
  },

  getOpponentPieces: function () {
    var opponentColor = this.activeColor.toggle();
    return this.pieces[opponentColor.index];
  },

  getPlayerPieces: function () {
    return this.pieces[this.activeColor.index];
  },

  // TODO refactor
  generateMoves: function (pseudoLegal) {
    var moves = [], playerPieces;

    playerPieces = this.getPlayerPieces();

    playerPieces.forEach(function (piece) {
      var pieceMoves = piece.generateMoves(pseudoLegal);
      moves = moves.concat(pieceMoves);
    });

    return moves;
  },

  // TODO refactor
  generateMoveNames: function () {
    var moveNames = [], playerPieces;

    playerPieces = this.getPlayerPieces();

    playerPieces.forEach(function (piece) {
      var pieceMoveNames = piece.generateSanMoves();
      moveNames = moveNames.concat(pieceMoveNames);
    });

    return moveNames;
  },

  isInCheck: function () {
    var playerKing = this.kings[this.activeColor.index],
      opponentColor;

    if (!playerKing) {
      return false;
    }

    opponentColor = this.activeColor.toggle();

    return this.isSquareAttacked(playerKing.square.index, opponentColor);
  },

  evaluate: function () {
    var pieceCost = {
      q: 9,
      r: 5,
      b: 3,
      n: 3,
      p: 1
    };

    var playerPieces = this.getPlayerPieces();
    var result = 0, mobility = 0;

    playerPieces.forEach(function (piece) {
      if (piece.isKing()) return;
      mobility += piece.calculateMoveCount();
      result += pieceCost[piece.token];
    });

    return result + 0.1 * mobility;
  },

  findBestMoveAB: function () {
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
          if (depth === 3) {
            bestMove = moves[index];
          }
          return beta;
        }

        if (score > alpha) {
          if (depth === 3) {
            bestMove = moves[index];
          }
          alpha = score;
        }
      }

      return alpha;
    };
    

   ab(Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY, 3);
   return bestMove.toSAN();
  },

  findBestMove: function () {
    var self = this,
      bestMove;

    var negaMax = function (depth) {
      var max = Number.NEGATIVE_INFINITY,
        moves, score, data, bestMoveData;

      if (depth === 0) {
        score = self.evaluate();
        self.turn();
        score -= self.evaluate();
        self.turn();
        return {
          score: score
        };
      }

      moves = self.generateMoves();

      moves.forEach(function (move) {
        move.make();
        data = negaMax(depth - 1);
        data.score = -data.score;
        if (data.score > max) {
          max = data.score;
          bestMoveData = data;
          if (depth === 3) {
            bestMove = move;
          }
        }
        move.unMake();
      });

      return bestMoveData;
    };

    console.log(negaMax(3));
    return bestMove;
  },

  // used only during move generation
  isOpponentInCheck: function () {
    var opponentKing = this.kings[+!this.activeColor.index];

    if (!opponentKing) {
      return false;
    }

    return this.isSquareAttacked(opponentKing.square.index, this.activeColor);
  },

  isSquareAttackedByPiece: function (target, piece) {
    var source = piece.square.index,
      distance = target - piece.square.index,
      attackIndex = distance + 119;

    if (!isMayAttacked(source, target, piece.fenToken)) {
      return false;
    }

    if (piece.isKnight() || piece.isKing()) {
      return true;
    }

    while ((source += rays[attackIndex]) !== target) {
      if (this.squares[source].isOccupied()) {
        return false;
      }
    }

    return true;
  },

  isSquareAttacked: function (squareIndex, color) {
    var pieces = this.pieces[color.index],
      index;

    for (index = 0; index < pieces.length; index++) {
      if (this.isSquareAttackedByPiece(squareIndex, pieces[index])) {
        return true;
      }
    }

    return false;
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

  move: function (moveName) {
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
        piecePlacement += square.piece.fenToken;
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
        board += square.isEmpty() ? '-' : square.piece.fenToken;
      }
      board += '\n';
    }

    return board;
  },

  generateFieldPlainObject: function () {
    var field = {};

    this.pieces[1].forEach(function (piece) {
      field[piece.square.name] = piece.token.toUpperCase();
    });

    this.pieces[0].forEach(function (piece) {
      field[piece.square.name] = piece.token;
    });

    return field;
  }

},
  require('./fen-serialization-mixin'),
  require('./traverse-mixin')
);

module.exports = Chess;

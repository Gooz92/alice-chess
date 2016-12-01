'use strict';

var assert = require('chai').assert,
  Chess = require('../chess'),
  Color = require('../color');

describe('Chess', function () {
  var chess;

  beforeEach(function () {
    chess = new Chess();
  });

  describe('#constructor()', function () {
    it('active color is white', function () {
      assert.isTrue(chess.activeColor.isWhite());
    });
  });

  describe('#generateEmptySquares()', function () {
    var squares;

    beforeEach(function () {
      squares = chess.generateEmptySquares();
    });

    it('return array with length = 120', function () {
      assert.equal(squares.length, 120);
    });

    it('squares have correct 0x88 index', function () {
      squares.forEach(function (square, index) {
        assert.strictEqual(square.index, index);
      });
    });
  });

  describe('#turn()', function () {
    it('turn active color from white to black', function () {
      chess.turn();
      assert.isTrue(chess.activeColor.isBlack());
    });

    it('turn active color from black to white', function () {
      chess.activeColor = Color.BLACK;
      chess.turn();
      assert.isTrue(chess.activeColor.isWhite());
    });
  });

  describe('#getPlayerPieces()', function () {
    it('return pieces with active color', function () {
      var chess = Chess.createStartPosition(),
        playerPieces = chess.getPlayerPieces();

      playerPieces.forEach(function (piece) {
        assert.isTrue(piece.color.isWhite());
      });
    });
  });

  // TODO need more test
  describe('#inCheck()', function () {
    it('return false for start position', function () {
      var chess = Chess.createStartPosition();
      assert.isFalse(chess.isInCheck());
    });
  });

  describe('#generateMoveNames()', function () {
    it('return correct move names for start position', function () {
      var chess = Chess.createStartPosition(),
        moveNames = chess.generateMoveNames();

      assert.sameMembers(moveNames, [
        'a3', 'a4',
        'b3', 'b4',
        'c3', 'c4',
        'd3', 'd4',
        'e3', 'e4',
        'f3', 'f4',
        'g3', 'g4',
        'h3', 'h4',

        'Na3', 'Nc3',
        'Nf3', 'Nh3'
      ]);
    });
  });

  describe('#placePiece()', function () {
    var chess;
    beforeEach(function () {
      chess = new Chess();
    });

    it('add white piece in white pieces array', function () {
      var addedPiece = chess.placePiece('P', 'e4');
      assert.equal(addedPiece, chess.pieces.white[0]);
    });

    it('add black piece in black pieces array', function () {
      var addedPiece = chess.placePiece('p', 'd5');
      assert.equal(addedPiece, chess.pieces.black[0]);
    });
  });

  describe('#place()', function () {
    it('place pieces from position object', function () {
      var chess = new Chess();

      var position = {
        e4: 'P',
        d5: 'p',
        a1: 'R',
        h1: 'R'
      };

      chess.place(position);

      Object.keys(position).forEach(function (squareName) {
        var square = chess.squares[squareName];

        assert.equal(square.piece.fenToken, position[squareName]);
      });
    });
  });

  describe('#getRank()', function () {
    describe('for start position', function () {
      beforeEach(function () {
        chess = Chess.createStartPosition();
      });

      it('return rank with white pawns for index 1', function () {
        var rank = chess.getRank(1),
          rankWithWhitePawns = 'PPPPPPPP'.split(''),
          pieceFenTokens;

        pieceFenTokens = rank.map(function (square) {
          return square.piece.fenToken;
        });

        assert.deepEqual(pieceFenTokens, rankWithWhitePawns);
      });

      it('return rank with black pawns for index 6', function () {
        var rank = chess.getRank(6),
          rankWithBlackPawns = 'pppppppp'.split(''),
          pieceFenTokens;

        pieceFenTokens = rank.map(function (square) {
          return square.piece.fenToken;
        });

        assert.deepEqual(pieceFenTokens, rankWithBlackPawns);
      });
    });
  });

  describe('#toASCII()', function () {
    it('return ascii board representation', function () {
      var board = chess.toASCII();
      assert.strictEqual(board, [
        '--------',
        '--------',
        '--------',
        '--------',
        '--------',
        '--------',
        '--------',
        '--------\n'
      ].join('\n'));
    });
  });

  describe('#generateFieldPlainObject()', function () {
    it('return correct board representaion for start position', function () {
      var chess = Chess.createStartPosition(),
        startPosition = require('./data/start-position.json');

      assert.deepEqual(chess.generateFieldPlainObject(), startPosition);
    });
  });
});

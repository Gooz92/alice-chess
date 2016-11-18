'use strict';

var FenParser = require('../fen-parser');

var
  BP = 1, WP = 9, // 001
  BN = 2, WN = 10, // 010
  BB = 3, WB = 11, // 00
  BR = 4, WR = 12,
  BQ = 5, WQ = 13,
  BK = 6, WK = 14,

  ES = 0, EF = 7,
  ST = 15;

  // 8 is FREE

var pieceNibbles = {
  p: BP, P: WP,
  r: BR, R: WR,
  n: BN, N: WN,
  b: BB, B: WB,
  q: BQ, Q: WQ,
  k: BK, K: WK
};

var toNibbleFenParser = new FenParser({
  onStart: function () {
    this.nibbles = [];
  },

  piecePlacement: {
    rank: {
      onPieceToken: function (token) {
       this.nibbles.push(pieceNibbles[token]);
      },

      onEmptySquaresCount: function (count) {
        while (count > 0) {
          if (count === 1) {
            this.nibbles.push(ES);
            break;
          } else if (count === 2) {
            this.nibbles.push(ES, ES);
            break;
          }

          if (count < 17) {
            this.nibbles.push(EF, count - 3);
            break;
          }

          this.nibbles.push(EF, 14);
          count -= 17;
        }
      }
    },

    onEnd: function (nibbles) {
     this.nibbles.push(ST);
     return nibbles;
    }
  },

  onWhiteActiveColor: function () {
    this.nibbles.push(1);
  },

  onBlackActiveColor: function () {
    this.nibbles.push(0);
  },

  castlingRights: {
    onStart: function () {
      this.castlingRights = 0;
    },

    onCastlingRightsToken: function (token) {
      this.castlingRights |= (1 << 'KQkq'.indexOf(token));
    },

    onEnd: function () {
      this.nibbles.push(this.castlingRights);
      return this.castlingRights;
    }
  },

  onEnPassantTargetSquare: function (square) {
    if (square === '-') {
      this.nibbles.push(0);
    }

    this.nibbles.push(square.charCodeAt(0) - 96);
  },

  onHalfmoveClock: function (clock) {
    var nibbles = [], index;

    do {
      nibbles.push(clock % 16);
      clock = Math.floor(clock / 16);
    } while (clock > 0);

    this.nibbles.push(nibbles.length);

    for (index = nibbles.length - 1; index >= 0; index--) {
      this.nibbles.push(nibbles[index]);
    }
  },

  onFullmoveNumber: function (moves) {
    var nibbles = [], index;

    do {
      nibbles.push(moves % 16);
      moves = Math.floor(moves / 16);
    } while (moves > 0);

    this.nibbles.push(nibbles.length);

    for (index = nibbles.length - 1; index >= 0; index--) {
      this.nibbles.push(nibbles[index]);
    }
  },

  onEnd: function () {
    return this.nibbles;
  }
});

var fen = 'rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq e3 0 1';


console.log(toNibbleFenParser.parse(fen));

'use strict';

var squareNames = require('./square-names.js'),
  fenUtils = require('./fen-utils'),
  isUtils = require('../common-utils/is-utils'),
  nibbleUtils = require('../common-utils/nibble-utils');

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

var pieceTokens = 'pnbrqk'.split('');

var MAX_ES_AFTER_EF = 17;

function pushEmptySquareSequence(boardNibbles, emptySquaresCount) {
  while (emptySquaresCount > 0) {
    if (emptySquaresCount === 1) {
      boardNibbles.push(ES);
      break;
    } else if (emptySquaresCount === 2) {
      boardNibbles.push(ES, ES);
      break;
    }

    if (emptySquaresCount < MAX_ES_AFTER_EF) {
      boardNibbles.push(EF, emptySquaresCount - 3);
      break;
    }

    boardNibbles.push(EF, MAX_ES_AFTER_EF - 3);
    emptySquaresCount -= MAX_ES_AFTER_EF;
  }
}

module.exports = {
  boardPlainObjectToBytes: function (board) {
    var boardNibbles = [], emptySquaresCount = 0;

    squareNames.forEach(function (square) {
      var pieceToken = board[square];

      if (fenUtils.isPieceToken(pieceToken)) {
        pushEmptySquareSequence(boardNibbles, emptySquaresCount);
        emptySquaresCount = 0;
        boardNibbles.push(pieceNibbles[pieceToken]);
      } else if (isUtils.isUndefined(pieceToken)) {
        ++emptySquaresCount;
      } else {
        throw new Error("Unknow piece token: '" + pieceToken +
          "'" + " on square '" + square + "'");
      }
    });

    pushEmptySquareSequence(boardNibbles, emptySquaresCount);

    return nibbleUtils.nibblesToBytes(boardNibbles);
  },

  boardBytesToPlainObject: function (bytes) {
    var board = {},
      squareIndex = 0,
      inEmptySquaresSequence = false;

    nibbleUtils.forEachNibble(bytes, function (nibble, index) {
      var pieceCode = (nibble & 7) - 1,
        pieceToken, isWhite;

      if (inEmptySquaresSequence) {
        squareIndex += 3 + nibble;
        inEmptySquaresSequence = false;
        return;
      }

      if (pieceCode < 6 && pieceCode >= 0) {
        pieceToken = pieceTokens[pieceCode];

        if (nibble & 8) {
          pieceToken = pieceToken.toUpperCase();
        }

        board[squareNames[squareIndex++]] = pieceToken;
      } else if (nibble === ES) {
        ++squareIndex;
      } else if (nibble === EF) {
        inEmptySquaresSequence = true;
      }
    });

    return board;
  }
};
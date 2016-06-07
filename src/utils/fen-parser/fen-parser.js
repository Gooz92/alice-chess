'use strict';

var fenUtils = require('../chess-utils/fen-utils'),
  sanUtils = require('../chess-utils/san-utils'),
  fnUtils = require('../common-utils/fn-utils'),
  defaultListeners = require('./fen-parser-default-listeners'),
  FenParseHandler = require('./fen-parse-handler');

function FenParser(listeners) {
  listeners = listeners || defaultListeners;
  this.handler = new FenParseHandler(listeners);
}

FenParser.prototype = {
  constructor: FenParser,

  parse: function (fen) {
    var fields = fen.split(' ');

    if (fields.length !== 6) {
      throw new Error("Invalid fields count: " + fields.length);
    }

    this.handler.onStart();

    this.parsePiecePlacement(fields[0]);
    this.parseActiveColor(fields[1]);
    this.parseCastlingAvailability(fields[2]);
    this.parseEnPassantSquare(fields[3]);
    this.parseHalfmoveClock(fields[4]);
    this.parseFullmoveNumber(fields[4]);

    return this.handler.onEnd();
  },

  parsePiecePlacement: function (piecePlacement) {
    var ranks, self = this;

    this.handler.onPiecePlacementStart();

    ranks = piecePlacement.split('/');

    ranks.forEach(function (rank) {
      self.parseRank(rank);
    });

    return this.handler.onPiecePlacementEnd();
  },

  parseRank: function (rank) {
    var rankTokens = rank.split(''),
      fileIndex = 0,
      self = this;

    this.handler.onRankStart();

    rankTokens.forEach(function (token) {
      if (fileIndex > 7) {
        throw new Error("Rank '" + rank + "' is too long");
      }

      if (fenUtils.isEmptySquaresToken(token)) {
        token = parseInt(token);
        self.handler.onEmptySquaresCount(token);
        fnUtils.times(token, function () {
          self.handler.onEmptySquare(fileIndex++);
        });
      } else if (fenUtils.isPieceToken(token)) {
        self.handler.onPiece(token, fileIndex++);
      } else {
        throw new Error("Unknown token: " + token);
      }
    });

    if (fileIndex < 7) {
      throw new Error("Rank '" + rank + "' is too short");
    }

    return this.handler.onRankEnd();
  },

  parseActiveColor: function (colorToken) {
    if (colorToken === 'w') {
      return this.handler.onWhiteActiveColor();
    } else if (colorToken === 'b') {
      return this.handler.onBlackActiveColor();
    }

    throw new Error("Invalid color token: '" + colorToken + "'");
  },

  parseCastlingAvailability: function (castlingField) {

    var castlingAvailability = {
      K: false,
      Q: false,
      k: false,
      q: false
    };

    var castlingTokens;

    if (castlingField === '-') {
      return this.handler.onCastlingAvailability(castlingAvailability);
    } else {
      castlingTokens = castlingField.split('');
      castlingTokens.forEach(function (token) {
        castlingAvailability[token] = true;
      });

      return this.handler.onCastlingAvailability(castlingAvailability);
    }
  },

  parseEnPassantSquare: function (enPassantSquare) {
    if (!fenUtils.isEnPassantSquareToken(enPassantSquare)) {
      throw new Error("Invalid en passant square name: '" +
        enPassantSquare + "'");
    }

    return this.handler.onEnPassantSquare(enPassantSquare);
  },

  parseHalfMoveClock: function (halfMoveClockField) {
    var halfMoveClock = parseInt(halfMoveClockField);

    if (isNaN(halfMoveClock) || halfMoveClock < 0) {
      throw new Error("Invalid half move clock field: '" +
        halfMoveClockField + "'");
    }

    return this.handler.onHalfMoveClock(halfMoveClock);
  },

  parseFullmoveNumber: function (fullmoveNumberField) {
    var fullmoveNumber = parseInt(fullmoveNumberField);

    if (isNaN(fullmoveNumber) || fullmoveNumber < 0) {
      throw new Error("Invalid fullmove number field: '" +
        fullmoveNumber + "'");
    }

    return this.handler.onFullmoveNumber(fullmoveNumber);
  }
};

module.exports = FenParser;

'use strict';

var PiecePlacementParser = require('./piece-placement-parser'),
  CastlingRightsParser = require('./castling-rights-parser'),
  fenUtils = require('../chess-utils/fen-utils'),
  objectUtils = require('../common-utils/object-utils'),
  langFns = require('../common-utils/lang-fns');

var defaultHandlers = {
  onStart: langFns.noop,

  /* for piece placement parsing PiecePlacementParser used */

  onActiveColor: langFns.noop,
  onWhiteActiveColor: langFns.noop,
  onBlackActiveColor: langFns.noop,

  /* for castling rights parsing CastlingRightsParser used */

  onEnPassantTargetSquare: langFns.noop,
  onHalfmoveClock: langFns.noop,
  onFullmoveNumber: langFns.noop,
  onEnd: langFns.noop
};

var handlerNames = Object.keys(defaultHandlers);

var fieldParseFunctions = [
  function parsePiecePlacement (piecePlacement, data) {
    this.piecePlacementParser.parse(piecePlacement, data);
  },

  function parseActiveColor (activeColor, data) {
    if (!fenUtils.isColorToken(activeColor)) {
      throw new Error();
    }

    this.handlers.onActiveColor.call(data, activeColor);

    if (activeColor === 'w') {
      this.handlers.onWhiteActiveColor.call(data);
    } else {
      this.handlers.onBlackActiveColor.call(data);
    }
  },

  function parseCastlingRights (castlingRights, data) {
    this.castlingRightsParser.parse(castlingRights, data);
  },

  function parseEnPassantTargetSquare (enPassantTargetSquare, data) {
    if (!fenUtils.isEnPassantSquareToken(enPassantTargetSquare)) {
      throw new Error();
    }

    this.handlers.onEnPassantTargetSquare.call(data, enPassantTargetSquare);
  },

  function parseHalfmoveClock (halfMoveClock, data) {
    halfMoveClock = parseInt(halfMoveClock);
    this.handlers.onHalfmoveClock.call(data, halfMoveClock);
  },

  function parseFullmoveNumber(fullmoveNumber, data) {
    fullmoveNumber = parseInt(fullmoveNumber);
    this.handlers.onFullmoveNumber.call(data, fullmoveNumber);
  }
];

function FenParser(handlers) {
  this.piecePlacementParser = new PiecePlacementParser(handlers.piecePlacement);
  this.castlingRightsParser = new CastlingRightsParser(handlers.castlingRights);

  handlers = objectUtils.pick(handlers, handlerNames);
  handlers = objectUtils.defaults(handlers, defaultHandlers);

  this.handlers = handlers;
}

FenParser.prototype.parse = function (fen) {
  var data = {},
    fenParser = this,
    fields;

  this.handlers.onStart.call(data, fen);

  fields = fen.split(' ');

  fields.forEach(function (field, index) {
    fieldParseFunctions[index].call(fenParser, field, data);
  });

  return this.handlers.onEnd.call(data, fen);
};

module.exports = FenParser;

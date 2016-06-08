'use strict';

var fenUtils = require('./fen-utils'),
  sanUtils = require('./san-utils'),
  objectUtils = require('../common-utils/object-utils');

var positionUtils = module.exports = {
  // validate only square names and piece tokens
  isValidSyntax: function (position) {
    var squareNames = Object.keys(position),
      squareName, pieceToken, index;

    for (index = 0; index < squareNames.length; index++) {
      squareName = squareNames[index];

      if (!sanUtils.isSquareName(squareName)) {
        return false;
      }

      pieceToken = position[squareName];

      if (!fenUtils.isPieceToken(pieceToken)) {
        return false;
      }
    }

    return true;
  },

  validateSynax: function (position) {
    var errors = {};

    objectUtils.forEachOwnProperty(function (pieceToken, squareName) {
      if (!sanUtils.isSquareName(squareName)) {
        if (!errors.invalidSquareNames) {
          errors.invalidSquareNames = [];
        }
        errors.invalidSquareNames.push(squareName);
      }

      if (!fenUtils.isPieceToken(pieceToken)) {
        if (!errors.invalidPieceTokens) {
          errors.invalidPieceTokens = [];
        }
        errors.invalidPieceTokens.push(pieceToken);
      }
    });

    return errors;
  },

  getPieceCounts: function (position) {
    var pieceCounts = {
      p: 0,
      r: 0,
      n: 0,
      b: 0,
      q: 0,
      k: 0
    };

    objectUtils.forEachOwnProperty(function (pieceToken) {
      if (pieceToken in pieceCounts) {
        ++pieceCounts[pieceToken];
      }
    });

    return pieceCounts;
  }
};
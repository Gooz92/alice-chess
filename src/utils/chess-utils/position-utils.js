'use strict';

let fenUtils = require('./fen-utils'),
  sanUtils = require('./san-utils');

// SyntaxError
// InvalidSquareName(squareName)
// InvalidPieceToken(pieceToken)

// InvalidPawnPosition(squareName) - pawn must be placed on [1-7] ranks
// InvalidPieceCount(pieceToken, count)


let positionUtils = module.exports = {
  isValidSyntax(position) { // validate only square names and piece tokens
    let squareNames = Object.keys(position);

    for (let square of squareNames) {
      if (!sanUtils.isSquareName(square)) {
        return false;
      }

      let pieceToken = position[square];

      if (!fenUtils.isPieceToken(pieceToken)) {
        return false;
      }
    }

    return true;
  },

  validateSynax(position) {
    let errors = {};

    ObjectUtils.forEachOwnProperty((pieceToken, squareName) => {
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

  getPieceCounts(position) {
    let pieceCounts = {
      p: 0,
      r: 0,
      n: 0,
      b: 0,
      q: 0,
      k: 0
    };

    ObjectUtils.forEachOwnProperty(pieceToken => {
      if (pieceToken in pieceCounts) {
        ++pieceCounts[pieceToken];
      }
    });

    return pieceCounts;
  }
};
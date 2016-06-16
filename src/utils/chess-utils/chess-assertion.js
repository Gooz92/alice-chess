'use strict';

var createAssertion = require('../common-utils/assertion').createUnaryAssertion,
  sanUtils = require('./san-utils'),
  fenUtils = require('./fen-utils');

var chessAssertion = {
  isSquareName: createAssertion(
    sanUtils.isSquareName,
    "Invalid square name: '{0}'"
  ),

  isPieceToken: createAssertion(
    fenUtils.isPieceToken,
    "Invalid piece token: '{0}'"
  )
};

module.exports = chessAssertion;

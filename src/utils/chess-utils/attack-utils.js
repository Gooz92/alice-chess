'use strict';

var offset = 119,
  pieceAttackMasks = {
    p: 1, P: 2,
    n: 4, N: 4,
    b: 8, B: 8,
    r: 16, R: 16,
    q: 32, Q: 32,
    k: 64, K: 64,
  };

var attacks = [
  40,  0,  0,  0,  0,  0,  0, 48,  0,  0,  0,  0,  0,  0, 40,  0,
   0, 40,  0,  0,  0,  0,  0, 48,  0,  0,  0,  0,  0, 40,  0,  0,
   0,  0, 40,  0,  0,  0,  0, 48,  0,  0,  0,  0, 40,  0,  0,  0,
   0,  0,  0, 40,  0,  0,  0, 48,  0,  0,  0, 40,  0,  0,  0,  0,
   0,  0,  0,  0, 40,  0,  0, 48,  0,  0, 40,  0,  0,  0,  0,  0,
   0,  0,  0,  0,  0, 40,  4, 48,  4, 40,  0,  0,  0,  0,  0,  0,
   0,  0,  0,  0,  0,  4, 105, 112, 105,  4,  0,  0,  0,  0,  0,  0,
  48, 48, 48, 48, 48, 48, 112,  0, 112, 48, 48, 48, 48, 48, 48,  0,
   0,  0,  0,  0,  0,  4, 106, 112, 106,  4,  0,  0,  0,  0,  0,  0,
   0,  0,  0,  0,  0, 40,  4, 48,  4, 40,  0,  0,  0,  0,  0,  0,
   0,  0,  0,  0, 40,  0,  0, 48,  0,  0, 40,  0,  0,  0,  0,  0,
   0,  0,  0, 40,  0,  0,  0, 48,  0,  0,  0, 40,  0,  0,  0,  0,
   0,  0, 40,  0,  0,  0,  0, 48,  0,  0,  0,  0, 40,  0,  0,  0,
   0, 40,  0,  0,  0,  0,  0, 48,  0,  0,  0,  0,  0, 40,  0,  0,
  40,  0,  0,  0,  0,  0,  0, 48,  0,  0,  0,  0,  0,  0, 40
];

/*
 * TODO pawn attacks is asymmentric may be use
 * different flags for white and black pawns is better way ?
 */

var attackUtils = module.exports = {
  isMayAttacked: function (fromIndex, toIndex, pieceFenToken) {
    var attackIndex = toIndex - fromIndex + offset,
      pieceAttackMask = pieceAttackMasks[pieceFenToken];

    return (attacks[attackIndex] & pieceAttackMask) !== 0;
  }
};
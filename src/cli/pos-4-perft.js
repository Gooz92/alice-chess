'use strict';

var Chess = require('../model/chess');

var chess = new Chess(),
  initialDepth = process.argv[2],
  moves = process.argv.splice(3),
  leaves = 0;

initialDepth = parseInt(initialDepth);

chess.place({
  a8: 'r',
  e8: 'k',
  h8: 'r',
  a7: 'P',
  b7: 'p',
  c7: 'p',
  d7: 'p',
  f7: 'p',
  g7: 'p',
  h7: 'p',
  b6: 'b',
  f6: 'n',
  g6: 'b',
  h6: 'N',
  a5: 'n',
  b5: 'P',
  a4: 'B',
  b4: 'B',
  c4: 'P',
  e4: 'P',
  a3: 'q',
  f3: 'N',
  a2: 'P',
  b2: 'p',
  d2: 'P',
  g2: 'P',
  h2: 'P',
  a1: 'R',
  d1: 'Q',
  f1: 'R',
  g1: 'K'
});

console.log(chess.castlingRights);


chess.traverse(initialDepth, {
  onMaxDepthReached: function () {
    ++leaves;
  }
});

console.log(leaves);
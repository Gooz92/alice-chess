'use strict';

const traverse = require('../model/traverse');

const Chess = require('../model/chess'),
  averageTime = require('../utils/common-utils/benchmark-utils').averageTime;

const chess = new Chess();

chess.place({
  a8: 'r', e8: 'k',  h8: 'r',
  a7: 'p', c7: 'p', d7: 'p', e7: 'q', f7: 'p', g7: 'b',
  a6: 'b', b6: 'n', e6: 'p', f6: 'n', g6: 'p',
  d5: 'P', e5: 'N',
  b4: 'p', e4: 'P',
  c3: 'N', f3: 'Q', h3: 'p',
  a2: 'P', b2: 'P', c2: 'P', d2: 'B', e2: 'B', f2: 'P',  g2: 'P',  h2: 'P',
  a1: 'R', e1: 'K', h1: 'R'
});

console.log(averageTime(() => {
  traverse(chess, 4);
}, 10));

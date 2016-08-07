'use strict';

var Chess = require('../model/chess');

var chess = new Chess(),
  initialDepth = process.argv[2],
  moves = process.argv.splice(3),
  leaves = 0;

initialDepth = parseInt(initialDepth);

chess.place({
  c7: 'p',
  d6: 'p',
  a5: 'K',
  b5: 'P',
  h5: 'r',
  b4: 'R',
  f4: 'p',
  h4: 'k',
  e2: 'P',
  g2: 'P'
});


chess.traverse(initialDepth, {
  onMaxDepthReached: function () {
    ++leaves;
  }
});

console.log(leaves);
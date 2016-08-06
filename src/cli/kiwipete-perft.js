'use strict';

/**
 * 48, 2039, 97862, 4085603, 193690690
 */

var Chess = require('../model/chess');

var chess = new Chess(),
  initialDepth = process.argv[2],
  moves = process.argv.splice(3),
  leaves = 0;

initialDepth = parseInt(initialDepth);

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

function executeMoves(moves) {
  var index;

  for (index = 0; index < moves.length; index++) {
    if (!chess.move(moves[index])) {
      console.log("Invalid move: '" + moves[index] + "'");
      return false;
    }
  }

  return true;
}

var promotions = 0, castlings = 0;

if (executeMoves(moves)) {
  console.time('time');
  // use callbacks insignificant slow down iteration
  chess.traverse(initialDepth, {
    onMaxDepthReached: function () {
      ++leaves;
    }
  });
}

console.log(leaves);
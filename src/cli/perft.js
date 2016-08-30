'use strict';

var Chess = require('../model/chess');

var chess = Chess.createStartPosition(),
  initialDepth = process.argv[2],
  moves = process.argv.splice(3),
  leaves = 0;

initialDepth = parseInt(initialDepth);

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

try {
  if (executeMoves(moves)) {
    console.time('time');
    // use callbacks insignificant slow down iteration
    chess.traverse(initialDepth, {
      onMaxDepthReached: function () {
        ++leaves;
      }
    });
    console.log(leaves);
    console.timeEnd('time');
  }
} catch (e) {
  console.log(chess.getSanHistory().join(' '));
}
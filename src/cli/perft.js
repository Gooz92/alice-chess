'use strict';

var Chess = require('../model/chess');

var chess = Chess.createStartPosition(),
  initialDepth = process.argv[2],
  moves = process.argv.splice(3);

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

function perft(depth) {
  var nodes = 0, moves;

  if (depth === 0) {
    return 1;
  }

  moves = chess.generateMoves();

  moves.forEach(function (move) {
    var subresult;

    move.make();
    subresult = perft(depth - 1);
    if (depth === initialDepth) {
      console.log(move.toSAN() + ' : ' + subresult);
    }
    move.unMake();

    nodes += subresult;
  });

  return nodes;
}

if (executeMoves(moves)) {
  console.time('time');
  perft(initialDepth);
  console.timeEnd('time');
}
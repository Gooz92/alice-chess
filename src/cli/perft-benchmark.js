'use strict';

var Chess = require('../model/chess');

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

  moves = chess.generateMoves(true);

  moves.forEach(function (move) {
    var subresult;

    move.make();
    if (!chess.isOpponentInCheck()) {
      subresult = perft(depth - 1);
      nodes += subresult;
    }
    move.unMake();
  });

  return nodes;
}

var initialDepth = process.argv[2],
  moves = process.argv.splice(3),
  chess;

initialDepth = parseInt(initialDepth);

var times = 10, time, executionTimes = [];

while (times--) {
   chess = Chess.createStartPosition();
  if (executeMoves(moves)) {
    time = Date.now();
    perft(initialDepth);
    executionTimes.push(Date.now() - time);
  } else {
    break;
  }
}

console.log(executionTimes);
console.log(executionTimes.reduce((a, b) => a + b) / executionTimes.length);


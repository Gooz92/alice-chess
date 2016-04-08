'use strict';

var Chess = require('../model/chess');

var chess = Chess.createStartPosition(),
  initialDepth = process.argv[2];

initialDepth = parseInt(initialDepth);

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

console.time('time');
console.log(perft(initialDepth));
console.timeEnd('time');

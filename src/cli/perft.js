'use strict';

var Chess = require('../model/chess');

var chess = Chess.createStartPosition(),
  depth = process.argv[2];

depth = parseInt(depth);

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
    move.unMake();

    if (depth === 3) {
      console.log(move.toLongSAN() + ' : ' + subresult);
    }

    nodes += subresult;
  });

  return nodes;
}

console.log(perft(depth));


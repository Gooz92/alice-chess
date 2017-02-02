'use strict';

var Chess = require('../model/chess'),
  readline = require('readline');

var chess = Chess.createStartPosition(),
  rl = readline.createInterface(process.stdin, process.stdout);

rl
  .on('line', line => {
    var opponentMove;

    if (line === ':q') {
      rl.close();
    }

    if (!chess.move(line)) {
      console.log('invalid move');
    } else {
      console.time('ab');
      opponentMove = chess.findBestMove();
      opponentMove.make();
      console.log(opponentMove.toSAN());
      console.timeEnd('ab');
    }

    
  })
  .on('close', () => {
    process.exit(0);
  });
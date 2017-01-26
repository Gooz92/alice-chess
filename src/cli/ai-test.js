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
      console.time('full');
      opponentMove = chess.findBestMove().toSAN();
      console.log(opponentMove);
      console.timeEnd('full');
      console.time('ab');
      console.log(chess.findBestMoveAB());
      console.timeEnd('ab');
    }

    chess.move(opponentMove);
  })
  .on('close', () => {
    process.exit(0);
  });
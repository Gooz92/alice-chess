var Chess = require('../model/chess'),
  readline = require('readline');

var chess = Chess.createStartPosition(),
  rl = readline.createInterface(process.stdin, process.stdout);

console.log(chess.toASCII());

rl
  .on('line', line => {
    if (line === ':q') {
      rl.close()
    }

    if (!chess.move(line)) {
      console.log('invalid move');
    }

    console.log(chess.toASCII());
  })
  .on('close', () => {
    process.exit(0);
  });
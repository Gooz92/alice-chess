'use strict';

var Chess = require('../model/chess'),
  chess = Chess.createStartPosition(),
  moves = process.argv.splice(2);

moves.forEach(move => chess.move(move));

console.log(chess.toASCII());

console.log(chess.generateMoveNames().join(' '));
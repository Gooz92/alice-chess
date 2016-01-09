'use strict';

var Chess = require('./model/chess');

var chess = Chess.createStartPosition(),
  move = chess.createMove('e2-e3');

move.execute();

console.log(chess.toASCII());
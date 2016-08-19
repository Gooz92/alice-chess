'use strict';

var Chess = require('../model/chess'),
  chess = new Chess();

chess.place({
  a2: 'P',
  b7: 'p'
});

chess.move('a4');
chess.move('b5');
chess.move('a5');
chess.move('b4');
// console.log(chess.enPassantTargetSquare);
chess.getSanHistory();
// console.log(chess.enPassantTargetSquare);
chess.squares.a5.piece.generateMoves();
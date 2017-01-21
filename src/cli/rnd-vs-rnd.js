var Chess = require('../model/chess'),
  chess, moves, index;


while (true) {
  chess = Chess.createStartPosition();
  index = 0;
  do {
    moves = chess.generateMoves();
    if (moves.length !== 0)
    moves[Math.floor(moves.length * Math.random())].make();
  } while (moves.length > 0 && index++ < 100);
}
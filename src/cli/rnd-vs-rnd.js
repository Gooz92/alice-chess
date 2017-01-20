var Chess = require('../model/chess'),
  chess, moves;


while (true) {
  chess = Chess.createStartPosition();
  do {
    moves = chess.generateMoves();
    if (moves.length !== 0)
    moves[Math.floor(moves.length * Math.random())].make();
  } while (moves.length > 0 && chess.history.length < 100);
}
var boardUtils = require('../utils/chess-utils/board-utils');

var squares = {},
  squareName,
  squareIndex;

for (squareIndex = 0; squareIndex < 120; squareIndex++) {
  if (boardUtils.isSquareOnBoard(squareIndex)) {
    squareName = boardUtils.squareIndexToName(squareIndex);
    squares[squareName] = squareIndex;
  }
}

console.log(squares);
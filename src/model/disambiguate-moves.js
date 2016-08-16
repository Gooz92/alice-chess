'use strict';

var pieceTokens = ['r', 'n', 'b', 'q'];

function disambiguateMoves(moves) {
  pieceTokens.forEach(function (pieceToken) {
    var moveMap = {}, index;

    for (index = 0; index < moves.length; index++) {
      if (!moveMap[moves[index].targetSquare.name]) {
        moveMap[moves[index].targetSquare.name] = [];
      }

      moveMap[moves[index].targetSquare.name].push(moves[index]);
    }

    Object.keys(moveMap).forEach(function (squareName) {
      var moves = moveMap[squareName],
        i, j;

      if (moves.length < 2) {
        return;
      }

      for (i = 0; i < moves.length; i++) {
        for (j = i + 1; j < moves.length; j++) {
          if (moves[0].piece.square.fileIndex !== moves[1].piece.square.fileIndex) {
            moves[0].disambiguateFileIndex = true;
            moves[1].disambiguateFileIndex = true;
          } else if (moves[0].piece.square.rankIndex !== moves[1].piece.square.rankIndex) {
            moves[0].disambiguateRankIndex = true;
            moves[1].disambiguateRankIndex = true;
          }
        }
      }
    });
  });

  return moves.map(function (move) {
    return move.toSAN();
  });
}

module.exports = disambiguateMoves;

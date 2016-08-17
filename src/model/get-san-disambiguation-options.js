'use strict';

var pieceTokens = ['r', 'n', 'b', 'q'];

function getSanDisambiguationOptions(moves) {
  var disambiguationOptions = moves.map(function () {
    return {
      rank: false,
      file: false
    };
  });

  pieceTokens.forEach(function (pieceToken) {
    var moveMap = {},
      index;

    for (index = 0; index < moves.length; index++) {
      if (!moveMap[moves[index].targetSquare.name]) {
        moveMap[moves[index].targetSquare.name] = [];
      }

      moveMap[moves[index].targetSquare.name].push(moves[index]);
    }

    Object.keys(moveMap).forEach(function (squareName) {
      var pieceMoves = moveMap[squareName],
        i, j;

      if (pieceMoves.length < 2) {
        return;
      }

      for (i = 0; i < pieceMoves.length; i++) {
        for (j = i + 1; j < pieceMoves.length; j++) {
          if (pieceMoves[i].piece.square.fileIndex !== pieceMoves[j].piece.square.fileIndex) {
            disambiguationOptions[moves.indexOf(pieceMoves[i])].file = true;
            disambiguationOptions[moves.indexOf(pieceMoves[j])].file = true;
          } else if (pieceMoves[i].piece.square.rankIndex !== pieceMoves[j].piece.square.rankIndex) {
             disambiguationOptions[moves.indexOf(pieceMoves[i])].rank = true;
            disambiguationOptions[moves.indexOf(pieceMoves[j])].rank = true;
          }
        }
      }
    });
  });

  return disambiguationOptions;
}

module.exports = getSanDisambiguationOptions;

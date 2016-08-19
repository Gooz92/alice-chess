'use strict';

function isUnambiguous(firstMove, secondMove) {
  return (firstMove.piece.token !== secondMove.piece.token ||
          firstMove.targetSquare !== secondMove.targetSquare);
}

function disambiguateMoves(moves) {
  var firstSourceSquare,
    secondSourceSquare,
    i, j;

  for (i = 0; i < moves.length; i++) {
    if (moves[i].piece.isPawn() || moves[i].piece.isKing()) {
      continue;
    }

    firstSourceSquare = moves[i].sourceSquare;

    for (j = i + 1; j < moves.length; j++) {
      if (isUnambiguous(moves[i], moves[j])) {
        continue;
      }

      secondSourceSquare = moves[j].sourceSquare;

      if (firstSourceSquare.fileIndex !== secondSourceSquare.fileIndex) {
        moves[i].disambiguateFile = true;
        moves[j].disambiguateFile = true;
      } else if (firstSourceSquare.rankIndex !== secondSourceSquare.rankIndex) {
        moves[i].disambiguateRank = true;
        moves[j].disambiguateRank = true;
      }
    }
  }
}

module.exports = disambiguateMoves;

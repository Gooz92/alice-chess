'use strict';

function isUnambiguous(firstMove, secondMove) {
  return (firstMove.piece.token !== secondMove.piece.token ||
          firstMove.targetSquare !== secondMove.targetSquare);
}

function isUnambiguousPiece(piece) {
  return piece.isPawn() || piece.isKing();
}

function disambiguateMove(disambiguatedMove, moves) {
  var firstSourceSquare = disambiguatedMove.sourceSquare,
    secondSourceSquare;

  if (isUnambiguousPiece(disambiguatedMove.piece)) {
    return;
  }

  for (const move of moves) {
    if (disambiguatedMove === move) {
      continue;
    }

    if (isUnambiguousPiece(move.piece)) {
      continue;
    }

    if (isUnambiguous(move, disambiguatedMove)) {
      continue;
    }

    secondSourceSquare = move.sourceSquare;

    if (firstSourceSquare.fileIndex !== secondSourceSquare.fileIndex) {
      disambiguatedMove.disambiguateFile = true;
    } else if (firstSourceSquare.rankIndex !== secondSourceSquare.rankIndex) {
      disambiguatedMove.disambiguateRank = true;
    }
  }
}

function disambiguateMoves(moves) {
  moves.forEach(function (move) {
    disambiguateMove(move, moves);
  });
}

module.exports = {
  disambiguateMove: disambiguateMove,
  disambiguateMoves: disambiguateMoves,
};

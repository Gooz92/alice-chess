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
    secondSourceSquare,
    index;

  if (isUnambiguousPiece(disambiguatedMove.piece)) {
    return;
  }

  for (index = 0; index < moves.length; index++) {
    if (disambiguatedMove === moves[index]) {
      continue;
    }

    if (isUnambiguousPiece(moves[index].piece)) {
      continue;
    }

    if (isUnambiguous(moves[index], disambiguatedMove)) {
      continue;
    }

    secondSourceSquare = moves[index].sourceSquare;

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

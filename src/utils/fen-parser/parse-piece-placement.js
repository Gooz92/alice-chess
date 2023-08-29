
const boardUtils = require('../chess-utils/board-utils');
const fenUtils = require('../chess-utils/fen-utils');

const RANKS_COUNT = 8;
const MAX_FILE_INDEX = 7;

const throwRepeatedEmptySquareTokensError = fenRank => {
  throw new Error(`Consecutively repeated empty square tokens in rank '${rank}'`);
}

module.exports.parseFenPiecePlacement = fenPiecePlacement => {
  const ranks = fenPiecePlacement.split('/');

  if (ranks.length !== RANKS_COUNT) {
    throw new Error(`Invalid ranks count: '${ranks.length}'`);
  }

  const piecePlacement = {};

  ranks.forEach((fenRank, rankIndex) => {
    const rankName = boardUtils.rankIndexToName(RANKS_COUNT - rankIndex - 1);
    parseRank(fenRank, (fenPieceToken, fileIndex) => {
      const fileName = boardUtils.fileIndexToName(fileIndex);
      const squareName = fileName + rankName;
      piecePlacement[squareName] = fenPieceToken;
    });
  });

  return piecePlacement;
};

const parseRank = (fenRank, onPiece) => {
  let previousTokenIsEmptySquareToken = false;
  let fileIndex = 0;

  for (const rankFenToken of fenRank) {
    if (fileIndex > MAX_FILE_INDEX) {
      throwTooLongRankError(fenRank);
    }

    if (fenUtils.isEmptySquaresToken(rankFenToken)) {
      if (previousTokenIsEmptySquareToken) {
        throwRepeatedEmptySquareTokensError(rank);
      }
      previousTokenIsEmptySquareToken = true;
      const emptySquaresCount = +rankFenToken;

      fileIndex += emptySquaresCount;
    } else if (fenUtils.isPieceToken(rankFenToken)) {
      previousTokenIsEmptySquareToken = false;
      onPiece(rankFenToken, fileIndex);
      fileIndex++;
    } else {
      throw new Error(`Unknown token '${rankFenToken}' in rank '${rank}'`);
    }
  }
}

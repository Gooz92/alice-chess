const test = pattern => token => pattern.test(token);

const A_CODE = a.charCodeAt();
const 

module.exports = {

  isPieceToken: test(/^[prnbqk]$/i),

  isEmptySquaresToken: test(/^[1-8]$/),

  isColorToken: test(/^[wb]$/),

  isCastlingToken: test(/^[kq]$/i),

  isEnPassantSquareToken: (square, isWhite) => {
    const expectedRankName = isWhite ? '6' : '3';
    const actualRankName = square[1];

    if (expectedRankName !== actualRankName) {
      return false;
    }

    const fileName = square[0];
    return 'a' <= fileName && fileName <= 'h';
  }
};

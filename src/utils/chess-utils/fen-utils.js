const test = pattern => token => pattern.test(token);

module.exports = {

  isPieceToken: test(/^[prnbqk]$/i),

  isEmptySquaresToken: test(/^[1-8]$/),

  isColorToken: test(/^[wb]$/),

  isCastlingToken: test(/^[kq]$/i),

  isEnPassantSquareToken: test(/^([a-h][63])|-$/)
};
